![img](https://miro.medium.com/v2/resize:fit:700/1*WSv0SFO5J2fgIVNpUWdxhQ.png)

Photo by [Ryan Quintal](https://unsplash.com/@ryanquintal?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText) on [Unsplash](https://unsplash.com/photos/Kc5GdiUbs8o?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText)

# Serverless AWS CDK Pipeline Best Practices & Patterns — Part 1

## An opinionated discussion around how to set up, structure, and deploy your AWS CDK Serverless apps using CDK Pipelines in line with AWS best practice. Code examples are written in TypeScript.

![img](https://miro.medium.com/v2/resize:fit:700/1*DB3dpdhpfdN9STZIYS1NOQ.png)

## Preface

✔️ We should create different stacks per environment within our CDK app (*feature-dev, staging, production etc*).
✔️ We should split out stateless and stateful stacks as best practice.
✔️ We should allow for different configurations per stack, without the use of environment variables. (*apart from ephemeral environments*).
✔️ We should synthesize the app (*assets*) once, allowing for a deterministic immutable build to be deployed through all environments.

In **Part 1** we will cover an opinionated discussion around how to set up, structure, and deploy your AWS CDK Serverless apps using CDK Pipelines in line with AWS best practice.

[In **Part 2** we will specifically deep dive into pipeline testing (*unit, integration, load*), manual approval stages, database deploys and SAST tooling.](https://blog.serverlessadvocate.com/serverless-aws-cdk-pipeline-best-practices-patterns-part-2-5446a417d232)

## Serverless AWS CDK Pipeline Best Practices & Patterns — Part 2

### An opinionated discussion around how to set up, structure, and deploy your AWS CDK Serverless apps using CDK Pipelines…

blog.serverlessadvocate.com

In **Part 3** we will cover synthetics using CloudWatch Synthetic Canaries, dynamic configuration values stored in S3, and acceptance tests using Cypress.

## Serverless AWS CDK Pipeline Best Practices & Patterns — Part 3

### An opinionated discussion around how to set up, structure, and deploy your AWS CDK Serverless apps using CDK Pipelines…

blog.serverlessadvocate.com

In **Part 4** we cover progressive deployments and feature flags **and more**.

## Serverless AWS CDK Pipeline Best Practices & Patterns — Part 4

### An opinionated discussion around how to set up, structure, and deploy your AWS CDK Serverless apps using CDK Pipelines…

blog.serverlessadvocate.com

The basic code for the article can be found here, but please note this is not production ready and is created solely to talk through the approaches:

## GitHub - leegilmorecode/Serverless-AWS-CDK-Best-Practices-Patterns: An opinionated discussion…

### An opinionated discussion around how to set up, structure, and deploy your AWS CDK Serverless apps using CDK Pipelines…

github.com

```
Note: We are going to focus on trunk-based development in which
developers frequently avoid long-lived branches and 
regularly commit their changes to the trunk. 
Therefore this pipeline only executes for commits to the trunk. 
Every commit to the trunk has a change to go to production 
if all steps of the pipeline are complete successfully.
```

# ClientStack

update zone

```typescript
 // const zone: route53.IHostedZone = route53.HostedZone.fromLookup(
    //   this,
    //   'HostedZone',
    //   {
    //     domainName: `${props.domainName}`,
    //   }
    // );
    
const zone: route53.IHostedZone =
      route53.HostedZone.fromHostedZoneAttributes(this, 'HostedZone', {
        hostedZoneId: 'Z071804422I69NMV5CSGV',
        zoneName: `${props.domainName}`,
      });
```

