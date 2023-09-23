![img](https://miro.medium.com/v2/resize:fit:700/1*2-iNN3fA1CNywC9gVibDdA.png)

Photo by [Greg Rosenke](https://unsplash.com/@greg_rosenke?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText) on [Unsplash](https://unsplash.com/photos/bJdK9v-VVw0?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText)

# Serverless AWS CDK Pipeline Best Practices & Patterns — Part 2

## An opinionated discussion around how to set up, structure, and deploy your AWS CDK Serverless apps using CDK Pipelines in line with AWS best practice — **Part 2**. Code examples are written in TypeScript.

![Serverless Advocate](https://miro.medium.com/v2/resize:fill:88:88/1*6u1nEmQP9k12Cb-BVx99_A.png)

[Serverless Advocate](https://blog.serverlessadvocate.com/?source=post_page-----5446a417d232--------------------------------)



![img](https://miro.medium.com/v2/resize:fit:700/1*Hc-jKh0m05N_L0D_Tv8Wqg.png)

# Preface

✔️ We discuss adding code quality tools locally to the IDE and to the pipeline such as ESLint/TSLint and Prettier (*inc pre-commit hooks with* ***Husky\***) in line with best practices.
✔️ We cover SAST tooling, in particular, **cdk-nag** in our pipeline to keep us secure from common issues.
✔️ We cover how to put various types of tests in your pipeline at the correct stages (*unit, integration and load*) to ensure our workloads are working as expected. We will look specifically at **Jest**, **Postman**/**Newman** and **Artillery**.
✔️ We will cover how to update databases (*tables, schemas*), seed test data or seed configuration values in the pipeline using **custom resources**.

# Introduction

In **Part 1** we covered an opinionated discussion around how to set up,
structure, and deploy your AWS CDK Serverless apps using CDK
Pipelines in line with AWS best practices. You can view the link below:

## Serverless AWS CDK Pipeline Best Practices & Patterns — Part 1

### An opinionated discussion around how to set up, structure, and deploy your AWS CDK Serverless apps using CDK Pipelines

blog.serverlessadvocate.com

In **Part 2** we will now specifically deep dive into pipeline testing (*unit, integration, load*), manual approval stages, database deploys and SAST tooling.

In **Part 3** we will cover synthetics using CloudWatch Synthetic Canaries, dynamic configuration values stored in S3, and acceptance tests using Cypress.

## Serverless AWS CDK Pipeline Best Practices & Patterns — Part 3

### An opinionated discussion around how to set up, structure, and deploy your AWS CDK Serverless apps using CDK Pipelines…

blog.serverlessadvocate.com

In **Part 4** we cover progressive deployments and feature flags **and more**.

## Serverless AWS CDK Pipeline Best Practices & Patterns — Part 4

### An opinionated discussion around how to set up, structure, and deploy your AWS CDK Serverless apps using CDK Pipelines…

blog.serverlessadvocate.com

The basic code for the article can be found here, but please note this is not production ready and is created solely to talk through the approaches and frameworks:

## GitHub - leegilmorecode/Serverless-AWS-CDK-Best-Practices-Patterns-Part2: An opinionated discussion…

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

The three main sources of best practice information have been amalgamated from:

🥇 [Deployment Pipeline Reference Architecture](https://pipelines.devops.aws.dev/)

🥇 [Best practices for developing cloud applications with AWS CDK](https://docs.aws.amazon.com/cdk/v2/guide/best-practices.html#best-practices-apps)

🥇 [The CDK Handbook](https://thecdkbook.com/)

We will also be following closely the pipeline reference architecture by AWS over this 3 part series as shown below:

![img](https://miro.medium.com/v2/resize:fit:700/0*LqIDjUhIZehskdYT.png)

👇 **Before we go any further** — please connect with me on LinkedIn for future blog posts and Serverless news https://www.linkedin.com/in/lee-james-gilmore/

![img](https://miro.medium.com/v2/resize:fit:630/0*SXoQ8wHHh-bd7aD8.png)

# What are we building? 🔩

In **Part 1** we focused more on setting up the pipeline and structuring the application correctly; however, in **part 2**, we will cover adding some basic steps for linting, security and testing. This is what we are building out in its most basic form:

![img](https://miro.medium.com/v2/resize:fit:700/1*S46kHNOIJ8aE_Y0pWTaLvA.png)

The example pipeline we are building in Part 2

**As you can see from the diagram**:

1. Developers commit changes to the code and push them to GitHub. At this build stage, we run unit testing, linting, formatting and SAST on pre-commit.
2. A webhook in GitHub invokes our CDK Pipeline with the exact commit information.
3. AWS CDK Pipelines are self-mutating, meaning any changes to the actual pipeline code will self-update the pipeline on AWS.
4. AWS Code Pipeline is invoked to run the actual pipeline now it has been updated. This is across our three stages, feature dev (*Beta*), staging (*Gamma*) and production. This is where we perform our tests.
5. As part of the pipeline a custom resource invokes a lambda function which seeds our configuration data to DynamoDB (*our store data configuration*).
6. Our pipeline performs integration tests using Newman and Postman; as well as load testing with Artillery.

**Now that we know what we are building, let's jump into the code walkthrough and key considerations.**

# Key considerations & code walkthrough 🚶

We are now going to augment the code from Part 1 of this series, focusing on the Build, Test, and Staging stages. Let’s start by diving into the Build Stage and how we can build on the code from Part 1.

![img](https://miro.medium.com/v2/resize:fit:700/0*LqIDjUhIZehskdYT.png)

The pipelines reference architecture from AWS that we are working through

# 🔧 Build Stage

Firstly let’s walk through adding some of the key steps from the **Build Stage** which are shown below:

![img](https://miro.medium.com/v2/resize:fit:358/1*bHT0t8swonRuVE7gLFHLiQ.png)

https://pipelines.devops.aws.dev/application-pipeline/index.html

## ✔️ Code Quality

Code quality is defined as:

> Run various automated static analysis tools that generate reports on code quality, coding standards, security, code coverage, and other aspects according to the team and/or organization’s best practices. AWS recommends that teams fail the build when important practices are violated (e.g., a security violation is discovered in the code). These checks usually run in seconds. Examples of tools to measure code quality include but are not limited to [Amazon CodeGuru](https://aws.amazon.com/codeguru/), [SonarQube](https://www.sonarqube.org/), [black](https://github.com/psf/black), and [ESLint](https://eslint.org/). — https://pipelines.devops.aws.dev/application-pipeline/index.html#build

In this example pipeline we will utilise `eslint`, `tslint`and `prettier` to ensure we have code quality standards and a dedicated code style guide (*auto formatted*).

> An example could be highlighting unused variables, as well as ensuring that the code is all formatted to industry standards.

Start by installing the following dev dependencies:

```bash
yarn add -D prettier eslint @typescript-eslint/parser 
yarn add -D eslint-config-prettier
yarn add -D eslint-plugin-prettier
yarn add -D @typescript-eslint/eslint-plugin 
```

✔️ **Let’s add eslint for code quality**

We then create the `.eslintrc` in the root of the `serverless-pro` folder with the following properties:

```json
{
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "ecmaVersion": "latest",
    "sourceType": "module"
  },
  "extends": [
    "prettier",
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended"
  ],
  "plugins": ["prettier", "@typescript-eslint"],
  "rules": {
    "prettier/prettier": ["error"],
    "@typescript-eslint/no-unused-vars": "error"
  }
}
```

We add the following lines to our npm scripts in the `package.json` folder which means we can run the linting on our existing code:

```
...
"lint": "eslint --ext .ts .",
"lint:fix": "eslint --fix --ext .ts .",
...
```

Now when we run `npm run lint` we will utilise eslint/tslint to check the code quality of our files. An example of an error within our code could be the following (*below*) which is highlighted as we have an unused variable that has been created yet not used:

![img](https://miro.medium.com/v2/resize:fit:700/1*_RGmqT8KqVaH9tHZtFms0g.png)

Example of an unused variable I added to show the linting working and the benefit we get

✔️ **Let’s add prettier for standard code formatting**

We will now create a `.prettierrc.json` file which will house all of the rules that we want to enforce, essentially formatting our code in a standard way:

```
{
  "trailingComma": "es5",
  "semi": true,
  "singleQuote": true,
  "printWidth": 80,
  "tabWidth": 2,
  "bracketSpacing": true,
  "arrowParens": "always"
}
```

We then create a `.prettierignore` file with the following contents to ensure we don’t run styling rules against certain folders or files:

```
# Ignore artifacts:
build
coverage
cdk.out
tsconfig.json
```

We now add the following to our `package.json` file to allow us to run code styling guides against our code and automatically format them:

```
...
"format": "npx prettier --write .",
...
```

Now when we run `npm run format` it will automatically update our code with the relevant style guides. Neat!

✔️ **Automatically running the scripts on pre-commit**

OK, OK, so that is great and all, but what if we forget to run the npm scripts before checking in the files? ***Surely\*** we should be running these checks locally as well as within the pipeline?

**Yes** — and for this, we will utilise [**Husky**](https://www.npmjs.com/package/husky).

Start by adding the relevant dev dependency:

```
yarn add -D husky
```

We then add the following to the `package.json` file:

```
"prepare": "cd .. && husky install config/.husky",
"precommit": "npm run synth && npm run test && npm run lint:fix && npm run format",
"prepush": "npm run lint"
```

Then run the following command from the ‘`serverless-pro`’ directory which essentially sets up Husky in the `./config/.husky/` folder in the repo:

```
yarn prepare
```

We can then run the following commands from the root of the project to setup our scripts:

```
npx husky add ../config/.husky/pre-commit "npm run precommit"
npx husky add ../config/.husky/pre-push "npm run prepush"
```

> **Note**: We need to update the files above to cd into the correct folder to run: `cd serverless-pro && npm run prepush`

Now on a git commit (*pre-commit*), we will ensure that we have the linting and formatting performed automatically for us, as well as running the unit tests.

We also update the file: `serverless-pro/lib/pipeline/pipeline-stack/pipeline-stack.ts` so we run the linting in the pipeline in the build/source step of the pipeline:

```
...
// source stage
commands: [
  'cd ./serverless-pro',
  'npm ci',
  'npx cdk synth',
  'npm run lint', // <-- added here
  'npm run test',
],
...
```

## ✔️ SAST — Static application security testing with cdk-nag

Now let’s cover adding SAST to our pipeline:

> Analyze code for application security violations such as [XML External Entity Processing](https://owasp.org/www-community/vulnerabilities/XML_External_Entity_(XXE)_Processing), [SQL Injection](https://owasp.org/www-community/attacks/SQL_Injection), and [Cross Site Scripting](https://owasp.org/www-community/attacks/xss/). Any findings that exceed the configured threshold will immediately fail the build and stop any forward progress in the pipeline. Examples of tools to perform static application security testing include but are not limited to [Amazon CodeGuru](https://aws.amazon.com/codeguru/), [SonarQube](https://www.sonarqube.org/), and [Checkmarx](https://checkmarx.com/). - https://pipelines.devops.aws.dev/application-pipeline/index.html#build

We can, and should utilise SAST tooling at the build step, whether this is locally using pre-commit hooks, or when the cloud assembly is built at the start of the pipeline (*i.e. build stage*).

> **“Static application security testing (SAST)** is a set of technologies designed to analyze application source code, byte code and binaries for coding and design conditions that are indicative of security vulnerabilities. SAST solutions analyze an application from the “inside out” in a nonrunning state.” — https://www.gartner.com/en/information-technology/glossary/static-application-security-testing-sast

We can utilise the `cdk-nag` npm package for this, which will validate our AWS CDK code against a set of industry-recognised compliance NagPacks such as:

1. [AWS Solutions](https://github.com/cdklabs/cdk-nag/blob/main/RULES.md#awssolutions)
2. [HIPAA Securit](https://github.com/cdklabs/cdk-nag/blob/main/RULES.md#hipaa-security)y
3. [NIST 800–53 rev 4](https://github.com/cdklabs/cdk-nag/blob/main/RULES.md#nist-800-53-rev-4)
4. [NIST 800–53 rev 5](https://github.com/cdklabs/cdk-nag/blob/main/RULES.md#nist-800-53-rev-5)
5. [PCI DSS 3.2.1](https://github.com/cdklabs/cdk-nag/blob/main/RULES.md#pci-dss-321)

This is covered in more detail in the following AWS article:

> “Infrastructure as Code (IaC) is an important part of Cloud Applications. Developers rely on various Static Application Security Testing (SAST) tools to identify security/compliance issues and mitigate these issues early on, before releasing their applications to production. Additionally, SAST tools often provide reporting mechanisms that can help developers verify compliance during security reviews.”

## Manage application security and compliance with the AWS Cloud Development Kit and cdk-nag | Amazon…

### Infrastructure as Code (IaC) is an important part of Cloud Applications. Developers rely on various Static Application…

aws.amazon.com

We can add this to our existing code from Part 1 by installing the npm package using `yarmn add cdk-nag` and then start by adding the following imports to the files `stateful-stack.ts` and `stateless-stack.ts`:

```
import { Aspects } from 'aws-cdk-lib';
import { AwsSolutionsChecks } from 'cdk-nag';
import { NagSuppressions } from 'cdk-nag';
...
```

Now we have the imports in both stack files we add the following line to both which will ensure that we have the relevant checks at the stack level (***Note\****: this means we will check all stages at the synth step regardless of the configuration and environments*)

```
// cdk nag check and suppressions
Aspects.of(this).add(new AwsSolutionsChecks({ verbose: false }));
```

When we now build our cloud assembly using the `synth` command locally or in the pipeline we will see errors or warnings based on the NagPack as shown below which would safely fail our pipeline when we are non-compliant (*or prevent us from committing the code in the first place!*):

![img](https://miro.medium.com/v2/resize:fit:700/1*HexRV3DZowhfoz2_Aua4Ew.png)

cdk-nag errors which will fail our pipeline

There will obviously be times when we can safely suppress the warnings or errors which we can do using the following code in the two files above (*adding the relevant id which equates to the warning*):

```
NagSuppressions.addResourceSuppressions(this.bucket, [
  {
    id: 'AwsSolutions-S1',
    reason: `Rule suppression for 'The S3 Bucket has server access logs disabled'`,
  },
]);
```

As this happens at the ‘synth’ stage we will perform this at build time locally as well as in the pipeline:

```
...
// source stage
commands: [
  'cd ./serverless-pro',
  'npm ci',
  'npx cdk synth', // <-- sast added here
  'npm run lint', 
  'npm run test',
],
...
```

# 🧪 Test Stage

OK, so we will now move onto the **Test Stage** (Beta) as shown below, where we focus specifically on ‘Database Deploy’ and ‘Integration Tests’:

![img](https://miro.medium.com/v2/resize:fit:348/1*Cq0AEHfsxMyKqWrFlpeicA.png)

https://pipelines.devops.aws.dev/application-pipeline/index.html

## ✔️ Database Deploy

> “Apply changes to the beta database using the Database Source Code. Changes should be made in a manner that [ensures rollback safety](https://aws.amazon.com/builders-library/ensuring-rollback-safety-during-deployments/). Best practice is to connect to the beta database through [cross-account IAM roles](https://docs.aws.amazon.com/IAM/latest/UserGuide/tutorial_cross-account-with-roles.html) and [IAM database authentication for RDS](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/UsingWithRDS.IAMDBAuth.html) rather than long lived database credentials. If database credentials must be used, then they should be loaded from a secret manager such as [AWS Secrets Manager](https://aws.amazon.com/secrets-manager/). Changes to the database should be incremental, only applying the changes since the prior deployment. Examples of tools that apply incremental database changes include but are not limited to [Liquibase](https://www.liquibase.org/), [VS Database Project](https://learn.microsoft.com/en-us/aspnet/web-forms/overview/deployment/web-deployment-in-the-enterprise/deploying-database-projects), and [Flyway](https://www.red-gate.com/products/flyway/).” https://pipelines.devops.aws.dev/application-pipeline/index.html#build

There are times when we may want to do one of three things (*but not limited to*):

1. **Deploy database changes**; for example, new indexes or schema changes (*depending on the database choice*).
2. **Deploy test data** to non-production environments to be used with test sets.
3. **Deploy base database configuration** for our applications.

We are going to look at the latter for adding some basic database configuration for our ‘store’ data config, and we are going to utilise [Custom Resources](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/template-custom-resources.html) to deploy into our environment which is detailed fully in the following article:

## Serverless Custom Resources 🚀

### How can we use Custom Resources on AWS to extend our deployment and resource options without any restrictions…

blog.serverlessadvocate.com

We can see this highlighted in our diagram here:

![img](https://miro.medium.com/v2/resize:fit:700/1*lREBi0xlpsbtuPJ1K9Ri4Q.png)

The red circle shows our custom resource which invokes a lambda function to populate config data in DynamoDB

We add our custom resources to the `stateless-stack.ts` file as shown below which runs for all stages:

```typescript
...
const provider: cr.Provider = new cr.Provider(
  this,
  'PopulateTableConfigCustomResource',
  {
    onEventHandler: populateOrdersHandler, // this lambda will be called on cfn deploy
    logRetention: logs.RetentionDays.ONE_DAY,
    providerFunctionName: `populate-orders-${props.stageName}-cr-lambda`,
  }
);

// use the custom resource provider
new CustomResource(this, 'DbTableConfigCustomResource', {
  serviceToken: provider.serviceToken,
  properties: {
    tableName: props.table.tableName,
  },
});
...
```

The custom resource above calls the lambda handler in ‘`populate-table-cr.ts`’ which performs a batch write to our DynamoDB table of the following configuration data:

```json
[{
  id: '59b8a675-9bb7-46c7-955d-2566edfba8ea',
  storeCode: 'NEW',
  storeName: 'Newcastle',
  type: 'Stores',
},
{
  id: '4e02e8f2-c0fe-493e-b259-1047254ad969',
  storeCode: 'LON',
  storeName: 'London',
  type: 'Stores',
},
{
  id: 'f5de2a0a-5a1d-4842-b38d-34e0fe420d33',
  storeCode: 'MAN',
  storeName: 'Manchester',
  type: 'Stores',
}]
```

This ‘**store**’ configuration data is utilised as a validation check in our Create Order Lambda function to ensure that the order is always created for a valid store (*i.e. one of three store IDs*):

add to `create-order.ts`:

```
...
const { Items: items } = await dynamoDb.query(getParams).promise();
const stores = items as Stores;

if (!stores.find((item) => item.id === order.storeId)) {
  throw new Error(`${order.storeId} is not found`);
}
...
```

Using custom resources alongside packages such as [migrate-mongo](https://www.npmjs.com/package/migrate-mongo) or the equivalents in the intro passage can be very powerful. Now let’s look at integration tests in the next section.

## ✔️ Integration Tests

> “Run automated tests that verify if the application satisifes business requirements. These tests require the application to be running in the beta environment. Integration tests may come in the form of behavior-driven tests, automated acceptance tests, or automated tests linked to requirements and/or stories in a tracking system. Test results should be published somewhere such as [AWS CodeBuild Test Reports](https://docs.aws.amazon.com/codebuild/latest/userguide/test-reporting.html). Examples of tools to define integration tests include but are not limited to [Cucumber](https://cucumber.io/), [vRest](https://vrest.io/), and [SoapUI](https://www.soapui.org/).” https://pipelines.devops.aws.dev/application-pipeline/index.html#build

Now we are going to look at using [Newman](https://learning.postman.com/docs/collections/using-newman-cli/command-line-integration-with-newman/) and a [Postman](https://www.postman.com/) collection to run our integration tests against our API. First of all, we add a shell step to our pipelines for the test and staging stages as shown below:

Add to `pipeline-stack.ts`:

pipeline.addStage(featureDevStage, {
      post: [

pipeline.addStage(stagingStage, {

​      post: [

​		

```
...
new pipelines.ShellStep('IntegrationTests', {
    envFromCfnOutputs: {
      API_ENDPOINT: featureDevStage.apiEndpointUrl,
    },
    // we run the postman basic api integration tests
    commands: [
      'npm install -g newman',
      'newman run ./tests/integration/integration-collection.json --env-var api-url=$API_ENDPOINT',
    ],
  }),
...
```

 pipeline.addStage(stagingStage, {

​      post: [

```
...	
// you can optionally run load tests in staging (gamma) too
  new pipelines.ShellStep('LoadTests', {
    envFromCfnOutputs: {
      API_ENDPOINT: stagingStage.apiEndpointUrl,
    },
    // we run the artillery load tests
    commands: [
      'npm install -g artillery',
      'artillery dino', // ensure that it is installed correctly
      'artillery run -e load ./tests/load/load.yml',
    ],
  }),
...  
```



## Running collections on the command line with Newman | Postman Learning Center

### Running collections on the command line with Newman: documentation for Postman, the collaboration platform for API…

learning.postman.com

This means in the pipeline we will install Newman, and we will then run a Postman collection suite of tests, whilst passing through the environment API endpoint for the given stage as an environment variable.

We can see in our repo within the folder `./tests/integration` we have a file called ‘`integration-collection.json`’ which details all of our Postman tests:

![img](https://miro.medium.com/v2/resize:fit:700/1*vepNwvolnMQVwy9IO3Wkbg.png)

Our Postman collection resides in the following folder for the integration tests

The suite is made up of two tests that run in sequence, the first of which is create order; which hits the relevant stage endpoint i.e. **POST** on `{{api-url}}/orders/` with the following payload:

```
{
    "quantity": 1,
    "productId": "lee-123-123",
    "storeId": "59b8a675-9bb7-46c7-955d-2566edfba8ea"
}
```

We then run some tests on this request response to ensure it meets our expectations as shown below:

```
var jsonData = JSON.parse(responseBody);
postman.setEnvironmentVariable("orderId", jsonData.id);

pm.test('success', function() {
    const responseJson = pm.response.json();

    pm.response.to.have.status(201);
    pm.response.to.not.be.error;
    pm.response.to.be.withBody;
    pm.response.to.be.json;

    pm.expect(responseJson.id).to.be.a('string');
    pm.expect(responseJson.productId).to.be.a('string');
    pm.expect(responseJson.storeId).to.be.a('string');
    pm.expect(responseJson.quantity).to.be.a('number');
    pm.expect(responseJson.type).to.eql('Orders');
    pm.expect(responseJson.type).to.be.a('string');
})
```

As you can see from the first two lines of code we store the generated order ID from the POST request which is returned in the response for our next request, before checking the status code and response is valid.

We then use the order ID stored from the initial create order request to perform a **GET** on `{{api-url}}/orders/{{orderId}}`, and once again we check the response is correct:

```
pm.test('success', function() {
    const responseJson = pm.response.json();

    pm.response.to.have.status(200);
    pm.response.to.not.be.error;
    pm.response.to.be.withBody;
    pm.response.to.be.json;

    pm.expect(responseJson.id).to.be.a('string');
    pm.expect(responseJson.productId).to.be.a('string');
    pm.expect(responseJson.storeId).to.be.a('string');
    pm.expect(responseJson.quantity).to.be.a('number');
    pm.expect(responseJson.type).to.eql('Orders');
    pm.expect(responseJson.type).to.be.a('string');
})
```

This is obviously just a basic example of a set of integration tests with two requests, but we can use this as a base to set up a very comprehensive suite for our pipelines.

![img](https://miro.medium.com/v2/resize:fit:700/1*9yxGEVdlv2YpMJ3TB2Y5XA.png)

A screenshot of our successful integration tests

Now let’s look at the Staging (*Gamma*) stage in our pipeline below, where we will cover load testing in our pipeline with Artillery.

# 📦 Staging

Now let’s move on to the key considerations for our Staging (Gamma) Stage:

![img](https://miro.medium.com/v2/resize:fit:344/1*0kITfnD4EmYhGGRySvQ0vg.png)

https://pipelines.devops.aws.dev/application-pipeline/index.html

## ✔️ Performance Tests

> “Run longer-running automated capacity tests against environments that simulate production capacity. Measure metrics such as the transaction success rates, response time and throughput. Determine if application meets performance requirements and compare metrics to past performance to look for performance degredation. Examples of tools that can be used for performance tests include but are not limited to [JMeter](https://jmeter.apache.org/), [Locust](https://locust.io/), and [Gatling](https://gatling.io/).” https://pipelines.devops.aws.dev/application-pipeline/index.html#build

In our example, we are going to set up Artillery as it works well in pipelines for load testing in my experience. There is both a free and Pro version:

## Artillery.io | Load & Smoke Testing

### Keep production reliable, customers happy, and pagers silent.

www.artillery.io

We have our load tests sitting in the following folder `./tests/load/` which are set up in the `load.yml` file.

We then set up our pipeline to run the load tests in the Staging (*Gamma*) stage as shown below:

```
...
  // you can optionally run load tests in staging (gamma) too
  new pipelines.ShellStep('LoadTests', {
    envFromCfnOutputs: {
      API_ENDPOINT: stagingStage.apiEndpointUrl,
    },
    // we run the artillery load tests
    commands: [
      'npm install -g artillery',
      'artillery dino', // ensure that it is installed correctly
      'artillery run -e load ./tests/load/load.yml',
    ],
  }),
...
```

As you can see from the code snippet above, we install artillery and then perform a load test run based on our `load.yml` file. This means that if our load test fails in our Staging environment we will fail the pipeline and rollback, as shown below:

![img](https://miro.medium.com/v2/resize:fit:700/1*VxCi_D6C3Xzqg-uWEv88Jg.png)

An example failure when our load tests exceed our expected p95 and p99 response times

In our `load.yml` file we perform two calls (*in a similar manner to our integration tests*); however, we do this over a period of time with multiple virtual users:

```
...
load:
  target: "{{ $processEnvironment.API_ENDPOINT }}"
  phases:
    - duration: 20
      arrivalRate: 1
      maxVusers: 1
...
```

> In our basic example, we run for 20 seconds, starting with one virtual user, and only scaling to one. You can change your tests for your needs accordingly, for example, by simulating hundreds of virtual users.

We then check in the same file that our p95 and p99 response times are within suitable boundaries, and if not, we fail the pipeline:

```
...
ensure:
  thresholds:
    - http.response_time.p95: 1000
  conditions:
    - expression: http.response_time.p99 < 500
      strict: true
    - expression: http.response_time.p95 < 1000
      strict: true
  maxErrorRate: 0 # no percentage of error rate i.e. no errors or pipeline fails
...
```

> In our example above we are saying that we will fail the pipeline if there are any errors. We also ensure that the p99 response of calls is less than 500 milliseconds and that the p95 is under one second.

We pass through our load test data from a CSV file found in `./tests/load/data/data.csv` using the configuration in the `load.yml` file:

```
...
payload:
  path: "./data/data.csv" # pull in the order data csv
...
```

Which looks like this:

```
productId,quantity,storeId
POR26YMQ2JY,513,59b8a675-9bb7-46c7-955d-2566edfba8ea
FXY46ZQR5LJ,173,59b8a675-9bb7-46c7-955d-2566edfba8ea
BHQ65RSD2EQ,861,59b8a675-9bb7-46c7-955d-2566edfba8ea
EFK52JXT5HO,524,59b8a675-9bb7-46c7-955d-2566edfba8ea
...
```

The full `load.yml` file for the load testing looks like this with some assertions on the requests themselves too (*such as ensuring the correct values are returned in the responses*):

```yaml
config:
  plugins:
    expect: {} # this plugin allows for assertions: https://artillery.io/docs/guides/plugins/plugin-expectations-assertions.html
    ensure: {}
  ensure:
    thresholds:
      - http.response_time.p95: 1000
    conditions:
      - expression: http.response_time.p99 < 500
        strict: true
      - expression: http.response_time.p95 < 1000
        strict: true
    maxErrorRate: 0 # no percentage of error rate i.e. no errors or pipeline fails
  payload:
    path: "./data/data.csv" # pull in the order data csv
    fields:
      - "quantity"
      - "productId"
      - "storeId"
    order: random # this can be random or sequence
    skipHeader: true # skip header as this has the column headers
    delimeter: ","
    cast: true
    skipEmptyLines: true
  environments:
    # load testing below
    load:
      target: "{{ $processEnvironment.API_ENDPOINT }}"
      phases:
        - duration: 20
          arrivalRate: 1
          maxVusers: 1
scenarios:
  - flow:
      - log: "New virtual user running for env {{ $processEnvironment.API_ENDPOINT }}" # you can log using the following example
      # create the order and assert the response
      - post:
          url: "/orders"
          json:
            productId: "{{ productId }}"
            quantity: "{{ quantity }}"
            storeId: "{{ storeId }}"
          capture:
            - json: "$.id"
              as: id
          expect:
            - statusCode: 201 # ensure the correct status code is returned
            - contentType: application/json # ensure that the correct contentType is returned
            - hasHeader: "content-type" # ensure it has the correct headers returned
            - hasProperty: id # ensure that all of the properties are present on the response
            - hasProperty: productId
            - hasProperty: quantity
            - hasProperty: created
            - hasProperty: storeId
            - hasProperty: type
      # get the order which has just been created and assert the response
      - get:
          url: "/orders/{{ id }}"
          expect:
            - statusCode: 200
            - contentType: application/json
            - hasHeader: "content-type"
            - hasProperty: id # ensure that all of the properties are present on the response
            - hasProperty: productId
            - hasProperty: quantity
            - hasProperty: created
            - hasProperty: storeId
            - hasProperty: type
```

On success of our load test stage, we would see our pipeline work successfully as shown below, which would then move onto the production stage:

![img](https://miro.medium.com/v2/resize:fit:700/1*4KOiyy7rMs1ZD7kOTQFyvg.png)

An example of when load testing is successful

For a more in-depth video of load testing with Artillery, you can watch the following:

<iframe src="https://cdn.embedly.com/widgets/media.html?src=https%3A%2F%2Fwww.youtube.com%2Fembed%2F8pckaEKKvgI%3Ffeature%3Doembed&amp;display_name=YouTube&amp;url=https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3D8pckaEKKvgI&amp;image=https%3A%2F%2Fi.ytimg.com%2Fvi%2F8pckaEKKvgI%2Fhqdefault.jpg&amp;key=a19fcc184b9711e1b4764040d3dc5c07&amp;type=text%2Fhtml&amp;schema=youtube" allowfullscreen="" frameborder="0" height="480" width="854" title="Serverless Load Testing with Artillery - Lee Gilmore" class="ek n fk dy bg" scrolling="no" style="box-sizing: inherit; top: 0px; width: 680px; height: 382.188px; left: 0px;"></iframe>

Now let’s finally look at the production stage, and how we would add a manual approval stage.

# 🏅 Production Stage

Now let’s cover off the final stage which is the deploy to production.

![img](https://miro.medium.com/v2/resize:fit:346/1*_JFgvbxy9RPbIZvSsrTF8w.png)

https://pipelines.devops.aws.dev/application-pipeline/index.html

## ✔️ Manual Approvals

One neat thing we can do with CDK Pipelines is to add a manual approval stage before our production deployment, meaning that somebody needs to verify that they are happy before the deployment takes place. Of course, our defacto standard would be continuous deployment, but there are times when you need these manual gates.

An example of this is shown below:

![img](https://miro.medium.com/v2/resize:fit:700/1*U5VyVXhNbkJKiEyMs3JYZQ.png)

Our manual approval step for production

We can then go into the pipeline and manually approve as shown below:

![img](https://miro.medium.com/v2/resize:fit:700/1*0Swo-JyFmS9ea6uskJ0p9w.png)

Screenshot showing that we can add a note before approving

This is set up very easily in our CDK code by adding the following:

```
pipeline.addStage(prodStage, {
  pre: [
    new pipelines.ManualApprovalStep('PromoteToProd'), // manual approval step
  ],
...
```

Now when we run through our pipeline somebody needs to manually promote to production through the AWS console.

# Summary

I hope you found that useful as a follow on from Part 1 in this series.

In **Part 3** we will cover synthetics using CloudWatch Synthetic Canaries, dynamic configuration values stored in S3, and acceptance tests using Cypress.

In **Part 4** we will cover progressive deployments and feature flags.

# Wrapping up 👋

Please [go and subscribe on my YouTube channel](https://www.youtube.com/channel/UC_Bi6eLsBXpLnNRNnxKQUsA) for similar content!

![img](https://miro.medium.com/v2/resize:fit:700/0*Z1ikvOm7L2myKIhX.png)

I would love to connect with you also on any of the following:

https://www.linkedin.com/in/lee-james-gilmore/
https://twitter.com/LeeJamesGilmore

If you enjoyed the posts please follow my profile [Lee James Gilmore](https://medium.com/u/2906c6def240?source=post_page-----39c4f4ae5aff----------------------) for further posts/series, and don’t forget to connect and say Hi 👋

Please also use the ‘clap’ feature at the bottom of the post if you enjoyed it! (*You can clap more than once!!*)

# About me

“*Hi, I’m Lee, an AWS Community Builder, Blogger, AWS certified cloud architect and Global Serverless Architect based in the UK; currently working for City Electrical Factors (UK) & City Electric Supply (US), having worked primarily in full-stack JavaScript on AWS for the past 6 years.*

*I consider myself a serverless advocate with a love of all things AWS, innovation, software architecture and technology.*”

***\**\* The information provided are my own personal views and I accept no responsibility on the use of the information. \**\****

