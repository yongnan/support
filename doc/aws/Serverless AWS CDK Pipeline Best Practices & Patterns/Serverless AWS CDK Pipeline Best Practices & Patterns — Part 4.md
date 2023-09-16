![img](https://miro.medium.com/v2/resize:fit:700/1*FFxRWGbvsSaYznLamw1bug.png)

Photo by [Ryan Quintal](https://unsplash.com/@ryanquintal?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText) on [Unsplash](https://unsplash.com/photos/97odosRYZ7w?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText)

# Serverless AWS CDK Pipeline Best Practices & Patterns — Part 4

## An opinionated discussion around how to set up, structure, and deploy your AWS CDK Serverless apps using CDK Pipelines in line with AWS best practice — Part 4. Code examples are written in TypeScript.

![Serverless Advocate](https://miro.medium.com/v2/resize:fill:88:88/1*6u1nEmQP9k12Cb-BVx99_A.png)

[Serverless Advocate](https://blog.serverlessadvocate.com/?source=post_page-----38205c85a18b--------------------------------)

·

Follow

29 min read

·

Apr 27



74









![img](https://miro.medium.com/v2/resize:fit:673/1*KLPu9hhLbrDPjnfbpulcxw.png)

## Preface

✔️ We add some AWS L3 custom CDK constructs into the solution.
✔️ We look at adding structured logging, metrics and tracing using the Lambda Powertools TypeScript package.
✔️ We deep dive into progressive deployments with AWS Lambda and AWS CodeDeploy for blue/green deployments.
✔️ We look at Feature Flags in our CI/CD pipeline using AWS AppConfig.

> “This series takes us through building out a fully fledged pipeline and full-stack application on AWS with full code repo.”

# Introduction

In **Part 1** we covered an opinionated discussion around how to set up,
structure, and deploy your AWS CDK Serverless apps using CDK
Pipelines in line with AWS best practices. You can view the link below:

## Serverless AWS CDK Pipeline Best Practices & Patterns — Part 1

### An opinionated discussion around how to set up, structure, and deploy your AWS CDK Serverless apps using CDK Pipelines

blog.serverlessadvocate.com

In **Part 2** we performed a deep dive into pipeline testing (*unit, integration, load*), manual approval stages, database deploys and SAST tooling:

## Serverless AWS CDK Pipeline Best Practices & Patterns — Part 2

### An opinionated discussion around how to set up, structure, and deploy your AWS CDK Serverless apps using CDK Pipelines…

blog.serverlessadvocate.com

In **Part 3** we covered synthetics using CloudWatch Synthetic Canaries, dynamic secret values which were stored in S3, and acceptance tests using Cypress as part of the pipeline.

## Serverless AWS CDK Pipeline Best Practices & Patterns — Part 3

### An opinionated discussion around how to set up, structure, and deploy your AWS CDK Serverless apps using CDK Pipelines…

blog.serverlessadvocate.com

In this part (**Part 4)** we will cover:

✔️ We add some AWS L3 custom CDK constructs into the solution.

✔️ We look at adding structured logging, metrics and tracing using the Lambda Powertools package.

✔️ We deep dive into progressive deployments with AWS Lambda and AWS CodeDeploy for blue/green deployments.

✔️ We look at Feature Flags in our CI/CD pipeline using AWS AppConfig.

The basic code for the article can be found below, but please note this is not production ready and is created solely to talk through the approaches and frameworks:

## GitHub - leegilmorecode/Serverless-AWS-CDK-Best-Practices-Patterns-Part-4: An opinionated…

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

We will also be following closely the pipeline reference architecture by AWS over this 4 part series as shown below:

![img](https://miro.medium.com/v2/resize:fit:700/0*HIIFUbBkf4T6HRrT.png)

👇 **Before we go any further** — please connect with me on LinkedIn for future blog posts and Serverless news https://www.linkedin.com/in/lee-james-gilmore/

![img](https://miro.medium.com/v2/resize:fit:630/0*PVF12bcHwTV8yYiu.png)

# What are we building? 🔩

The diagram below shows what we are building in this part of the series at a high level:

![img](https://miro.medium.com/v2/resize:fit:700/1*9RlujGeGudi4ZaVidRtWkg.png)

A highlighted diagram based on the parts we will be adding in this part of the series (other services omitted for brevity).

**We can see that:**

1. Customers use our shiny ReactJS frontend application for viewing and placing new orders.
2. The frontend client application uses our Orders API which is an Amazon API Gateway.
3. Our Lambda functions use an attached [Lambda Layer](https://docs.aws.amazon.com/appconfig/latest/userguide/appconfig-integration-lambda-extensions.html) to pull our feature flags/toggles from AWS AppConfig on a set cycle.
4. As part of our wider AWS CodePipeline we utilise AWS CodeDeploy to deploy our Lambda functions in a Blue/Green style, slowly scaling from a small set of functions having our new code to all of them over a fixed period of time.
5. If any of our new (*alias*) functions throw errors during that time period an attached Amazon CloudWatch alarm notifies an AWS SNS topic, and the deployment is rolled back.
6. A subscription on the AWS SNS topic emails the development team notifying them of the failed deployment.

Now that we know at a high level what we are building, now let’s look at the code and approaches.

# 🏅 Key considerations & code walkthrough

We are now going to augment the code from Part 3 of this series which has built up as we have gone along, to now finally being a fully fledged pipeline and full-stack application. Lets now cover custom L3 AWS Constructs, progressive Lambda deployments, and how we can utilise feature flags.

## ✔️ Custom L3 AWS CDK Constructs

> Constructs are the basic building blocks of AWS CDK apps. A construct represents a “cloud component” and encapsulates everything AWS CloudFormation needs to create the component. — https://docs.aws.amazon.com/cdk/v2/guide/constructs.html

So far on this journey we have relied solely on the L1 or L2 AWS CDK constructs which we get from the `aws-cdk-lib` package, and have not built out our own. The various levels of constructs are listed below:

1️⃣ **L1 constructs**

There are three different levels of constructs in this library, beginning with low-level constructs, which we call *CFN Resources* (or **L1**, short for “layer 1”). These constructs directly represent all resources available in AWS CloudFormation. For example, [CfnBucket](https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.aws_s3.CfnBucket.html) represents the [AWS::S3::Bucket](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-s3-bucket.html) AWS CloudFormation resource.

```
Note: When you use Cfn resources, you must explicitly configure
all resource properties.
```

2️⃣ **L2 constructs**

The next level of constructs, **L2**, also represent AWS resources, but with a higher-level, intent-based API. They provide similar functionality, but incorporate the defaults, boilerplate, and glue logic you’d be writing yourself with a CFN Resource construct. AWS constructs offer convenient defaults and reduce the need to know all the details about the AWS resources they represent. They also provide convenience methods that make it simpler to work with the resource. For example, the [s3.Bucket](https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.aws_s3.Bucket.html) class represents an Amazon S3 bucket with additional properties and methods, such as [bucket.addLifeCycleRule()](https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.aws_s3.Bucket.html#addwbrlifecyclewbrrulerule), which adds a lifecycle rule to the bucket.

3️⃣ **L3 constructs**

Finally, the AWS Construct Library includes **L3** constructs, which we call *patterns*. These constructs are designed to help you complete common tasks in AWS, often involving multiple kinds of resources. For example, the [aws-ecs-patterns.ApplicationLoadBalancedFargateService](https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.aws_ecs_patterns.ApplicationLoadBalancedFargateService.html) construct represents an architecture that includes an AWS Fargate container cluster employing an Application Load Balancer. The [aws-apigateway.LambdaRestApi](https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.aws_apigateway.LambdaRestApi.html) construct represents an Amazon API Gateway API that’s backed by an AWS Lambda function.

When it comes to L3 constructs, we have the option of using patterns created by AWS, patterns on [construct hub](https://constructs.dev/) which have been created in an open source nature by the community, or we can build our own and share them within our organisation.

```
Note: In this example we are going to create the custom constructs
in the repo only, and don't publish them to an npm package
manager or equivalent. We will cover this in a separate article.
```

**Firstly, why would we build our own constructs?** 🏗️

One of the major benefits of the AWS CDK over other IaC frameworks such as the Serverless Framework is that you can easily create, share and distribute your own constructs which are tailored to your organisation.

> “One of the major benefits of the AWS CDK over other IaC frameworks such as the Serverless Framework is that you can easily create, share and distribute your own constructs which are tailored to your organisation.”

**Examples could be:**

✔️ Building out composable reference architecture which has been ratified by your security and engineering teams.

✔️ You may want to restrict certain properties from being used on the construct in your organisation, and set your own default properties inline with your policies.

✔️ You may want to embed dashboards and alerting as standard for your ops and engineering teams, and to take the cognitive load and duplication away from your engineers.

✔️ You may want to have standards in place across your organisation.

In our code base in **part 4** we have built a number of custom L3 constructs to help us on our journey as listed below:

![img](https://miro.medium.com/v2/resize:fit:700/1*TI7chIC6ZSja_VTux_1e9A.png)

The L3 custom CDK constructs that we build out in part 4

We can see that they live alongside the `app` and `pipeline` folders in a `constructs` folder for consistency.

**Lets walk through an example for our API construct** 🏗️

In our example we need an Amazon API Gateway Rest API for our Orders domain service interface for the front-end client application to use.

Typically for this we would utilise the L2 `RestApi` construct from the package ‘`aws-cdk-lib/aws-apigateway`’.

This would work perfectly fine, however in our example we want to restrict the properties that an engineer can pass into the construct, and we want to add some fixed properties too. The code is shown below:

```
import * as apigw from 'aws-cdk-lib/aws-apigateway';

import { Construct } from 'constructs';

interface ApiProps extends Pick<apigw.RestApiProps, 'description' | 'deploy'> {
  /**
   * The stage name which the api is being used with
   */
  stageName: string;
  /**
   * The api description
   */
  description: string;
  /**
   * Whether or not to deploy the api
   */
  deploy: boolean;
}

type FixedApiProps = Omit<apigw.RestApiProps, 'description' | 'deploy'>;

export class Api extends Construct {
  public readonly api: apigw.RestApi;

  constructor(scope: Construct, id: string, props: ApiProps) {
    super(scope, id);

    const fixedProps: FixedApiProps = {
      defaultCorsPreflightOptions: {
        allowOrigins: apigw.Cors.ALL_ORIGINS,
        allowCredentials: true,
        allowMethods: ['OPTIONS', 'POST', 'GET'],
        allowHeaders: ['*'],
      },
      endpointTypes: [apigw.EndpointType.REGIONAL],
      cloudWatchRole: true,
      deployOptions: {
        stageName: props.stageName,
        loggingLevel: apigw.MethodLoggingLevel.INFO,
      },
    };

    this.api = new apigw.RestApi(this, id + 'Api', {
      // fixed props
      ...fixedProps,
      // custom props
      description: props.description
        ? props.description
        : `Serverless Pro API ${props.stageName}`,
      deploy: props.deploy ? props.deploy : true,
    });
  }
}
```

As this is a made up scenario purely for the means of writing a series of articles, you could say above that we have been very strict on the props that we allow a person to interact with; but this shows the power of further restricting properties inline with your organisation and policies (*play around with what works for you and your org*).

We can see from the code above that we first create a new interface for the props called `ApiProps` that can be passed into the L3 construct which extend/pick some of the properties from the L2 `RestApiProps` interface (*the ones that we allow people to interact with alongside any of our own, like ‘stageName’*):

```
interface ApiProps extends Pick<apigw.RestApiProps, 'description' | 'deploy'> {
  /**
   * The stage name which the api is being used with
   */
  stageName: string;
  /**
   * The api description
   */
  description: string;
  /**
   * Whether or not to deploy the api
   */
  deploy: boolean;
}
```

We also create a type for the `FixedApiProps` which we will create to allow us to set and type the fixed properties (*we can see that this is the RestApiProps minus the ones we are allowing people to interact with through the custom props*):

```
type FixedApiProps = Omit<apigw.RestApiProps, 'description' | 'deploy'>;
```

We then simply create a class called `Api` which extends the `Construct` base class, creating a public readonly `RestApi` property which we will assign to when we create an instance of the class (*with our fixed properties and custom properties*).

```
public readonly api: apigw.RestApi;
```

We then set our fixed properties that we don’t want anybody to change as shown below (*again these are purely made up for the article and would be specific to your needs*):

```
const fixedProps: FixedApiProps = {
  defaultCorsPreflightOptions: {
    allowOrigins: apigw.Cors.ALL_ORIGINS,
    allowCredentials: true,
    allowMethods: ['OPTIONS', 'POST', 'GET'],
    allowHeaders: ['*'],
  },
  endpointTypes: [apigw.EndpointType.REGIONAL],
  cloudWatchRole: true,
  deployOptions: {
    stageName: props.stageName,
    loggingLevel: apigw.MethodLoggingLevel.INFO,
  },
};
```

and we finally spread the fixed properties and custom properties into the RestApi instance construct that we will be returning:

```
this.api = new apigw.RestApi(this, id + 'Api', {
  // fixed props
  ...fixedProps,
  // custom props
  description: props.description
    ? props.description
    : `Serverless Pro API ${props.stageName}`,
  deploy: props.deploy ? props.deploy : true,
});
```

We can now utilise this custom L3 **Api** construct in code multiple times as shown below:

```
// create the rest api
this.ordersApi = new Api(this, 'Api', {
  description: `Serverless Pro API ${props.stageName}`,
  stageName: props.stageName,
  deploy: true,
}).api;
```

This is of course a very simple implementation of the construct and the real power comes from being able to create a custom L3 (*level 3*) construct which encompasses multiple L2 constructs to create a ‘pattern’, **which is covered further into the article in the section for Progressive Lambda Deployments.**

> “..the real power comes from being able to create a custom L3 construct which encompasses multiple L2 constructs to create a pattern”

## ✔️ Structured logging, metrics and tracing using Lambda Powertools

> “Powertools is a developer toolkit to implement Serverless [best practices and increase developer velocity](https://awslabs.github.io/aws-lambda-powertools-typescript/latest/#features). You can use Powertools in both TypeScript and JavaScript code bases.”

Before we jump into the next section on ***progressive deployment of lambda functions in a blue/green approach\***, let’s first look at integrating the Lambda Powertools package which allows us to implement structured logging, metrics, and tracing; one of which is a precursor to our next section.

## Homepage

### AWS Lambda Powertools for TypeScript

awslabs.github.io

The [Lambda Powertools for TypeScript](https://awslabs.github.io/aws-lambda-powertools-typescript/latest/) covers the following three key areas (*currently*):

🏅 **Logging** — Structured logging made easier, and a middleware to enrich structured logging with key Lambda context details

🏅 **Tracing** — Decorators and utilities to trace Lambda function handlers, and both synchronous and asynchronous functions

🏅 **Metrics** — Custom Metrics created asynchronously via CloudWatch Embedded Metric Format (EMF). This will allow us to alert on errors for our progressive deployments.

This allows serverless engineers too quickly embed best practices around observability and instrumentation without the heavy lifting or cognitive load.

Let’s start by looking at the file *./serverless-pro/lib/app/stateless/src/handlers/list-orders/list-orders.ts* (i.e. **ListOrders function handler**) where we start with the relevant imports:

```
...
import { Logger, injectLambdaContext } from '@aws-lambda-powertools/logger';
import {
  MetricUnits,
  Metrics,
  logMetrics,
} from '@aws-lambda-powertools/metrics';
import { Tracer, captureLambdaHandler } from '@aws-lambda-powertools/tracer';
import middy from '@middy/core';
...
```

You will notice above that we pull in the relevant imports from the [@aws-lambda-powertools](https://awslabs.github.io/aws-lambda-powertools-typescript/latest/) module, as well as the [@middy/core](https://middy.js.org/) package into the top of our lambda handlers.

```
Middy middleware is used for organising your Lambda code,
removing code duplication, and allowing engineers
to focus on the business logic.
```

## Middy, the stylish Node.js middleware engine for AWS Lambda

### The stylish Node.js middleware engine for AWS Lambda Organise your Lambda code, remove code duplication, focus on…

middy.js.org

The Core Middy package allows us to wrap our function handler with middleware which works in conjunction with the Lambda Powertools package. This is shown in the code below (*with the main listOrdersHandler code removed for brevity*):

```
export const listOrdersHandler: APIGatewayProxyHandler =
  async (): Promise<APIGatewayProxyResult> => {
            ...
};

export const handler = middy(listOrdersHandler)
  .use(
    injectLambdaContext(logger, {
      logEvent: logEvent.toLowerCase() === 'true' ? true : false,
    })
  )
  .use(captureLambdaHandler(tracer))
  .use(logMetrics(metrics));
```

This middleware wrapping our core function handler (*listOrdersHandler*) will:

1. **injectLambdaContext** — Using this middleware on your handler function will automatically add context information to structured logs, as well as optionally log the event and clear attributes set during the invocation.
2. **captureLambdaHandler** — allows for automating capture of metadata and annotations on segments or subsegments for a Lambda Handler.
3. **logMetrics** — Using this middleware on your handler function will automatically flush metrics after the function returns or throws an error

OK, so we have now added the relevant imports and wrapped our handler with the middy middleware to get the basic defaults; so now lets instantiate our three objects as shown below:

```
...
const { logLevel, logSampleRate, logEvent } = config.get('shared.functions');

const logger = new Logger({
  serviceName: 'list-orders',
  logLevel: logLevel as LogLevel,
  sampleRateValue: logSampleRate,
});

const tracer = new Tracer();
const metrics = new Metrics();
...
```

The code above will firstly pull in our configuration for `logLevel`, `logSampleRate` and `logEvent`, before instantiating our objects for `Logger`, `Tracer` and `Metrics` outside of the main handler code.

```
Note: By instantiating outside of the handler, 
subsequent invocations processed by the same instance of your
function can reuse these resources. This saves cost by 
reducing function run time.
```

Firstly, **logging** is extremely simple in code as shown below:

```
logger.info('started');
logger.error('An error!');
logger.debug('debug');
```

This means that within Amazon CloudWatch we have structured logging as shown below as an example (*including information about function cold starts, sampling rates, log levels, memory size etc*):

```
{
    "cold_start": true,
    "function_arn": "arn:aws:lambda:eu-west-1:123456789123:function:featureDev-StatelessStack-ListOrdersLambda06B4A617-2PRcAxK4IkCJ:featureDev",
    "function_memory_size": 128,
    "function_name": "featureDev-StatelessStack-ListOrdersLambda06B4A617-2PRcAxK4IkCJ",
    "function_request_id": "e836bfe0-e0e7-4e96-a3f3-20c5196581c1",
    "level": "INFO",
    "message": "started",
    "sampling_rate": 1,
    "service": "list-orders",
    "timestamp": "2023-04-26T12:56:36.495Z",
    "xray_trace_id": "1-64491f83-74edae9a59325a2102530d0f"
}
Note: Having standard logs across your microservices within
an organisation can help with searching across distributed files
and AWS accounts more easily.
```

Next, we can add custom **metrics** to our functions; with our examples being specifically for `ListOrdersSuccess` and `ListOrdersError`. This is shown below:

```
...
// we create the metric for success
metrics.addMetric('ListOrdersSuccess', MetricUnits.Count, 1);
...

// we create the metric for failure
metrics.addMetric('ListOrdersError', MetricUnits.Count, 1);
...
```

The specific metrics for failure (`ListOrdersError`) allow us to setup Amazon CloudWatch alarms which can be used in conjunction with our Lambda function Blue/Green deployments to rollback bad deployments if we see a specific number of these error metrics pass pre-defined thresholds within a given time period.

![img](https://miro.medium.com/v2/resize:fit:700/1*Q9v1T57h1-hLOU-nOvJtFQ.png)

An example of viewing these metrics in the console, where we can see both the ‘ListOrdersSuccess’ and ‘ListOrdersError’ metric counts over a 5 minute period. We can use these metrics to setup Amazon CloudWatch alarms to rollback our bad deployments.

Let’s cover this in the next section where we look at using these metrics when setting up the alarms.

## ✔️ Progressive Deployments using Lambda Blue/Green approach

> “Deployments should be made progressively in waves to limit the impact of failures. A common approach is to deploy changes to a subset of AWS regions and allow sufficient bake time to monitor performance and behavior before proceeding with additional waves of AWS regions.
>
> Software should be deployed using one of progressive deployment involving controlled rollout of a change through techniques such as canary deployments, feature flags, and traffic shifting. Software deployments should be performed through *Infrastructure Source Code*. Access to the production environment should be handled via [cross-account IAM roles](https://docs.aws.amazon.com/IAM/latest/UserGuide/tutorial_cross-account-with-roles.html) rather than long lived credentials from IAM users. Examples of tools to deploy software include but are not limited to [AWS CodeDeploy](https://aws.amazon.com/codedeploy/). Ideally, deployments should be automatically failed and rolled back when error thresholds are breached. Examples of automated rollback include [AWS CloudFormation monitor & rollback](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/using-cfn-rollback-triggers.html), [AWS CodeDeploy rollback](https://docs.aws.amazon.com/codedeploy/latest/userguide/deployments-rollback-and-redeploy.html) and [Flagger](https://flagger.app/).” — https://pipelines.devops.aws.dev/application-pipeline/index.html#test-beta

![img](https://miro.medium.com/v2/resize:fit:700/1*mAsfyWoJfe0mkbQ0q-qdlQ.png)

> One of the key things for me here is that it is deemed only in Production that you would run these, however personally I want to ensure that the build works when ran in Staging too.

In our example Orders API we have three distinct Lambda functions that sit behind the API:

- **CreateOrder**
- **GetOrder**
- **ListOrders**

Ideally when we make a change to these functions we want to deploy progressively using a Blue/Green technique; allowing us to deploy first to a subset of functions ([*our canary in the coal mines*](https://martinfowler.com/bliki/CanaryRelease.html)),

![img](https://miro.medium.com/v2/resize:fit:672/1*mqoShAUh5F9sAWxUVikSdw.png)

AWS CodeDeploy deploys 5% of traffic to our new functions, and 95% remain on the previous code and configuration.

And over a period of time slowly rolling out to 100% of traffic using the new code and configuration.

![img](https://miro.medium.com/v2/resize:fit:668/1*vyEzWf_wz80wLEl2XVFpRQ.png)

When we are not in an alarm state i.e. no errors with the new code, we slowly move over to 100% traffic of the new code and configuration.

If however we find that we are having issues with the 5% initial traffic during the deployment we fail back:

![img](https://miro.medium.com/v2/resize:fit:671/1*8SmvXRqlwRXHuDPqgplybw.png)

If we find that we have error with the new code it will go into an alarm state and 100% of traffic will fall back to the previous version of the code and configuration.

Our approach is to use Lambda Alias’s with AWS CodeDeploy wrapped into an L3 construct for ease of engineering and reduced cognitive load on teams, which:

- Deploys new versions of your Lambda function, and automatically creates aliases that point to the new version.
- Gradually shifts customer traffic to the new version until you’re satisfied that it’s working as expected. If an update doesn’t work correctly, you can roll back the changes.
- Automatically rolls back the deployment if CloudWatch alarms are triggered.

**What are the benefits of this over an all at once deployment strategy?**

Let’s think about our example, where customers can create new orders. We make a change to the code base which checks that the customers order quantity is not over a certain threshold, and we deploy in an all at once fashion to 100% of our functions.

After a period of time we find out that we got our logic wrong and 100% of new orders have been failing for around 15 minutes, culminating in **$$$** of huge revenue loss.

If we had approached this in a blue/green progressive manner, we would have only deployed the new code to a small amount of our overall functions, greatly minimising the revenue loss to only a tiny subset of all new orders, and also automatically rolling the failing code and functions back out (*i.e. reverting back to the working code*)

**How can we achieve this with a custom L3 construct?**

Let’s now look at the code for our custom `ProgressiveLambda` construct:

```
import * as actions from 'aws-cdk-lib/aws-cloudwatch-actions';
import * as cloudwatch from 'aws-cdk-lib/aws-cloudwatch';
import * as codeDeploy from 'aws-cdk-lib/aws-codedeploy';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as nodeLambda from 'aws-cdk-lib/aws-lambda-nodejs';
import * as sns from 'aws-cdk-lib/aws-sns';

import { Duration, RemovalPolicy } from 'aws-cdk-lib';

import { Construct } from 'constructs';

interface ProgressiveLambdaProps extends nodeLambda.NodejsFunctionProps {
  /**
   * The stage name which the lambda is being used with
   */
  stageName: string;
  /**
   * The code deploy application which this lambda is part of
   */
  application: codeDeploy.LambdaApplication;
  /**
   * The code deploy lambda deployment config
   */
  deploymentConfig: codeDeploy.ILambdaDeploymentConfig;
  /**
   * whether or not the alarm is enabled
   */
  alarmEnabed: boolean;
  /**
   * A reference to the sns topic which the alarm will use
   */
  snsTopic: sns.Topic;
  /**
   * the metric name for our alarm
   */
  metricName: string;
  /**
   * the namespace for our alarm
   */
  namespace: string;
  /**
   * the service name for our alarm
   */
  serviceName: string;
}

export class ProgressiveLambda extends Construct {
  public readonly lambda: nodeLambda.NodejsFunction;
  public readonly alias: lambda.Alias;
  public readonly alarm: cloudwatch.Alarm;

  public readonly deploymentGroup: codeDeploy.LambdaDeploymentGroup;
  private readonly application: codeDeploy.LambdaApplication;
  private readonly deploymentConfig: codeDeploy.ILambdaDeploymentConfig;

  constructor(scope: Construct, id: string, props: ProgressiveLambdaProps) {
    super(scope, id);

    this.application = props.application;
    this.deploymentConfig = props.deploymentConfig;

    // creation of the lambda passing through the props
    this.lambda = new nodeLambda.NodejsFunction(this, id, {
      ...props,
    });

    // the lambda alias
    this.alias = new lambda.Alias(this, id + 'Alias', {
      aliasName: props.stageName,
      version: this.lambda.currentVersion,
    });

    // a fixed prop cloudwatch alarm
    this.alarm = new cloudwatch.Alarm(this, id + 'Failure', {
      alarmDescription: `${props.namespace}/${props.metricName} deployment errors > 0 for ${id}`,
      actionsEnabled: props.alarmEnabed,
      treatMissingData: cloudwatch.TreatMissingData.NOT_BREACHING, // ensure the alarm is only triggered for a period
      metric: new cloudwatch.Metric({
        metricName: props.metricName,
        namespace: props.namespace,
        statistic: cloudwatch.Stats.SUM,
        dimensionsMap: {
          service: props.serviceName,
        },
        period: Duration.minutes(1),
      }),
      threshold: 1,
      comparisonOperator:
        cloudwatch.ComparisonOperator.GREATER_THAN_OR_EQUAL_TO_THRESHOLD,
      evaluationPeriods: 1,
    });

    this.alarm.addAlarmAction(new actions.SnsAction(props.snsTopic));
    this.alarm.applyRemovalPolicy(RemovalPolicy.DESTROY);

    // the code deploy deployment group
    this.deploymentGroup = new codeDeploy.LambdaDeploymentGroup(
      this,
      id + 'CanaryDeployment',
      {
        alias: this.alias,
        deploymentConfig: this.deploymentConfig,
        alarms: [this.alarm],
        application: this.application,
      }
    );
  }
}
```

You can see that we start by defining our `ProgressiveLambdaProps` which extend the interface of `NodejsFunctionProps`; which we supplement with additional props:

```
interface ProgressiveLambdaProps extends nodeLambda.NodejsFunctionProps {
  /**
   * The stage name which the lambda is being used with
   */
  stageName: string;
  /**
   * The code deploy application which this lambda is part of
   */
  application: codeDeploy.LambdaApplication;
  /**
   * The code deploy lambda deployment config
   */
  deploymentConfig: codeDeploy.ILambdaDeploymentConfig;
  /**
   * whether or not the alarm is enabled
   */
  alarmEnabed: boolean;
  /**
   * A reference to the sns topic which the alarm will use
   */
  snsTopic: sns.Topic;
  /**
   * the metric name for our alarm
   */
  metricName: string;
  /**
   * the namespace for our alarm
   */
  namespace: string;
  /**
   * the service name for our alarm
   */
  serviceName: string;
}
```

We then ensure we allow consumers of the construct to access the Lambda function, the Lambda function Alias, and the CloudWatch alarm:

```
public readonly deploymentGroup: codeDeploy.LambdaDeploymentGroup;
private readonly application: codeDeploy.LambdaApplication;
private readonly deploymentConfig: codeDeploy.ILambdaDeploymentConfig;
```

From here we create the Lambda function and the Lambda function alias:

```
// creation of the lambda passing through the props
this.lambda = new nodeLambda.NodejsFunction(this, id, {
  ...props,
});

// the lambda alias
this.alias = new lambda.Alias(this, id + 'Alias', {
  aliasName: props.stageName,
  version: this.lambda.currentVersion,
});
```

We then create the Amazon CloudWatch Alarm based on the Lambda function errors over a minute period, which is stating:

1. We will utilise our error metric depending on the handler, for example `ListOrdersError`, which is passed into the `metricName` property.
2. We will utilise the namespace for the stage, for example `ServerlessProFeatureDev`.
3. We will use the statistic of `sum`, which means the sum total of these metrics in a given namespace for a period of time.
4. The `period` of time in this example is `1 minute`.
5. We set the `threshold` to 1 and the `comparisonOperator` to “*greater than or equal to threshold*”, meaning that in that time period of 1 minute we need one or more of these metrics to trigger the alarm.
6. We add the `dimensionMap` property of `service`, which in our example for the featureDev stage would be `serverless-pro-orders-service-feature-dev`.

This is shown in the code below:

```
this.alarm = new cloudwatch.Alarm(this, id + 'Failure', {
  alarmDescription: `${props.namespace}/${props.metricName} deployment errors > 0 for ${id}`,
  actionsEnabled: props.alarmEnabed,
  treatMissingData: cloudwatch.TreatMissingData.NOT_BREACHING, // ensure the alarm is only triggered for a period
  metric: new cloudwatch.Metric({
    metricName: props.metricName,
    namespace: props.namespace,
    statistic: cloudwatch.Stats.SUM,
    dimensionsMap: {
      service: props.serviceName,
    },
    period: Duration.minutes(1),
  }),
  threshold: 1,
  comparisonOperator:
    cloudwatch.ComparisonOperator.GREATER_THAN_OR_EQUAL_TO_THRESHOLD,
  evaluationPeriods: 1,
});

this.alarm.addAlarmAction(new actions.SnsAction(props.snsTopic));
this.alarm.applyRemovalPolicy(RemovalPolicy.DESTROY);
Note - the metric name which is passed into the class is
the same error metrics which we discussed in the previous
section i.e. ListOrdersError, for example.
```

The final part to the puzzle is the AWS CodeDeploy deployment group as shown below:

```
// the code deploy deployment group
this.deploymentGroup = new codeDeploy.LambdaDeploymentGroup(
  this,
  id + 'CanaryDeployment',
  {
    alias: this.alias,
    deploymentConfig: this.deploymentConfig,
    alarms: [this.alarm],
    application: this.application,
  }
);
```

This is created by passing in the CloudWatch alarm, the Lambda function alias, the Code Deploy Application, and the Code Deploy deployment group as props.

We can now utilise this `ProgresssiveLambda` construct for our three functions: `GetOrder`, `CreateOrder` and `ListOrders`, as shown below:

```
const { alias: createOrderLambdaAlias, lambda: createOrderLambda } =
  new ProgressiveLambda(this, 'CreateOrderLambda', {
    stageName: props.stageName,
    serviceName: props.powerToolServiceName,
    metricName: 'OrderCreatedError',
    namespace: props.powerToolsMetricsNamespace,
    tracing: lambda.Tracing.ACTIVE,
    logRetention: RetentionDays.ONE_DAY,
    architecture: lambda.Architecture.ARM_64,
    application,
    alarmEnabed: true,
    snsTopic: lambdaDeploymentTopic,
    timeout: cdk.Duration.seconds(10),
    retryAttempts: 0,
    deploymentConfig:
      codeDeploy.LambdaDeploymentConfig.CANARY_10PERCENT_5MINUTES,
    runtime: lambda.Runtime.NODEJS_16_X,
    layers: [appConfigLambdaLayerExtension],
    entry: path.join(
      __dirname,
      'src/handlers/create-order/create-order.ts'
    ),
    memorySize: props.lambdaMemorySize,
    handler: 'handler',
    bundling: {
      minify: true,
      externalModules: ['aws-sdk'],
      sourceMap: true,
    },
    environment: {
      TABLE_NAME: table.tableName,
      BUCKET_NAME: bucket.bucketName,
      RANDOM_ERRORS_ENABLED: props.randomErrorsEnabled,
      ...appConfigEnvironment,
      ...lambdaPowerToolsConfig,
      FLAG_CREATE_ORDER_ALLOW_LIST: createOrderAllowList,
      FLAG_PREVENT_CREATE_ORDERS: opsPreventCreateOrders,
      FLAG_CHECK_CREATE_ORDER_QUANTITY: releaseCheckCreateOrderQuantity,
    },
  });
```

You can see from the code above that our Lambda function will now be deployed in a Blue/Green fashion with an associated CloudWatch alarm which will rollback the deployment (*and fail our pipeline*) on error.

✔️ **What does this look like when we run the deployment?**

If we run the progressive deployment of our functions we can see the alias percentage shifts below for the `create order` function:

![img](https://miro.medium.com/v2/resize:fit:700/1*wXgsTz-aY6y3B_PHquI3oQ.png)

We can see that we have two versions of our functions deployed at 90% and 10% weight

If we go into AWS CodeDeploy for this specific deployment we can see the same weighting and the deployment in progress:

![img](https://miro.medium.com/v2/resize:fit:700/1*aH4cdJAAAnXhwziqNh4yWg.png)

We can then see the successful completion after 5 minutes whereby all traffic is now shifted as no alarms were raised i.e. no errors:

![img](https://miro.medium.com/v2/resize:fit:700/1*FLDpf0k8S7jdHJMJ5xohaA.png)

This has run a deployment configuration that shifts 10 percent of traffic in the first increment. The remaining 90 percent is deployed five minutes later.

❌ **OK, so what does it look like when we have a failure?**

In the code repo I have created a function at `serverless-pro/lib/app/stateless/src/shared/random-errors.ts` which simulates a random error being thrown as shown below:

```
// this is a helper function that will throw a random error
// to test out rollbacks during deployment.
export const randomErrors = (enabled: string | undefined): void | Error => {
  if (enabled?.toLowerCase() === 'false') return;

  if (Math.random() > 0.1) {
    throw new Error('spurious error!!!');
  }
};
```

To use this function to force random errors in our Lambda functions we update our configuration file in `serverless-pro/lib/pipeline/pipeline-config/pipeline-config.ts` to set the `randomErrorsEnabled` boolean value to `true` for the relevant environment.

```
...
 stateless: {
    lambdaMemorySize: 128,
    canaryNotificationEmail: 'your-email@gmail.com',
    randomErrorsEnabled: 'true', // <-- here
  },
...
```

If we now run the amended config through the pipeline we will see that our spurious errors cause the CloudWatch Alarm to fire and the deployment to automatically rollback to the previous good working version of the Lambda function:

![img](https://miro.medium.com/v2/resize:fit:700/1*_dJsoJftMgfU5E2j72ORRw.png)

We can see the periods of time where we had an error state in red which causes the alarm to trigger during the deployment.

We can then see that we have an automatic rollback within AWS CodeDeploy based on the alarm above — and the code is rolled back to the previous version of the code and configuration:

![img](https://miro.medium.com/v2/resize:fit:700/1*JP3Hos4giPOrn0_Q0Bjc2A.png)

OK, so we have now covered custom L3 constructs using the AWS CDK, the integration of Lambda Powertools, and progressive deployments of Lambda functions through AWS CodeDeploy. Now let’s cover feature flags (*toggles*) in the last section.

## ✔️ Feature Flags using AWS App Config

> “Feature Toggles (often also refered to as Feature Flags) are a powerful technique, allowing teams to modify system behavior without changing code. They fall into various usage categories, and it’s important to take that categorization into account when implementing and managing toggles. Toggles introduce complexity. We can keep that complexity in check by using smart toggle implementation practices and appropriate tools to manage our toggle configuration, but we should also aim to constrain the number of toggles in our system.” — https://martinfowler.com/articles/feature-toggles.html

In this last section we are going to look at Feature Flags (*or Feature Toggles*) which broadly fit into the following categories when deploying code to production regularly:

- 🏳️ **Release Flags**. These allow engineering teams and product owners to decide on when to release new functionality to users or not which have already been deployed to production through continuous delivery.
- 🏳️ **Operational Flags**. These flags allow teams to turn on/off features from an operational standpoint, potentially for maintenance, or a system is currently under too much load, for example.
- 🏳 ️**Permission Flags**. These flags allow you to restrict functionality to a subset of the overall user base, potentially based on groups. An example would be allowing only your engineering or support teams to specifically perform some functionality in production, or for a group of QA engineers to test a new feature in production that other users can not see.
- 🏳️ **Experimental Flags**. These flags allow teams to experiment with new functionality to see how it fares with end users. (*i.e. is their appetite for this potential feature, or have we improved the user experience — potentially A/B testing*).

✔️ **Why are feature flags so powerful?**

Feature flags allow us to decouple the deployment and release of new code (*functionality*), allowing teams to utilise trunk based development with continuous delivery to push code changes to production regularly, without a more historic approach of feature branching, merge hell, and big bang releases.

With our code example we are going to utilise the built in feature flag functionality of AWS AppConfig which is a managed serverless AWS service.

## Using AWS AppConfig Feature Flags | Amazon Web Services

### AWS recently launched AWS AppConfig Feature Flags. Feature flagging is a powerful tool that allows engineers to safely…

aws.amazon.com

**How can we integrate AWS AppConfig into our solution?**

OK, let’s start by adding the AWS AppConfig Lambda Layer (*extension*) to our Lambda functions, which will essentially run a second process alongside our Lambda container, which will regularly poll for feature flag changes and populate a cache, without us doing this directly in our handler code as shown below:

![img](https://miro.medium.com/v2/resize:fit:599/0*yQ1loyRATFDZ3r6s.png)

https://docs.aws.amazon.com/appconfig/latest/userguide/appconfig-integration-lambda-extensions.html

1. You configure the AWS AppConfig Lambda extension as a layer of your Lambda function.
2. To access its configuration data, your function calls the AWS AppConfig extension at an HTTP endpoint running on `localhost:2772`.
3. The extension maintains a local cache of the configuration data. If the data isn’t in the cache, the extension calls AWS AppConfig to get the configuration data.
4. Upon receiving the configuration from the service, the extension stores it in the local cache and passes it to the Lambda function.
5. AWS AppConfig Lambda extension periodically checks for updates to your configuration data in the background. Each time your Lambda function is invoked, the extension checks the elapsed time since it retrieved a configuration. If the elapsed time is greater than the configured poll interval, the extension calls AWS AppConfig to check for newly deployed data, updates the local cache if there has been a change, and resets the elapsed time.

**Adding the AppConfig extension Lambda Layer**

We start by adding the Lambda Layer ARN configuration into our `pipeline-config.ts` file (*serverless-pro/lib/pipeline/pipeline-config/pipeline-config.ts*) as shown below:

```
...
shared: {
    ...
    appConfigLambdaLayerArn:
      'arn:aws:lambda:eu-west-1:434848589818:layer:AWS-AppConfig-Extension-Arm64:46',  
  },
...
```

We can then pass that configuration to our `stateless-stack.ts` file to add the layer to each of our Lambda functions through our `ProgressiveLambda` L3 custom construct as shown below:

```
...
// get the correct lambda layer extension for our region (props)
const appConfigLambdaLayerExtension =
  lambda.LayerVersion.fromLayerVersionArn(
    this,
    'AppConfigExtension',
    props.appConfigLambdaLayerArn
  );
...

const { alias: createOrderLambdaAlias, lambda: createOrderLambda } =
  new ProgressiveLambda(this, 'CreateOrderLambda', {
    ...
    layers: [appConfigLambdaLayerExtension],
    ...
    environment: {
      ...appConfigEnvironment,
      ...lambdaPowerToolsConfig,
      FLAG_CREATE_ORDER_ALLOW_LIST: createOrderAllowList,
      FLAG_PREVENT_CREATE_ORDERS: opsPreventCreateOrders,
      FLAG_CHECK_CREATE_ORDER_QUANTITY: releaseCheckCreateOrderQuantity,
    },
  });
```

We can see that we create an instance of the layer using the `LayerVersion.fromLayerVersionArn()` method, and then pass it to the Lambda function in the `layers` property. We also pass through the flags which we will read later from AWS AppConfig, which are passed into the `environment` property as environment variables to access later in our handler code.

**Creating the feature flags**

We now have a `feature-flags.ts` stack (*serverless-pro/lib/app/feature-flags/feature-flags.ts*) which creates a specific independant stack for feature flags outside of the main application and infrastructure:

```
import * as cdk from 'aws-cdk-lib';

import { FeatureFlagConfig, environments } from './config/config';

import { AppConfigApplication } from '../../constructs';
import { Aspects } from 'aws-cdk-lib';
import { AwsSolutionsChecks } from 'cdk-nag';
import { Construct } from 'constructs';
import { NagSuppressions } from 'cdk-nag';
import { Stage } from 'lib/types';
import { schema } from './config/config.schema';

export interface FeatureFlagStackProps extends cdk.StackProps {
  stageName: string;
}

export class FeatureFlagStack extends cdk.Stack {
  public readonly appConfigApplicationRef: string;
  public readonly appConfigEnvName: string;
  public readonly appConfigEnvRef: string;
  public readonly appConfigConfigurationProfileRef: string;

  constructor(scope: Construct, id: string, props: FeatureFlagStackProps) {
    super(scope, id, props);

    const stage = [Stage.featureDev, Stage.staging, Stage.prod].includes(
      props.stageName as Stage
    )
      ? props.stageName
      : Stage.develop;

    const appConfigApplication = new AppConfigApplication(
      this,
      'AppConfigApplication',
      {
        stageName: props.stageName,
        growthFactor: 100,
        deploymentDurationInMinutes: 0,
        growthType: 'LINEAR',
        description: `${props.stageName} application feature flags`,
        validatorSchema: JSON.stringify(schema),
        content: JSON.stringify(environments[stage as keyof FeatureFlagConfig]),
        removalPolicy: cdk.RemovalPolicy.DESTROY,
      }
    );

    this.appConfigApplicationRef = appConfigApplication.appilcation.ref;
    this.appConfigEnvName = appConfigApplication.appilcationEnvironment.name;
    this.appConfigConfigurationProfileRef =
      appConfigApplication.appilcationConfigurationProfile.ref;
    this.appConfigEnvRef = appConfigApplication.appilcationEnvironment.ref;

    // cdk nag check and suppressions
    Aspects.of(this).add(new AwsSolutionsChecks({ verbose: true }));
    NagSuppressions.addStackSuppressions(this, []);
  }
}
```

We can see from the code above that it utilises a custom L3 construct called `AppConfigApplication`, with the properties passed in meaning that the feature flags will be deployed instantly per stage with a `deploymentDurationInMinutes` value of 0.

The code for the `AppConfigApplication` creates the relevant items for each of the stages:

- AppConfig Application
- AppConfig Environment
- AppConfig Configuration Profile
- AppConfig Hosted Configuration Version

This removes the cognitive load from the engineers, so they can focus purely on the feature flags.

**Feature Flag Configuration and Validation**

OK, so we now have the Lambda Layer for reading the feature flags from AWS AppConfig, and the infrastructure to hold the feature flags; now let’s look at the configuration of the feature flags per environment:

```
// https://docs.aws.amazon.com/appconfig/latest/userguide/appconfig-creating-configuration-and-profile.html#appconfig-type-reference-feature-flags

import { FeatureFlags } from './FeatureFlags';
import { Stage } from '../../../types';

export type FeatureFlagConfig = Record<Stage, FeatureFlags>;

export const environments: FeatureFlagConfig = {
  // allow developers to spin up a quick branch for a given PR they are working on e.g. pr-124
  // this is done with a npm run develop, not through the pipeline, and uses the values in .env
  [Stage.develop]: {
    flags: {
      createOrderAllowList: {
        name: 'createOrderAllowList',
        description:
          'When enabled it limits the allow list to a select set of groups',
        attributes: {
          allow: {
            constraints: {
              type: 'string',
              enum: ['beta-group', 'qa'],
              required: true,
            },
          },
        },
      },
      releaseCheckCreateOrderQuantity: {
        name: 'releaseCheckCreateOrderQuantity',
        description:
          'A release flag for the create order check on max quantity',
        attributes: {
          limit: {
            constraints: {
              type: 'number',
              required: true,
            },
          },
        },
        _deprecation: {
          status: 'planned',
        },
      },
      opsPreventCreateOrders: {
        name: 'opsPreventCreateOrders',
        description: 'Operational toggle to prevent the creation of new orders',
      },
      opsLimitListOrdersResults: {
        name: 'opsLimitListOrdersResults',
        description: 'Operation toggle to limit the results on list orders',
        attributes: {
          limit: {
            constraints: {
              type: 'number',
              required: true,
            },
          },
        },
      },
    },
    values: {
      createOrderAllowList: {
        enabled: false,
        allow: 'qa',
      },
      releaseCheckCreateOrderQuantity: {
        enabled: true,
        limit: 10,
      },
      opsPreventCreateOrders: {
        enabled: false,
      },
      opsLimitListOrdersResults: {
        enabled: true,
        limit: 10,
      },
    },
    version: '1',
  },
...
[Stage.featureDev]: {...}
[Stage.staging]: {...}
[Stage.prod]: {...}
```

We can see from the code above in the file `config.ts` (*serverless-pro/lib/app/feature-flags/config/config.ts*) that our feature flags are defined per stage as we did for the pipeline config previously, allowing us to have different values per stage, and whether or not they are enabled or not.

```
Note: AWS AppConfig also allows us to validate the Feature Flags
configuration using JSON Schema which we do with
the file serverless-pro/lib/app/feature-flags/config/config.schema.ts. 
This ensures that we only allow valid values for our flags
to reduce the chance of human error.
```

From an AWS console perspective when deployed we can see that the feature flags are stored per environment based on our configuration file above (***note\*** *this would typically be multi-AWS account as standard*):

![img](https://miro.medium.com/v2/resize:fit:700/1*gCOVXfbq2NXpXVSoC280uQ.png)

The feature flags are stored in AWS AppConfig per stage (inc ephemeral environments)

And when we dive into one of these we can view the feature flags as shown below:

![img](https://miro.medium.com/v2/resize:fit:700/1*zHrBXNw74Dw52MdKCKEA2A.png)

Example of our FeatureDev feature flags in AWS AppConfig

**Retrieving and using the feature flags in our Lambda functions**

So we now have our feature flags deployed through our CI/CD process, but now we need to be able to access them in our handler code. This is done firstly by pulling in the correct configuration for our lambda (*in this example* ***create-order.ts\***)

```
...
// get the config values from process env
const application = config.get('appConfig.appConfigApplicationId');
const environment = config.get('appConfig.appConfigEnvironmentId');
const configuration = config.get('appConfig.appConfigConfigurationId');
const { preventCreateOrder, checkCreateOrderQuantity } =
  config.get('flags');
...
```

We then retrieve the specific feature flags that we need using the following:

```
// get feature flags from appconfig
const flags: Flags | Record<string, unknown> = (await getFeatureFlags(
  application,
  environment,
  configuration,
  [preventCreateOrder, checkCreateOrderQuantity]
)) as Flags;
```

Which calls our `getFeatureFlags` function which is building the correct `localhost` URL on port `2772` to call our Lambda layer extension with the correct flags properties to pull the values from the cache:

```
export const generateAppConfigExtensionUrl = (
  application: string,
  environment: string,
  configuration: string,
  optionalFlags?: string[]
): string => {
  let url = `http://localhost:2772/applications/${application}/environments/${environment}/configurations/${configuration}`;

  if (optionalFlags?.length) {
    url += '?';
    optionalFlags.forEach((flag: string) => (url += `flag=${flag}&`));
    url = url.substring(0, url.length - 1);
  }
  return url;
};

export const getFeatureFlags = async (
  application: string,
  environment: string,
  configuration: string,
  optionalFlags?: string[]
): Promise<Flags | Record<string, unknown>> => {
  const url = generateAppConfigExtensionUrl(
    application,
    environment,
    configuration,
    optionalFlags
  );
  const config = await axios.get(url);
  return config.data;
};
```

We can then simply use the feature flags in code as shown below:

```
// we use a flag here to prevent the creation of new orders from an operational sense
if (flags.opsPreventCreateOrders.enabled) {
  logger.error(
    `opsPreventCreateOrders enabled so preventing new order creation`
  );
  throw new Error(
    'The creation of orders is currently on hold for maintenance'
  );
}
```

**Why deploy the feature flags through a stack and not add manually?**

So you may be asking why we are deploying the feature flags through our pipeline as opposed to either a.) manually adding them in the console, or b.) seeding them initially through the pipeline and subsequently amending them in the console.

The reasons are:

✔️ Pushing the feature flag changes through the pipeline allow us to test the values using Jest snapshots.

✔️ We prevent human error which can be catastrophic for your company.

✔️ As above, we can test the changes first using JSON schema before even trying to deploy them.

✔️ This will seed the relevant feature flags for any ephemeral environments too (*pr-888 for example*).

✔️ We will fully exercise our unit, integration and acceptance tests when pushing the feature flag changes through the pipeline.

✔️ We get full auditing of the changes in the code repo.

✔️ We prevent the code base and console getting out of sync.

✔️ We can add an approval step to the deployment of the feature flags for production.

**How could we improve on this?**

In this example repo the issue we would have is that the deployment of the feature flags sit behind the build (*synth*) of the solution; meaning that the changes are not instantly applied to the feature flag values (*or at least quick*).

This will be fine for most use cases, but we may need to change an operational feature flag which needs to take effect quickly due to external pressures. We could apply the changes in the console directly and then subsequently update the code to keep them in sync.

In this scenario it may be worth however having the feature flags in a separate pipeline as discussed in this great article by **Ran Isenberg**:

## How CyberArk Implements Feature Flags with AWS AppConfig | Amazon Web Services

### Written by Ran Isenberg, Principal Architect at CyberArk Feature flags are a powerful tool that allow you to change…

aws.amazon.com

# Summary

I hope you found that useful as a follow on from Part 3 in this series. In **Part 4** we covered:

✔️ We add some AWS L3 custom CDK constructs into the solution.
✔️ We look at adding structured logging, metrics and tracing using the Lambda Powertools TypeScript package.
✔️ We deep dive into progressive deployments with AWS Lambda and AWS CodeDeploy for blue/green deployments.
✔️ We look at Feature Flags in our CI/CD pipeline using AWS AppConfig.

The code for the above article can be found here:

https://github.com/leegilmorecode/Serverless-AWS-CDK-Best-Practices-Patterns-Part4

# Wrapping up 👋

Please [go and subscribe on my YouTube channel](https://www.youtube.com/channel/UC_Bi6eLsBXpLnNRNnxKQUsA) for similar content!