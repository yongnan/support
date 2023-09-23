# CDK Pipelines

[CDK Pipelines](https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.pipelines-readme.html) is a construct library module for painless continuous delivery of AWS CDK applications. Whenever you check your AWS CDK app's source code in to AWS CodeCommit, GitHub, or AWS CodeStar, CDK Pipelines can automatically build, test, and deploy your new versio

### API:

-  [CDK Pipelines original API](https://github.com/aws/aws-cdk/blob/master/packages/@aws-cdk/pipelines/ORIGINAL_API.md). : Developer Preview.
- modern API:  incorporates feedback from CDK customers received during the preview phase.

### Environments

A CDK Pipeline involves at least two environments. 

- where the pipeline is provisioned. 
- where you want to deploy the application's stacks (or its stages, which are groups of related stacks). 

These environments can be the same, though best practices recommend you isolate stages from each other in different AWS accounts or Regions.



npx cdk bootstrap aws://<ACCOUNT-NUMBER>/<REGION> --profile <ADMIN-PROFILE> \
    --cloudformation-execution-policies arn:aws:iam::aws:policy/AdministratorAccess \
    --trust PIPELINE-ACCOUNT-NUMBER

```bash
% aws secretsmanager create-secret \
 --name yncGitHubToken \
 --secret-string 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 \
 --region eu-central-1 --profile prod
{
    "ARN": "arn:aws:secretsmanager:eu-central-1:767873598297:secret:yncGitHubToken-G89cfS",
    "Name": "yncGitHubToken",
    "VersionId": "42f51f53-86f6-49f5-bc22-f33962d907b7"
}
```

`pipeline-stack.ts`:

Replace  `secretCompleteArn`

```javascript
import { CodePipeline, CodePipelineSource, ShellStep, ManualApprovalStep } from 'aws-cdk-lib/pipelines';

const secret = sm.Secret.fromSecretAttributes(this, "ImportedSecret", {
      secretCompleteArn: "arn:aws:secretsmanager:eu-central-1:767873598297:secret:yncGitHubToken-G89cfS", 
        //secretArn: "arn:aws:secretsmanager:eu-central-1:767873598297:secret:yncGitHubToken-G89cfS",
    })

const pipeline: CodePipeline = new CodePipeline(
      this,
      'PipelineStack',
      {
        //crossAccountKeys: true,
        //selfMutation: true,
        pipelineName: 'serverless-pro-pipeline',
        synth: new ShellStep('Synth', {
          input: CodePipelineSource.gitHub(
            'ync-aws/Serverless-AWS-CDK-Best-Practices-Patterns',
            'master', {
              authentication: secret.secretValue
            }
          ),
          commands: [
            'cd ./serverless-pro',
            'npm ci',
            'npx cdk synth',
            'npm run test',
          ],
        }),
      }
    );
```

