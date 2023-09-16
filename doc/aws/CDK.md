CDK

### AWS CDK Concept

- App – That is the root of your construct tree and consolidates all stacks and constructs in one application that can then be used to deploy on AWS Cloud.
- [Stack](https://towardsthecloud.com/aws-cdk-stack) – is similar to a CloudFormation stack. It’s a single unit (template) that holds the AWS resources in the form of constructs and can be used for deployment.
- [Construct](https://towardsthecloud.com/aws-cdk-construct) – is the basic building block that can contain a single AWS resource or multiple AWS resources combined. You’re free to build and combine AWS resources in your own constructs.

![cdk-1](/Users/yongnan/Yandex.Disk.localized/Tecdoc/aws/img/cdk-1.png)

### AWS CDK construct concept

There are **3 ways** to build constructs in AWS CDK, each with its own unique features:

- **L1 Constructs** are basically the AWS CDK version of AWS CloudFormation resource types. The properties are mapped exactly as its AWS CloudFormation counterpart. There’s no real benefit to using L1 constructs if you can build AWS resources using L2 and L3 constructs. There’s one exception to this rule… if an L2 or L3 construct doesn’t let you customize a certain property via its API, then you can fix that using an [escape hatch](https://docs.aws.amazon.com/cdk/v2/guide/cfn_layer.html).
- **L2 Constructs** are AWS resources developed by the AWS CDK team that encapsulate L1 constructs using pre-configured security measures in place including sensible defaults. The primary benefit of L2 constructs is that you’re able to create secure AWS resources with a few lines of code.
- **L3 Constructs** (also called patterns) are a group of L2 constructs combined to deliver a full solution. For example, you can group multiple resources together like an EC2 instance that is linked to an RDS and an Application Load Balancer (ALB). You can initialize this group of resources using a few lines of code, which allows you to reuse these patterns in multiple projects or stacks.

## Install the AWS Cloud Development Kit

### Install AWS CLI and configure an AWS profile

The AWS CLI is a command line tool that allows you to interact with AWS services in your terminal. Depending on if you’re running **Linux**, **macOS**, or **Windows** the installation goes like this:

```bash
# macOS install method:
brew install awscli

# Windows install method:
wget https://awscli.amazonaws.com/AWSCLIV2.msi
msiexec.exe /i https://awscli.amazonaws.com/AWSCLIV2.msi

# Linux (Ubuntu) install method:
sudo apt install awscli
```

### Install the AWS CDK CLI

```
npm install -g aws-cdk
cdk --version 
```

## Creating a project

You create a new AWS CDK project by invoking `cdk init` in an empty directory.

```
mkdir my-project
cd my-project
cdk init app --language typescript
```

### Build the app (optional)

```
npm run build
```

### List the stacks in the app

```
cdk ls 
```

### Synthesize an AWS CloudFormation template (optional)

```
cdk synth
```

### Deploying the stack

```
cdk deploy
```

### Modify the stack

~modify

To see these changes, we'll use the `cdk diff` command.

```
cdk diff
```

### Bootstrap your AWS account

```
cdk bootstrap aws://`ACCOUNT-NUMBER`/`REGION`
```

### Destroying the app's resources

```
cdk destroy
```

```
# vi ~/.aws/credential

[default]
aws_access_key_id = [account id]
aws_secret_access_key = [account secret key]
```

Set up an alias so you can use the `cdk` command with a local CDK Toolkit installation.

`~/.zshrc`, `~/.bashrc`, `~/.bash_profile `

```
alias cdk="npx aws-cdk"
```

To get your AWS account number, use the following AWS CLI command:

```
aws sts get-caller-identity
```

To display the default region for your account, use:

```bash
aws configure get region
```

Now you can bootstrap the account with the following command:

```bash
cdk bootstrap aws://ACCOUNT-NUMBER/REGION

example:
cdk bootstrap aws://767873598297/ap-northeast-1
```

```bash
% cdk init --list
Available templates:
* app: Template for a CDK Application
   └─ cdk init app --language=[csharp|fsharp|go|java|javascript|python|typescript]
* lib: Template for a CDK Construct Library
   └─ cdk init lib --language=typescript
* sample-app: Example CDK Application with some constructs
   └─ cdk init sample-app --language=[csharp|fsharp|go|java|javascript|python|typescript]
```

Modify your **bin/cdk-demo.ts** stack to look something like this:

```typescript
#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { CdkDemoStack } from '../lib/cdk-demo-stack';

const app = new cdk.App();
new CdkDemoStack(app, 'CdkDemoStack', {

  env: { account: 'ACCOUNT-NUMBER', region: 'us-east-1' },

});
```

### Create the infrastructure

To install the Amazon EC2 module, we will use **npm.** Run the following command while in your project directory:

```bash
npm install @aws-cdk/aws-ec2
```

Now, we are ready to create our VPC. Open up your stack definition in **lib/cdk-demo-stack.ts**. When first opening up the file, you should see something like this:

```typescript
import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as ec2 from 'aws-cdk-lib/aws-ec2';

export class CdkDemoStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

     // The code that defines your stack goes here
    // We have created the VPC object from the VPC class
    new ec2.Vpc(this, 'mainVPC', {
      // This is where you can define how many AZs you want to use
      maxAzs: 2,
      // This is where you can define the subnet configuration per AZ
      subnetConfiguration: [
         {
           cidrMask: 24,
           name: 'public-subnet',
           subnetType: ec2.SubnetType.PUBLIC,
         }
      ]
   });
  }
}
```

### Deploy your code

To see if your code is valid, you can run **npm build** which will compile TypeScript into JavaScript:

```bash
npm run build
```

### Synthesize an AWS CloudFormation template (optional)

```
cdk synth
```

If you don't get any errors, you can run the **cdk deploy** command:

```bash
cdk deploy
```

### Clean up resources (optional)

```
cdk destroy
```

### Hot swap deploy

```
cdk deploy --hotswap
```

### CDK Watch

We can do better than calling `cdk deploy` or `cdk deploy --hotswap` each time. `cdk watch` is similar to `cdk deploy` except that instead of being a one-shot operation, it monitors your code and assets for changes and attempts to perform a deployment automatically when a change is detected. By default, `cdk watch` will use the `--hotswap` flag, which inspects the changes and determines if those changes can be hotswapped. Calling `cdk watch --no-hotswap` will disable the hotswap behavior.

modify `cdk.json` to exclude `*.js` files, remove `"**/*.js"` from the `"exclude"` list:

```
{
  "app": "npx ts-node --prefer-ts-exts bin/cdk-workshop.ts",
  "watch": {
    "include": [
      "**"
    ],
    "exclude": [
      "README.md",
      "cdk*.json",
      "**/*.d.ts",
      "tsconfig.json",
      "package*.json",
      "yarn.lock",
      "node_modules",
      "test"
    ]
  },
  "context": {
    // ...
  }
}
```

```
cdk watch
```



Once we set it up, we can use `cdk watch` to detect both hotswappable changes and changes that require full CloudFormation deployment.

## API gateway



## Pipeline

AWS resource and property types reference

Resource type identifiers always take the following form:

```
service-provider::service-name::data-type-name
```

#### AWS::CodePipeline::Pipeline



# Tools

Therefore it’s a best practice to validate the output by tools such as [cfn-lint](https://towardsthecloud.com/validating-cloudformation-templates-codepipeline) and [checkov](https://github.com/bridgecrewio/checkov) to prevent misconfiguration of your infrastructure as code.

## aws

### list all stacks

```
aws cloudformation list-stacks
```



## aws-sam-cli

### installation

```
brew install aws/tap/aws-sam-cli

```

```
rm /usr/local/bin/sam
ln -s /usr/local/Cellar/aws-sam-cli/1.95.0/bin/sam /usr/local/bin/sam 

sam --version
```



###offical installer not work

#### Description:

After running the GUI all installer ([aws-sam-cli-macos-x86_64.pkg](https://github.com/aws/aws-sam-cli/releases/latest/download/aws-sam-cli-macos-x86_64.pkg)) for SAM as described [here](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/install-sam-cli.html) leads to a broken state where the CLI cannot be called at all.

#### Steps to reproduce:

1. Download installer
2. Verify installer
3. Run installer
4. Verify CLI running `sam --version`
5. Profit

#### Observed result:

```
kieran@Kierans-MacBook-Pro ~ % sam --version
[11611] Error loading Python lib '/usr/local/aws-sam-cli/libpython3.8.dylib': dlopen: dlopen(/usr/local/aws-sam-cli/libpython3.8.dylib, 10): Symbol not found: _preadv
  Referenced from: /usr/local/aws-sam-cli/libpython3.8.dylib (which was built for Mac OS X 12.6)
  Expected in: /usr/lib/libSystem.B.dylib
```

#### Expected result:

```
SAM CLI, version 1.66.0
```

### sam required docker

https://docs.docker.com/desktop/install/mac-install/

### Test your Lambda function

You can use the AWS SAM CLI to locally invoke a Lambda function that you define in an AWS CDK application. To do this, you need the function construct identifier and the path to your synthesized AWS CloudFormation template.

**Command to run:**

```
cdk synth --no-staging
sam local invoke MyFunction --no-event -t ./cdk.out/CdkSamExampleStack.template.json
```

**Example output:**

```
Invoking app.lambda_handler (python3.7)
     
START RequestId: 5434c093-7182-4012-9b06-635011cac4f2 Version: $LATEST
"Hello from SAM and the CDK!"
END RequestId: 5434c093-7182-4012-9b06-635011cac4f2
REPORT RequestId: 5434c093-7182-4012-9b06-635011cac4f2	Init Duration: 0.32 ms	Duration: 177.47 ms	Billed Duration: 178 ms	Memory Size: 128 MB	Max Memory Used: 128 MB
```



```
# Invoke the function FUNCTION_IDENTIFIER declared in the stack STACK_NAME
sam local invoke [OPTIONS] [STACK_NAME/FUNCTION_IDENTIFIER]

# Start all APIs declared in the AWS CDK application
sam local start-api -t ./cdk.out/CdkSamExampleStack.template.json [OPTIONS]

# Start a local endpoint that emulates AWS Lambda
sam local start-lambda -t ./cdk.out/CdkSamExampleStack.template.json [OPTIONS]
```

#### Example:

### 

```
aws cloudformation list-stacks
```

```
sam list endpoints -t ./cdk.out/ServerlessPro.template.json --stack-name prod-StatelessStack
```

