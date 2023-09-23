# CDK Workshop

# Create project directory

Create an empty directory on your system:

```
mkdir cdk-workshop && cd cdk-workshop
```

## cdk init [#](https://cdkworkshop.com/20-typescript/20-create-project/100-cdk-init.html#cdk-init)

We will use `cdk init` to create a new TypeScript CDK project:

```
cdk init sample-app --language typescript
```

## Your app’s entry point [#](https://cdkworkshop.com/20-typescript/20-create-project/300-structure.html#your-apps-entry-point)

Let’s have a quick look at `bin/cdk-workshop.ts`:

```js
#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { CdkWorkshopStack } from '../lib/cdk-workshop-stack';

const app = new cdk.App();
new CdkWorkshopStack(app, 'CdkWorkshopStack');
```

This code loads and instantiates the `CdkWorkshopStack` class from the `lib/cdk-workshop-stack.ts` file. We won’t need to look at this file anymore.

## The main stack [#](https://cdkworkshop.com/20-typescript/20-create-project/300-structure.html#the-main-stack)

Open up `lib/cdk-workshop-stack.ts`. This is where the meat of our application is:

```ts
import * as cdk from 'aws-cdk-lib';
import * as sns from 'aws-cdk-lib/aws-sns';
import * as subs from 'aws-cdk-lib/aws-sns-subscriptions';
import * as sqs from 'aws-cdk-lib/aws-sqs';

export class CdkWorkshopStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const queue = new sqs.Queue(this, 'CdkWorkshopQueue', {
      visibilityTimeout: cdk.Duration.seconds(300)
    });

    const topic = new sns.Topic(this, 'CdkWorkshopTopic');

    topic.addSubscription(new subs.SqsSubscription(queue));
  }
}
```

As you can see, our app was created with a sample CDK stack (`CdkWorkshopStack`).

## Lambda handler code [#](https://cdkworkshop.com/20-typescript/30-hello-cdk/200-lambda.html#lambda-handler-code)

We’ll start with the AWS Lambda handler code.

1. Create a directory `lambda` in the root of your project tree (next to `bin` and `lib`).
2. TS CDK projects created with `cdk init` ignore all `.js` files by default. To track these files with git, add `!lambda/*.js` to your `.gitignore` file. This ensures that your Lambda assets are discoverable during the Pipelines section of this tutorial.
3. Add a file called `lambda/hello.js` with the following contents:

------

```js
exports.handler = async function(event) {
  console.log("request:", JSON.stringify(event, undefined, 2));
  return {
    statusCode: 200,
    headers: { "Content-Type": "text/plain" },
    body: `Hello, CDK! You've hit ${event.path}\n`
  };
};
```

## Add an AWS Lambda Function to your stack [#](https://cdkworkshop.com/20-typescript/30-hello-cdk/200-lambda.html#add-an-aws-lambda-function-to-your-stack)

Add an `import` statement at the beginning of `lib/cdk-workshop-stack.ts`, and a `lambda.Function` to your stack.

```ts
import * as cdk from 'aws-cdk-lib';
import * as lambda from 'aws-cdk-lib/aws-lambda';

export class CdkWorkshopStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // defines an AWS Lambda resource
    const hello = new lambda.Function(this, 'HelloHandler', {
      runtime: lambda.Runtime.NODEJS_16_X,    // execution environment
      code: lambda.Code.fromAsset('lambda'),  // code loaded from "lambda" directory
      handler: 'hello.handler'                // file is "hello", function is "handler"
    });
  }
}
```