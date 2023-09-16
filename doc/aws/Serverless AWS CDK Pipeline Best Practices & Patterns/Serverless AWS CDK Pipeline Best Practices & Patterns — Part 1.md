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

# Introduction

This article is going to cover best practices from my personal viewpoint when it comes to building AWS CDK applications with TypeScript; including folder structures, stack considerations, configuration approaches, the use of AWS CDK Pipelines **and more…**

We won’t cover specifically what the AWS CDK and AWS CDK Pipelines are, and it is assumed the reader already knows; but you can see the links below:

## Open Source Development Framework - AWS Cloud Development Kit - AWS

### Define your cloud application resources using familiar programming languages AWS Cloud Development Kit (AWS CDK)…

aws.amazon.com

## CDK Pipelines: Continuous delivery for AWS CDK applications | Amazon Web Services

### The AWS Cloud Development Kit (AWS CDK) is an open-source software development framework to define cloud infrastructure…

aws.amazon.com

We will delve into why each option has been considered, and we will model this in a basic repo and show code examples as we go.

**The three main sources of best practice information have been amalgamated from:**

🥇 [Deployment Pipeline Reference Architecture](https://pipelines.devops.aws.dev/)

🥇 [Best practices for developing cloud applications with AWS CDK](https://docs.aws.amazon.com/cdk/v2/guide/best-practices.html#best-practices-apps)

🥇 [The CDK Handbook](https://thecdkbook.com/)

We will also be following closely the **pipeline reference architecture by AWS** over this series as shown below:

![img](https://miro.medium.com/v2/resize:fit:700/1*N1yuHCBbIVohyud6uE1IGw.png)

https://pipelines.devops.aws.dev/application-pipeline/index.html

👇 **Before we go any further** — please connect with me on LinkedIn for future blog posts and Serverless news https://www.linkedin.com/in/lee-james-gilmore/

![img](https://miro.medium.com/v2/resize:fit:630/0*t70cBmCSYRZUXh9-.png)

# What are we building? 🔩

The basic architecture for this demo is shown below, allowing us to generate build assets as well as the underlying CloudFormation through the CDK:

![img](https://miro.medium.com/v2/resize:fit:694/1*lKE2TZOzcHd4QX4HKkVu3w.png)

Example simple architecture that we are building out

**We can see from the diagram above that:**

1. Customers interact with Amazon API gateway for creating and querying order details.
2. The ‘Get Order’ Lambda function returns a given order by ID.
3. The ‘Create Order’ Lambda function creates the order and sends the order ID back.
4. The orders are stored in Amazon DynamoDB.
5. The invoices are stored in an Amazon S3 bucket.

This very basic setup allows us to demonstrate the use of CDK Pipelines etc

# ✔️ Common Vocabulary

Before we jump in, let’s discuss some common vocabulary that we will use:

⚪ **Workloads** - A workload is a set of components that together deliver business value (*essentially a service or application*). A workload is usually the level of detail that business and technology leaders communicate about. Examples of workloads are marketing websites, e-commerce websites, the back-ends for a mobile app, analytic platforms, etc.

⚪ **Environment** — An environment is an isolated target for deploying and testing a ***workload\*** and its dependencies, which is essentially made up of **region + account** (*e.g. region: eu-west-1 + accountId: ‘11111111111’*).
Example environments include creating separate AWS accounts for each developer, creating separate AWS accounts for staging and production, and using multiple regions for production traffic.

⚪ **Cloud Assembly** — The Cloud Assembly is the output of the synthesis (*build*) operation. It is essentially a set of files, CloudFormation and directories (*the* `*cdk.out*` *folder*), one of which is the `manifest.json` file. It defines the set of instructions that are needed in order to deploy the assembly directory.

⚪ **Stage** — An ‘*abstract application modelling unit*’ consisting of one or more Stacks that should be deployed together. You can then instantiate your stage multiple times to model multiple copies of your application which should be deployed to different ***environments with their own configuration.\***

This is shown below at a basic level including the pipeline that will deliver it:

<img src="https://miro.medium.com/v2/resize:fit:700/1*KMLSH6E-nrrkCsBgCsx3Yg.png" alt="img" style="zoom:150%;" />

Example of where the different parts come together

# Key considerations & code walkthrough

Let’s now discuss some of the key concepts and thought processes when we work with the AWS CDK and CDK Pipelines.

## ✔️ All environment specific stacks (stages) in code

One of the key differences with the AWS CDK compared to traditional CloudFormation is that in the AWS CDK you should model each of your stages/environments in separate stacks within a given CDK App with its own configuration, rather than producing a single artifact which can be parametrised.

> “In the AWS CDK you should model each of your stages/environments in separate stacks within a given CDK App with its own configuration, rather than producing a single artifact which can be parametrised”.

**This is from the AWS CDK Best Practices**:

> “In traditional AWS CloudFormation scenarios, your goal is to produce a single artifact that is parameterized so that it can be deployed to various target environments after applying configuration values specific to those environments. In the CDK, **you can, and should, build that configuration into your source code**. Create a **stack for your production environment, and create a separate stack for each of your other stages.**
>
> When you synthesize your application, the cloud assembly created in the `cdk.out` folder contains a separate template for each environment. Your entire build is deterministic. There are no out-of-band changes to your application, and any given commit always yields the exact same AWS CloudFormation template and accompanying assets. This makes unit testing much more reliable. — https://docs.aws.amazon.com/cdk/v2/guide/best-practices.html

If we looked at this from a code perspective, we can first split our pipeline and application into the following folder structure to keep it modular:

![img](https://miro.medium.com/v2/resize:fit:700/1*zFG9NqwpIoiO2VMLhSU2UQ.png)

our app and pipelines are modular and separated

We can then see that our **stage** is environment configuration agnostic, and the environment specific configuration is passed through in the stack props:

```javascript
import * as cdk from 'aws-cdk-lib';

import { Construct } from 'constructs';
import { EnvironmentConfig } from '../pipeline-types/pipeline-types';
import { StatefulStack } from '../../app/stateful/stateful-stack';
import { StatelessStack } from '../../app/stateless/stateless-stack';

// this is our stage made up of multiple stacks which will be deployed to various environments
// based on config i.e. feature-dev, staging, prod, which also includes our application config
export class PipelineStage extends cdk.Stage {
  public readonly apiEndpointUrl: cdk.CfnOutput;
  public readonly healthCheckUrl: cdk.CfnOutput;

  constructor(scope: Construct, id: string, props: EnvironmentConfig) {
    super(scope, id, props);

    const statefulStack = new StatefulStack(this, 'StatefulStack', {
      bucketName: props.stateful.bucketName,
    });
    const statelessStack = new StatelessStack(this, 'StatelessStack', {
      env: {
        account: props.env.account,
        region: props.env.region,
      },
      table: statefulStack.table,
      bucket: statefulStack.bucket,
      lambdaMemorySize: props.stateless.lambdaMemorySize,
      stageName: props.stageName,
    });

    this.apiEndpointUrl = statelessStack.apiEndpointUrl;
    this.healthCheckUrl = statelessStack.healthCheckUrl;
  }
}
```



This allows us in our pipeline to use this blueprint to create specific builds for each environment by amalgamating the stage with the environment specific application configuration (*more on this later below*).

✔️**Key** **Outcome** — Create different stages and therefore stacks for each specific environment i.e. ProdStack, FeatureDevStack, StagingStack etc.

⭕ **Disadvantages** — although this is best practice, you may find that there is an overhead in the initial creation of the multiple stacks which we will see below (*although this is small and simply a copy and paste to be fair*).

## ✔️ Configurations should be in code, not using environment variables

Within your CDK apps, you should add your configuration as actual code as opposed to passing through environment variables. This is discussed in the best practices paper also:

> “Within your CDK apps, you should add your configuration as actual code as opposed to passing through environment variables”

> “Then, **put the configuration values for each stack in the code**. Use services like [Secrets Manager](https://aws.amazon.com/secrets-manager/) and [Systems Manager](https://aws.amazon.com/systems-manager/) Parameter Store for sensitive values that you don’t want to check in to source control, using the names or ARNs of those resources.” — https://docs.aws.amazon.com/cdk/v2/guide/best-practices.html

**It goes on to say:**

> “Environment variable lookups inside constructs and stacks are a **common anti-pattern**. Both constructs and stacks should accept a properties object to allow for full configurability completely in code. Doing otherwise introduces a dependency on the machine that the code will run on, which creates yet more configuration information that you have to track and manage.”
>
> In general, environment variable lookups should be limited to the top level of an AWS CDK app. They should also be used to pass in information **that’s needed for running in a development environment**”. — https://docs.aws.amazon.com/cdk/v2/guide/best-practices.html

With this being said, we store our environment configurations in one file as shown below:

```javascript
import * as dotenv from 'dotenv';

import {
  Account,
  EnvironmentConfig,
  Region,
  Stage,
} from '../pipeline-types/pipeline-types';

dotenv.config();

export const environments: Record<Stage, EnvironmentConfig> = {
  // allow developers to spin up a quick branch for a given PR they are working on e.g. pr-124
  // this is done with an npm run develop, not through the pipeline, and uses the values in .env
  [Stage.develop]: {
    env: {
      account:
        process.env.ACCOUNT || (process.env.CDK_DEFAULT_ACCOUNT as string),
      region: process.env.REGION || (process.env.CDK_DEFAULT_REGION as string),
    },
    stateful: {
      bucketName:
        `serverless-pro-${process.env.PR_NUMBER}-bucket`.toLowerCase(),
    },
    stateless: {
      lambdaMemorySize: parseInt(process.env.LAMBDA_MEM_SIZE || '128'),
    },
    stageName: process.env.PR_NUMBER || Stage.develop,
  },
  [Stage.featureDev]: {
    env: {
      account: Account.featureDev,
      region: Region.dublin,
    },
    stateful: {
      bucketName: 'serverless-pro-feature-dev-bucket',
    },
    stateless: {
      lambdaMemorySize: 128,
    },
    stageName: Stage.featureDev,
  },
  [Stage.staging]: {
    env: {
      account: Account.staging,
      region: Region.dublin,
    },
    stateful: {
      bucketName: 'serverless-pro-staging-bucket',
    },
    stateless: {
      lambdaMemorySize: 512,
    },
    stageName: Stage.staging,
  },
  [Stage.prod]: {
    env: {
      account: Account.prod,
      region: Region.dublin,
    },
    stateful: {
      bucketName: 'serverless-pro-prod-bucket',
    },
    stateless: {
      lambdaMemorySize: 1024,
    },
    stageName: Stage.prod,
  },
};
```



If we talk through this, we can see that firstly we have a develop stage which does in fact use environment variables as this is specifically for developers to create their own ephemeral environments (*more on this later below*).

For feature-dev, staging and production, we can see that we have specific configuration for each, which will be synthesized into the cloud assembly once as an immutable build.

The key benefit of this is that our configuration can now be tested using Jest snapshots, and it is deterministic at build time. We will talk later through using a `.ts` file over other methods such as the `cdk.json` file.

```
Note: There is no reason you couldn't split these down into
their own files per environment; but as the example configuration is 
small, and this is for a demo, it is in one file.
```

We also have a file for the various types, interfaces, enums etc used in the environments configuration as shown below:

```javascript
export interface EnvironmentConfig {
  env: {
    account: string;
    region: string;
  };
  stageName: string;
  stateful: {
    bucketName: string;
  };
  stateless: {
    lambdaMemorySize: number;
  };
}

export const enum Region {
  dublin = 'eu-west-1',
  london = 'eu-west-2',
  frankfurt = 'eu-central-1',
}

export const enum Stage {
  featureDev = 'featureDev',
  staging = 'staging',
  prod = 'prod',
  develop = 'develop',
}

export const enum Account {
  featureDev = '11111111111',
  staging = '22222222222',
  prod = '33333333333',
}
```



This makes for easy lookups rather than magic strings within the code.

✔️**Key** **Outcome** — As each of our environments (*stages*) may need a different configuration, we should create an object to pass through as props to the given stack. An example of this would be a feature-dev environment only needing one instance for a database cluster, but in production it needs multiple. Or, lambda function memory in production needs to be 2046 as opposed to 1024. As discussed, the use of environment variables within stacks is a known anti-pattern.

⭕ **Disadvantages** — none. Using environment variables is no more or less onerous than using configuration as code; as well as environment variables being an anti-pattern.

## ✔️ Stateless vs Stateful

When we build out our AWS CDK apps we should ideally split each environment between Stateless and Stateful stacks.

> “When we build out our AWS CDK apps we should ideally split each environment between Stateless and Stateful stacks”

This is covered in the AWS best practices for AWS CDK:

> “**Consider keeping stateful resources (like databases) in a separate stack from stateless resources**. You can then turn on termination protection on the stateful stack. This way, you can freely destroy or create multiple copies of the stateless stack without risk of data loss.
>
> Stateful resources are more sensitive to construct renaming — renaming leads to resource replacement. Therefore, don’t nest stateful resources inside constructs that are likely to be moved around or renamed (unless the state can be rebuilt if lost, like a cache). This is another good reason to put stateful resources in their own stack.” — https://docs.aws.amazon.com/cdk/v2/guide/best-practices.html

If we look at our folder structure for our application (*workload*) we can see that it is split between ‘stateful’ and ‘stateless’:

![img](https://miro.medium.com/v2/resize:fit:700/1*b3WcyTF1ay3IImBGrPXS5g.png)

Our workload is made up of stateful and stateless stacks as per best practice

This essentially means that our **stage** is made up of two stacks, stateful and stateless. The stateful stack is for any long-lived stateful resources such as DynamoDB tables and S3 buckets (*things that won’t change often too*):

```javascript
import * as cdk from 'aws-cdk-lib';
import * as dynamodb from 'aws-cdk-lib/aws-dynamodb';
import * as s3 from 'aws-cdk-lib/aws-s3';

import { Construct } from 'constructs';
import { RemovalPolicy } from 'aws-cdk-lib';

export interface StatefulStackProps extends cdk.StackProps {
  bucketName: string;
}

export class StatefulStack extends cdk.Stack {
  public readonly bucket: s3.Bucket;
  public readonly table: dynamodb.Table;

  constructor(scope: Construct, id: string, props: StatefulStackProps) {
    super(scope, id, props);

    // create the s3 bucket for invoices
    this.bucket = new s3.Bucket(this, 'Bucket', {
      bucketName: props.bucketName, // this is passed through per env from config
    });

    // create the dynamodb table
    this.table = new dynamodb.Table(this, 'Table', {
      billingMode: dynamodb.BillingMode.PAY_PER_REQUEST,
      encryption: dynamodb.TableEncryption.AWS_MANAGED,
      pointInTimeRecovery: false,
      contributorInsightsEnabled: true,
      removalPolicy: RemovalPolicy.DESTROY,
      partitionKey: {
        name: 'id',
        type: dynamodb.AttributeType.STRING,
      },
    });
  }
}
```



We can see that this is environment agnostic like the stage which encompasses it. It is the same for the stateless stack as shown below:

```
Note: In our environment specific configuration we would typically
ensure the removal policies are set as retain for staging and production,
but for lower environments, we could set this as destroy. This would be 
stored in the environment specific config as covered earlier.
```

```javascript
import * as apigw from 'aws-cdk-lib/aws-apigateway';
import * as cdk from 'aws-cdk-lib';
import * as dynamodb from 'aws-cdk-lib/aws-dynamodb';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as nodeLambda from 'aws-cdk-lib/aws-lambda-nodejs';
import * as path from 'path';
import * as s3 from 'aws-cdk-lib/aws-s3';

import { Construct } from 'constructs';

export interface StatelessStackProps extends cdk.StackProps {
  env: {
    account: string;
    region: string;
  };
  table: dynamodb.Table;
  bucket: s3.Bucket;
  stageName: string;
  lambdaMemorySize: number;
}

export class StatelessStack extends cdk.Stack {
  public readonly apiEndpointUrl: cdk.CfnOutput;
  public readonly healthCheckUrl: cdk.CfnOutput;

  constructor(scope: Construct, id: string, props: StatelessStackProps) {
    super(scope, id, props);

    const { table, bucket } = props;

    // create the rest api
    const ordersApi: apigw.RestApi = new apigw.RestApi(this, 'Api', {
      description: `Serverless Pro API ${props.stageName}`,
      deploy: true,
      endpointTypes: [apigw.EndpointType.REGIONAL],
      cloudWatchRole: true,
      deployOptions: {
        stageName: props.stageName,
        loggingLevel: apigw.MethodLoggingLevel.INFO,
      },
    });

    // create the rest api resources
    const orders: apigw.Resource = ordersApi.root.addResource('orders');
    const healthCheck: apigw.Resource =
      ordersApi.root.addResource('health-checks');

    const order: apigw.Resource = orders.addResource('{id}');

    // create the lambdas
    const createOrderLambda: nodeLambda.NodejsFunction =
      new nodeLambda.NodejsFunction(this, 'CreateOrderLambda', {
        runtime: lambda.Runtime.NODEJS_16_X,
        entry: path.join(
          __dirname,
          'src/handlers/create-order/create-order.ts'
        ),
        memorySize: props.lambdaMemorySize, // this is passed through per env from config
        handler: 'handler',
        bundling: {
          minify: true,
          externalModules: ['aws-sdk'],
        },
        environment: {
          TABLE_NAME: table.tableName,
          BUCKET_NAME: bucket.bucketName,
        },
      });

    const getOrderLambda: nodeLambda.NodejsFunction =
      new nodeLambda.NodejsFunction(this, 'GetOrderLambda', {
        runtime: lambda.Runtime.NODEJS_16_X,
        entry: path.join(__dirname, 'src/handlers/get-order/get-order.ts'),
        memorySize: props.lambdaMemorySize, // this is passed through per env from config
        handler: 'handler',
        bundling: {
          minify: true,
          externalModules: ['aws-sdk'],
        },
        environment: {
          TABLE_NAME: table.tableName,
          BUCKET_NAME: bucket.bucketName,
        },
      });

    const healthCheckLambda: nodeLambda.NodejsFunction =
      new nodeLambda.NodejsFunction(this, 'HealthCheckLambda', {
        runtime: lambda.Runtime.NODEJS_16_X,
        entry: path.join(
          __dirname,
          'src/handlers/health-check/health-check.ts'
        ),
        memorySize: props.lambdaMemorySize, // this is passed through per env from config
        handler: 'handler',
        bundling: {
          minify: true,
          externalModules: ['aws-sdk'],
        },
      });

    // hook up the lambda functions to the api
    orders.addMethod(
      'POST',
      new apigw.LambdaIntegration(createOrderLambda, {
        proxy: true,
      })
    );

    order.addMethod(
      'GET',
      new apigw.LambdaIntegration(getOrderLambda, {
        proxy: true,
      })
    );

    healthCheck.addMethod(
      'GET',
      new apigw.LambdaIntegration(healthCheckLambda, {
        proxy: true,
      })
    );

    // grant the relevant lambdas access to our dynamodb database
    table.grantReadData(getOrderLambda);
    table.grantWriteData(createOrderLambda);

    // grant the create order lambda access to the s3 bucket
    bucket.grantWrite(createOrderLambda);

    this.apiEndpointUrl = new cdk.CfnOutput(this, 'ApiEndpointOutput', {
      value: ordersApi.url,
      exportName: `api-endpoint-${props.stageName}`,
    });

    this.healthCheckUrl = new cdk.CfnOutput(this, 'healthCheckUrlOutput', {
      value: `${ordersApi.url}health-checks`,
      exportName: `healthcheck-endpoint-${props.stageName}`,
    });
  }
}
```



Within the stage itself, we pass through the references from the stateful stack to the stateless stack through stack props as shown below:

```typescript
const statefulStack = new StatefulStack(this, 'StatefulStack', {
      bucketName: props.stateful.bucketName,
    });

const statelessStack = new StatelessStack(this, 'StatelessStack', {
  env: {
    account: props.env.account,
    region: props.env.region,
  },
  table: statefulStack.table,
  bucket: statefulStack.bucket,
  lambdaMemorySize: props.stateless.lambdaMemorySize,
  stageName: props.stageName,
});
```

✔️**Key** **Outcome** — Although this means for each stage we have two stacks, it does make sense to split your stacks from both a security perspective, as well as keeping code that changes often away from code that rarely changes. This allows developers to concentrate mainly on one area of the code base, and reduce cognitive load.

⭕ **Disadvantages** — the only disadvantage here is that you initially create two stacks per environment over one which could be argued is more work; however the benefits for developers after this far outweigh this.

## ✔️ Shared Constructs

Shared constructs should underpin your organisation, as:

> “Shared constructs should be used within your organisation to reduce duplication of effort, make your solutions more secure, and reduce cognitive load on teams.”

1. We want to reduce the cognitive load on development teams, and we can easily wrap complex patterns and reference architecture into composable units.
2. They should be deployed as a versioned code artefact to a shared repository (*for example* [*AWS CodeArtifact*](https://aws.amazon.com/codeartifact/)).
3. Key areas of the business, such as AppSec, can influence the L3/L4 constructs; as well as embedding dashboards for SREs, for example.

> “When packages begin to be used in multiple applications, move them to their own repository. This way, the packages can be referenced by application build systems that use them, and they can also be updated on cadences independent of the application lifecycles. However, at first it might make sense to put all shared constructs in one repository.”

Also, move packages to their own repository when different teams are working on them. This helps enforce access control.

✔️**Key** **Outcome** — Shared constructs should be used within your organisation to reduce duplication of effort, make your solutions more secure, and reduce cognitive load on teams. They should be versioned and deployed to a shared library/repository.

⭕ **Disadvantages** — none. There is no reason to duplicate code across an organisation. The only overheads are versioning and publishing the shared constructs to a shared repository.

## ✔️ Build one set of immutable and deterministic assets

Once we have split our app into multiple stacks for each environment, we need to consider how we build and deploy the correct version to each environment. CDK Pipelines manages this for us under the hood.

> “Your entire build is deterministic. There are no out-of-band changes to your application, and any given commit always yields the exact same AWS CloudFormation template and accompanying assets”

> “When you synthesize your application, the cloud assembly created in the `cdk.out` folder contains a separate template for each environment. Your entire build is deterministic. There are no out-of-band changes to your application, and any given commit always yields the exact same AWS CloudFormation template and accompanying assets. This makes unit testing much more reliable.” — https://docs.aws.amazon.com/cdk/v2/guide/best-practices.html

We can achieve this when we have our stages modelled as separate stacks, as when we perform a `cdk synth` we are essentially building one set of immutable deterministic assets (*cloud assembly*) for all environments.

> The source code should only be built and packaged once. The packaged artifact should then be staged in a registry with appropriate metadata and ready for deployment to any [environment](https://pipelines.devops.aws.dev/#environment). Build artifacts only once and then promote them through the pipeline. The output of the pipeline should be versioned and able to be traced back to the source it was built from and from the business requirements that defined it. — https://pipelines.devops.aws.dev/

We have already discussed above that we have our environment specific configurations stored in a typed file, and that our stages are all environment agnostic and made up of multiple stacks; but below is the glue which brings this all together:

As you can see above we have a specific stack to create our **pipeline**, and it is this file which bakes together the stages and configuration specific to each environment. Under the hood CDK Pipelines is doing the following for us:

```bash
# Synthesize all templates once to the cdk.out as one build
cdk synth

# Deploy our feature-dev stage and reference the assembly folder
cdk deploy --app 'cdk.out/' FeatureDev

# Do some tests here and approve stage

# Deploy our staging stage
cdk deploy --app 'cdk.out/' Staging

# Do some tests here and approve stage

# Deploy our prod stage (potentially after a manual approval step)
cdk deploy --app 'cdk.out/' Prod
```

If we look at `line 30` specifically, we can see that all stages will be synthesized once which will produce a ‘`cdk.out`’ folder which is the static immutable build of all of our stages. The build of the cloud assembly is shown below where we perform the install of node modules and the cdk synth command:

```javascript
primaryOutputDirectory: './serverless-pro/cdk.out',
  // source stage
  commands: [
    'cd ./serverless-pro',
    'npm ci',
    'npx cdk synth',
    'npm run test',
  ],
Note: Under the hood the CDK Pipeline is performing a 'cdk deploy'
for each of the stages using the --app parameter which allows you
to deploy specific stacks within the 'cdk.out' folder i.e. although
cdk synth is building all environments, we can specifically deploy
one environment at a time.
```

✔️**Key** **Outcome** — We can use the `cdk deploy` command with the `— app` flag to allow us to deploy a given environment within our cloud assembly containing all of our environments i.e. feature-dev, staging and prod; or we can allow the CDK Pipeline to manage this for us and it does this under the hood.

⭕ **Disadvantages** — you could argue that it is easier to just perform a `cdk deploy` with the given stack names at each stage, as opposed to an initial synth first, and passing the immutable assets through the pipeline. Once again, in my opinion, the benefits outweigh this initial setup, as best practice is to produce one set of immutable build assets at the start of the pipeline.

## ✔️ AWS account per environment, per service

For this one, we will keep high level, but it is [standard practice](https://aws.amazon.com/organizations/getting-started/best-practices/) to have an AWS account per environment, per service.

> “Best practice is for each environment to run in a separate AWS account.” — [AWS Well-Architected Framework](https://docs.aws.amazon.com/wellarchitected/latest/framework/welcome.html)

This is therefore something we need to consider when deploying our stages, as the configuration values need to be passed through into the stage props as discussed earlier (*allowing us to deploy to different accounts*):

```
export const enum Region {
  dublin = 'eu-west-1',
  london = 'eu-west-2',
  frankfurt = 'eu-central-1',
}

export const enum Stage {
  featureDev = 'featureDev',
  staging = 'staging',
  prod = 'prod',
  develop = 'develop',
}

export const enum Account {
  featureDev = '11111111111',
  staging = '22222222222',
  prod = '33333333333',
}
```

This allows us to use this static configuration when creating the stage specific application configuration to be passed into the pipeline as shown below:

```
const featureDevStage: PipelineStage = new PipelineStage(
  this,
  'FeatureDev',
  {
    ...environments.featureDev,
  }
);
```

We could also potentially pull these enum values above from [Secrets Manager](https://aws.amazon.com/secrets-manager/) (*or a metadata service*) if we are building out our accounts through a Landing Zone dynamically, where on the creation of a new AWS account (*environment*) we push the values (*account ID and region*) with a standard naming convention (*allowing us to pull down the values at synth time using a deterministic naming convention*), but for most this would be overkill.

✔️**Key** **Outcome** — We should have a dedicated AWS account per environment for each of our services which is considered common practice in the industry. We should pass these account details as stage props when deploying to multiple accounts.

⭕ **Disadvantages** — none. There is no excuse to deploy all environments and services to one account (*accounts are free!*), and this is one of the biggest anti-patterns in the serverless world to date.

## ✔️ Ephemeral Environments

One of the key tenants of Serverless is that you pay for use, so it makes it easy and quick to deploy temporary ephemeral environments when needed; for example developer testing or within pipelines for e2e tests. How do we manage this if we have environment specific configuration which is static?

We can achieve this by only allowing the use of environment variables for ephemeral environments, whereby the stage can be deployed to an environment direct from the developers machine using dynamic values:

```typescript
// add the develop stage on its own without being in the pipeline
// note: this is used purely for developer ephemeral environments
new PipelineStage(this, `Develop-${environments.develop.stageName}`, {
  ...environments.develop,
});
```

We can then pull in the required environment variables at build time within the same `pipeline-config.ts` file as shown below:

```typescript
// allow developers to spin up a quick branch for a given PR they are working on e.g. pr-124
// this is done with an npm run develop, not through the pipeline, and uses the values in .env
[Stage.develop]: {
  env: {
    account:
      process.env.ACCOUNT || (process.env.CDK_DEFAULT_ACCOUNT as string),
    region: process.env.REGION || (process.env.CDK_DEFAULT_REGION as string),
  },
  stateful: {
    bucketName:
      `serverless-pro-${process.env.PR_NUMBER}-bucket`.toLowerCase(),
  },
  stateless: {
    lambdaMemorySize: parseInt(process.env.LAMBDA_MEM_SIZE || '128'),
  },
  stageName: process.env.PR_NUMBER || Stage.develop,
},
```

This pulls in the values from a `.env` file in the root of the repository which is made up as shown below:

```
PR_NUMBER="PR-123"
LAMBDA_MEM_SIZE="128"
ACCOUNT="1111111111"
REGION="eu-west-1"
```

And is deployed via the following npm script, essentially deploying the specific developer ephemeral stacks only:

```
 "deploy:dev": "cdk deploy ServerlessPro/Develop-PR-123/StatefulStack ServerlessPro/Develop-PR-123/StatelessStack --profile=featuredev",
```

We could of course create a shell script for this which would dynamically pull in the right PR number, but for this basic repo that is overkill.

✔️**Key** **Outcome** —We are always going to need the flexibility of creating one off ephemeral environments for developers and this approach allows us to do this outside of the pipeline and dynamically.

⭕ **Disadvantages** — The only real disadvantage here is that developers would also need to tear down their own ephemeral stacks that they have deployed.

## ✔️ cdk.context.json for dynamic lookup values only

One of the outputs from a `cdk synth` is the CDK managed`cdk.context.json` file, which is described below:

> “The CDK Toolkit uses context to cache values retrieved from your AWS account during synthesis. Values include the Availability Zones in your account or the Amazon Machine Image (AMI) IDs currently available for Amazon EC2 instances. Because these values are provided by your AWS account, they can change between runs of your CDK application. This makes them a potential source of unintended change. The CDK Toolkit’s caching behaviour “freezes” these values for your CDK app until you decide to accept the new values.”

> The AWS CDK includes a mechanism called *context providers* to record a **snapshot of non-deterministic values**. This allows future synthesis operations to produce exactly the same template as they did when first deployed.
>
> The only changes in the new template are the changes that ***you\*** made in your code. When you use a construct’s `.fromLookup()` method, the result of the call is cached in `cdk.context.json`. You should commit this to version control along with the rest of your code to make sure that future executions of your CDK app use the same value. — https://docs.aws.amazon.com/cdk/v2/guide/best-practices.html#best-practices-apps

An example of when the `cdk.context.json` file is populated would be through the following code as this is essentially a lookup on values that ***could\*** change and are not deterministic:

```
const vpc = ec2.Vpc.fromLookup(this, 'VPC', {
  vpcId: 'vpc-id-111111111',
});
```

It would be easy to add all of our environment specific configuration options directly to the `cdk.context.json` file and read in the values at synth time; however, the file is **automatically generated and managed solely by the CDK**, so the best practice states:

> “Cached context values are **managed by the AWS CDK** and its constructs, including constructs you may write. **Do not add or change cached context values by manually editing files**. It can be useful, however, to review `cdk.context.json` occasionally to see what values are being cached.
>
> Context values that don't represent cached values should be stored under the `context` key of `cdk.json`. This way, they won't be cleared when cached values are cleared.” — https://docs.aws.amazon.com/cdk/v2/guide/context.html

OK, so it states above that we could potentially add environment specific context (*config*) values to the **cdk.json** file as they don’t represent cached values, and won’t be cleared down with the following command:

```
cdk context --clear
```

There is one big issue for me with using this option: **IntelliSense**. This is something that you won’t get with using the `cdk.json` file as you would need to use the following code, or similar, to get a value at synth time in code based on environment:

```
app.node.tryGetContext('prod').bucketName
```

When we have a large number of configuration properties this could lead to frustration and errors in our stack code, as opposed to having a typed object which can be used in code as shown below:

![img](https://miro.medium.com/v2/resize:fit:700/1*kVuP3SGiy__rQExVKEbrqw.png)

Example of our IntelliSense if we use a JSON object for our configurations over the cdk.json file

Another benefit of this approach as discussed earlier is unit testing the configuration using Jest snapshots as shown below:

```javascript
import { environments } from './pipeline-config';

// the config is deterministic so we can test this in our code
describe('pipeline-config', () => {
  it('should return the correct config for feature-dev', () => {
    expect(environments.featureDev).toMatchSnapshot();
  });

  it('should return the correct config for staging', () => {
    expect(environments.staging).toMatchSnapshot();
  });

  it('should return the correct config for prod', () => {
    expect(environments.prod).toMatchSnapshot();
  });
});
```

This is why personally I would go with the approach of the environment specific configuration being typed using TypeScript, which also makes for ease of testing and validation where required too.

✔️**Key** **Outcome** — Because they’re part of your application’s state, `cdk.json` and `cdk.context.json` must be committed to source control along with the rest of your app's source code, and allow the AWS CDK to manage dynamic values.

We could potentially utilise the `cdk.json` file solely for our non-dynamic environment configuration values, but we don’t get IntelliSense or typed safety which could lead to issues.

⭕ **Disadvantages** — One disadvantage here could be having configuration values in two places, i.e. a typed object file as well as the `cdk.json` file. This would be one for coding standards and ways or working in your organisation I would say personally (*agree on one and stick to it!*)

# Summary

I hope you found that useful as a basic example of creating an immutable build using the AWS CDK and CDK Pipelines and progressing it through environments into production in-line with AWS best practices.

In **Part 2** we will specifically deep dive into pipeline testing (*unit, integration, load*), manual approval stages, database deploys and SAST tooling.

## Serverless AWS CDK Pipeline Best Practices & Patterns — Part 2

### An opinionated discussion around how to set up, structure, and deploy your AWS CDK Serverless apps using CDK Pipelines…

blog.serverlessadvocate.com

In **Part 3** we will cover synthetics using CloudWatch Synthetic Canaries, dynamic configuration values stored in S3, and acceptance tests using Cypress.

In **Part 4** we will cover progressive deployments and feature flags.

# Wrapping up 👋

Please [go and subscribe on my YouTube channel](https://www.youtube.com/channel/UC_Bi6eLsBXpLnNRNnxKQUsA) for similar content!

![img](https://miro.medium.com/v2/resize:fit:700/0*jCK1eUPsX24nsBh6.png)

I would love to connect with you also on any of the following:

https://www.linkedin.com/in/lee-james-gilmore/
https://twitter.com/LeeJamesGilmore

If you enjoyed the posts please follow my profile [Lee James Gilmore](https://medium.com/u/2906c6def240?source=post_page-----39c4f4ae5aff----------------------) for further posts/series, and don’t forget to connect and say Hi 👋

Please also use the ‘clap’ feature at the bottom of the post if you enjoyed it! (*You can clap more than once!!*)

# About me

“*Hi, I’m Lee, an AWS Community Builder, Blogger, AWS certified cloud architect and Global Serverless Architect based in the UK; currently working for City Electrical Factors (UK) & City Electric Supply (US), having worked primarily in full-stack JavaScript on AWS for the past 6 years.*

*I consider myself a serverless advocate with a love of all things AWS, innovation, software architecture and technology.*”

