![img](https://miro.medium.com/v2/resize:fit:700/1*2rdnBCegcKISfN03-EEzOg.png)

Photo by [Ryan Quintal](https://unsplash.com/@ryanquintal?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText) on [Unsplash](https://unsplash.com/photos/G-HRuwCTR7c?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText)

# Serverless AWS CDK Pipeline Best Practices & Patterns — Part 3

## An opinionated discussion around how to set up, structure, and deploy your AWS CDK Serverless apps using CDK Pipelines in line with AWS best practice — Part 3. Code examples are written in TypeScript.

![Serverless Advocate](https://miro.medium.com/v2/resize:fill:88:88/1*6u1nEmQP9k12Cb-BVx99_A.png)

![img](https://miro.medium.com/v2/resize:fit:672/1*X7H-oj1nv2NmNWTw0jtowQ.png)

## Preface

✔️ We add a very basic **React front end** for our orders API with a CloudFront distribution, and a Route53 subdomain; which is built and deployed through the pipeline. This allows users too create, list and view orders.
✔️ We discuss the use of **synthetics** in our pipelines, specifically CloudWatch Synthetics, and how to use it with our React app. This will check that our API’s and websites are running successfully even when we have no users on the system.
✔️ We cover generating **dynamic configuration** within our pipelines for our React app which is stored in S3.
✔️ We cover acceptance tests using **Cypress**.

# Introduction

In **Part 1** we covered an opinionated discussion around **how to set up**,
**structure**, and **deploy** your AWS CDK Serverless apps using CDK
Pipelines in line with AWS best practices. You can view the link below:

## Serverless AWS CDK Pipeline Best Practices & Patterns — Part 1

### An opinionated discussion around how to set up, structure, and deploy your AWS CDK Serverless apps using CDK Pipelines

blog.serverlessadvocate.com

In **Part 2** we performed a deep dive into **pipeline testing** (*unit, integration, load*), manual **approval stages**, **database deploys** and **SAST** tooling:

## Serverless AWS CDK Pipeline Best Practices & Patterns — Part 2

### An opinionated discussion around how to set up, structure, and deploy your AWS CDK Serverless apps using CDK Pipelines…

blog.serverlessadvocate.com

In this part (**Part 3**) we will cover **synthetics** using AWS CloudWatch Synthetic Canaries, **dynamic configuration values** stored in S3, and acceptance tests using **Cypress**.

In **Part 4** we cover **progressive deployments,** **feature flags** and **more**.

## Serverless AWS CDK Pipeline Best Practices & Patterns — Part 4

### An opinionated discussion around how to set up, structure, and deploy your AWS CDK Serverless apps using CDK Pipelines…

blog.serverlessadvocate.com

The basic code for the article can be found below, but please note this is not production ready and is created solely to talk through the approaches and frameworks:

## GitHub - leegilmorecode/Serverless-AWS-CDK-Best-Practices-Patterns-Part3: An opinionated discussion…

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

![img](https://miro.medium.com/v2/resize:fit:700/0*HIIFUbBkf4T6HRrT.png)

👇 **Before we go any further** — please connect with me on LinkedIn for future blog posts and Serverless news https://www.linkedin.com/in/lee-james-gilmore/

![img](https://miro.medium.com/v2/resize:fit:630/0*PVF12bcHwTV8yYiu.png)

# What are we building? 🔩

The diagram below shows a high level design of what we are building in this series which is an extension of the diagram from Part 2:

![img](https://miro.medium.com/v2/resize:fit:700/1*yxasLzhGoeu0XI5sk5jc_Q.png)

**We can see that:**

1. Customers use our website to create, list and view their orders.
2. The React client is hosted from Amazon S3 and utilises our backend orders API.
3. We have Lambda functions for creating, listing and viewing orders; as well as a health check endpoint.
4. All of the order information is stored in, and retrieved from Amazon DynamoDB.
5. As part of the CDK Pipeline we use a Lambda function backed custom resource which populates our DynamoDB with configuration value for our store locations on deploy of the stacks.
6. We have an API CloudWatch Synthetic Canary which checks our API is operating successfully, regardless of customers being on the website or not.
7. We have a Visual CloudWatch Synthetic Canary which checks our webpage is displaying correctly, regardless of customers being on the website or not.
8. If we have any issues with the canaries we are email alerted through a CloudWatch alarm and SNS topic combination.

> Now let’s take a look at the need for a frontend web application for this pipelines demo.

# The addition of a frontend 👨‍💻

To fully add to our CDK Pipelines article and show the integrations with synthetics and acceptance testing in the pipeline we needed to add a frontend. We have created a basic React frontend with Material UI.

![img](https://miro.medium.com/v2/resize:fit:700/1*29av6KNtyrkvjvxUQax3Og.png)

A basic web app for listing, creating and viewing orders

The GIF below shows the very basic web app that has been created to use, and what functionality it has:

![img](https://miro.medium.com/v2/resize:fit:700/1*s-TVtwzC14RlhN0V3vrBhw.gif)

A GIF of our basic web app which use throughout the CDK Pipelines demo

Now let’s take a look at the **key considerations** and **code walkthrough** in the next section.

# Key considerations & code walkthrough 🚶

We are now going to augment the code from Part 2 of this series, focusing on the Build, Test, and Staging stages. Let’s start by diving into the Build Stage and how we can build on the code from Part 2.

# 🔧 Build Stage

Firstly let’s walk through adding dynamic configuration for our web client application:

![img](https://miro.medium.com/v2/resize:fit:358/0*FWIc3SGAGC_bR_yl.png)

## ✔️ Dynamic Configuration

When working with pipelines it is often the case that we need to generate dynamic configuration specific to the stage we are deploying. In our example, we need to generate a configuration file for our frontend web app which allows it to know which stage API it needs to interact with.

```
Note - the dynamic file in our example is hosted in S3, so ensure
that you don't store any secrets when using this approach.  
```

The example code below shows how we can create a JSON based configuration file and push that to the S3 bucket alongside our built static assets:

`client-stack.ts`

```javascript
// Setup Bucket Deployment to automatically deploy new assets and invalidate cache
new s3deploy.BucketDeployment(this, 'ClientBucketDeployment', {
  sources: [
    s3deploy.Source.asset(path.join(__dirname, '../../../../client/build')),
    s3deploy.Source.jsonData('config.json', {
      stage,
      domainName: props.domainName,
      subDomain,
      api: `https://api-${stage}.${props.domainName}`,
    }), // runtime config for client
  ],
  destinationBucket: this.bucket,
  metadata: {
    stageName: stage,
  },
  distribution: cloudFrontDistribution,
  distributionPaths: ['/*'],
});
```



We can see from the above code that we firstly deploy the built client application which is stage agnostic, and then we generate a `config.json` file using the stage specific properties (*whether that be developer ephemeral, test, staging or prod*).

The file which is generated looks as follows for the `feature-dev` environment:

```
{
  "stage": "featuredev",
  "domainName": "your-domain.co.uk",
  "subDomain": "featuredev.your-domain.co.uk",
  "api": "https://api-featuredev.your-domain.co.uk"
}
```

In the React frontend client we can then read this static `config.json` file from the public folder hosted using a service called `config-service.ts` which we have created:

```
import { IConfig } from '../types';

export async function getConfig(): Promise<IConfig> {
  const response = await fetch('config.json');
  const config: IConfig = await response.json();
  return config;
}
```

We can then utilise the dynamic configuration file and read this into the main `app.tsx` (app) with our service above using a `useEffect` hook when the page initially loads. The config is then stored in state, as shown below:

```react
function App() {
  const [config, setConfig] = useState<IConfig>();
  ...

useEffect(() => {
    async function fetchData() {
      try {
        // set loading
        setLoading(true);

        // fetch the config on app load
        const config = await getConfig();
        setConfig(config);

        // get the orders
        const orders: IOrder[] = await listOrders(config?.api);
        setOrders(orders);
        setLoading(false);
      } catch (error) {
        setIsError(true);
        setLoading(false);
      }
    }
    fetchData();
  }, []);
```

This means that our frontend React app knows which API it is configured to work with.

When we are in development mode we simply update the long-lived configuration file that lives in the local Public folder (*which is overwritten when deployed to the cloud*). We could for example utilise the feature-dev deployed API to back local development:

![img](https://miro.medium.com/v2/resize:fit:700/1*oou7WpmSTj5BSCWwPYJ-Ew.png)

Our local development config for the client allows us to point to our ephemeral or feature-dev deployed service.

OK, now that we know how the dynamic configuration for our frontend is generated, let’s now specifically look at the pipeline aspects for synthetics and acceptance tests.

```
Note - when we deploy an ephemeral environment we successfully create 
the correct configuration file based on our local .env file in the 
'serverless-pro' folder.
```

## update pipeline

### update types

`pipeline-types.ts`

```typescript
export interface EnvironmentConfig {
  ...
  client: {
    bucketName: string;
  };
  shared: {
    domainName: string;
    domainCertificateArn: string;
  };
}
```

`pipe-config.ts`

```typescript
  [Stage.develop]: {
    client: {
      bucketName:
        `serverless-pro-client-${process.env.PR_NUMBER}-bucket`.toLowerCase(),
    },
    shared: {
      domainName: process.env.DOMAIN_NAME as string,
      domainCertificateArn: process.env.DOMAIN_CERT_ARN as string,
    },
	}
	...
  [Stage.featureDev]: {
    client: {
      bucketName: 'serverless-pro-client-feature-dev-bucket',
    },
    shared: {
      domainName: 'your-domain.co.uk',
      domainCertificateArn:
        'arn:aws:acm:us-east-1:111111111111:certificate/3c0a6045-5e85-45c1-8749-74e87b1e6017',
    },
  }

	[Stage.staging]: {
    client: {
      bucketName: 'serverless-pro-client-staging-bucket',
    },
    shared: {
      domainName: 'your-domain.co.uk',
      domainCertificateArn:
        'arn:aws:acm:us-east-1:111111111111:certificate/3c0a6045-5e85-45c1-8749-74e87b1e6017',
    },
  }

	[Stage.prod]: {
    client: {
      bucketName: 'serverless-pro-client-prod-bucket',
    },
    shared: {
      domainName: 'your-domain.co.uk',
      domainCertificateArn:
        'arn:aws:acm:us-east-1:111111111111:certificate/3c0a6045-5e85-45c1-8749-74e87b1e6017',
    },
  }
```



### add client-stack

`pipeline-stage.ts`

```typescript
import { ClientStack } from '../../app/client/client-stack';
...
export class PipelineStage extends cdk.Stage {
  ...
	public readonly route53ClientUrl: cdk.CfnOutput;
	...
	const clientStack = new ClientStack(this, 'ClientStack', {
      env: {
        account: props.env.account,
        region: props.env.region,
      },
      bucketName: props.client.bucketName,
      stageName: props.stageName,
      domainName: props.shared.domainName,
      domainCertArn: props.shared.domainCertificateArn,
 	});
	...
	this.route53ClientUrl = clientStack.route53ClientUrl;
	}
}
```



# 🧪 Test Stage

Now let’s move on to our test stage and the use of acceptance tests:

![img](https://miro.medium.com/v2/resize:fit:348/0*INwZNcxE6Ugt4yzK.png)

## ✔️ Acceptance Tests using Cypress

> “Run automated testing from the users’ perspective in the beta environment. These tests verify the user workflow, including when performed through a UI. These test are the slowest to run and hardest to maintain and therefore it is recommended to only have a few end-to-end tests that cover the most important application workflows. Test results should be published somewhere such as [AWS CodeBuild Test Reports](https://docs.aws.amazon.com/codebuild/latest/userguide/test-reporting.html). Examples of tools to define end-to-end tests include but are not limited to [Cypress](https://cypress.io/), [Selenium](https://selenium.dev/), and [Telerik Test Studio](https://www.telerik.com/teststudio).” — https://pipelines.devops.aws.dev/application-pipeline/index.html#local-development

![img](https://miro.medium.com/v2/resize:fit:515/1*W6sjAuvOLnWq6C3K-uiwcQ.png)

In our example pipeline we are going to use Cypress as suggested in the AWS best practices documentation as one of the frameworks we can use.

> “Build, test, and debug directly in your browser with a seamless developer experience that is loved by developers all around the world. Test your code, not your patience.” — https://www.cypress.io/

![img](https://miro.medium.com/v2/resize:fit:700/0*AN1m2NarQVV8LiGH.png)

**Cypress Overview**

Cypress allows us to run acceptance tests in our pipeline against the deployed feature-dev web application, asserting that it works as expected through autonomous scripts. We can check for example, but not limited to:

✔️ The correct modals show and hide when clicking on the relevant buttons.

✔️ We can ensure that the correct titles and sub titles are displaying.

✔️ We can ensure that when a new order is created that it is subsequently added to the refreshed list of orders.

During development locally we can also run the visual app that Cypress has created (*as shown below*) which allows us to run our tests and ensure they are asserting correctly, before committing them to run through the pipeline.

We start the local instance using the following command from the `./client` folder:

```
npm run cypress:open:beta
```

which in turn runs the following npm script:

```
"cypress:open:beta": "CYPRESS_BASE_URL=https://featuredev.your-domain.co.uk/ npx cypress open",
```

This will display the following Cypress application showing our tests that we have written in our code base:

![img](https://miro.medium.com/v2/resize:fit:700/1*gvfiRGT4mrxwD4fGfjB8CQ.png)

Cypress running locally allowing us to watch our tests run in realtime

We can see we have tests for both loading the initial page (*client/cypress/e2e/1-load-page/load-page.cy.ts*), and for creating an order (*client/cypress/e2e/2-create-order/create-order.cy.ts*). We can then run all of the tests as shown in the GIF below:

![img](https://miro.medium.com/v2/resize:fit:700/1*TAK5AA8z6oM9e1dDKo4IRg.gif)

The local development Cypress app which allows us to see any issues when writing our acceptance tests.

If we did have an issue with one of our tests it would look something like this below, which gives the developer the reason that the test has failed:

![img](https://miro.medium.com/v2/resize:fit:700/1*a1D8vu62KoJbvdoq1axFew.png)

Now we know where the tests reside, what Cypress is, and how to run the local visualisation application; now let’s have a look at one of the test suites to see how they are written:

```javascript
describe('create-order', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should have modal closed on initial page load', () => {
    cy.get('[data-test="create-order-modal"]').should('not.exist');
  });

  it('should open the create order modal', () => {
    // arrange / act
    cy.get('[data-test="create-order-button"]').click();
    // assert
    cy.get('[data-test="create-order-modal"]').should('exist');
  });

  it('should close modal when cancel button clicked', () => {
    // arrange
    cy.get('[data-test="create-order-modal"]').should('not.exist');
    cy.get('[data-test="create-order-button"]').click();
    cy.get('[data-test="create-order-modal"]').should('exist');
    // act
    cy.get('[data-test="cancel-create-order-modal-button"]').click();
    // assert
    cy.get('[data-test="create-order-modal"]').should('not.exist');
  });

  it('should create an new order successfully and close the modal', () => {
    // arrange
    cy.get('[data-test="create-order-button"]').click();

    cy.get('[data-test="create-order-select-product"]')
      .click()
      .get('ul > li[data-value="MacPro"]')
      .click();

    cy.get('[data-test="create-order-select-store"]')
      .click()
      .get('ul > li[data-value="59b8a675-9bb7-46c7-955d-2566edfba8ea"]')
      .click();

    cy.get('[data-test="create-order-set-quantity"]')
      .click()
      .type('{uparrow}{uparrow}{uparrow}{uparrow}');

    // act
    cy.get('[data-test="create-order-modal-button"]').click();
    // assert
    cy.get('[data-test="create-order-modal"]').should('not.exist');
  });

  it('should show newly added item in the refreshed table', () => {
    // arrange
    cy.intercept('POST', '**/orders/').as('createOrder');

    // act
    cy.get('[data-test="create-order-button"]').click();

    cy.get('[data-test="create-order-select-product"]')
      .click()
      .get('ul > li[data-value="MacPro"]')
      .click();

    cy.get('[data-test="create-order-select-store"]')
      .click()
      .get('ul > li[data-value="59b8a675-9bb7-46c7-955d-2566edfba8ea"]')
      .click();

    cy.get('[data-test="create-order-set-quantity"]')
      .click()
      .type('{uparrow}{uparrow}');

    cy.get('[data-test="create-order-modal-button"]').click();

    cy.wait('@createOrder').then(({ response }) => {
      cy.get(`[data-test="view-order-table-row-${response?.body.id}"]`, {
        timeout: 5000,
      }).should('be.visible');
    });
  });
});
```



We can see from the code above that the syntax is very similar to Jest meaning a low barrier to entry for most TypeScript developers.

We can see in our pipeline code that we call the acceptance tests in the `pipeline-stack.ts` file as shown below using the headless version of Cypress rather than the local development application. This is done using the following syntax:

```
CYPRESS_BASE_URL=https://$ROUTE53_CLIENT_URL/ npx cypress run
```

<iframe src="https://blog.serverlessadvocate.com/media/5ef4c73922592317f6ace70a7989db25" allowfullscreen="" frameborder="0" height="1077" width="680" title="Example running Cypress in a CDK Pipelines pipeline" class="ek n fk dy bg" scrolling="no" style="box-sizing: inherit; top: 0px; width: 680px; height: 1077px; left: 0px;"></iframe>

Now our pipeline will run the acceptance tests in the beta (*feature-dev*) stage to ensure that our web application is functioning as expected before progressing through to the further stages.

Let’s move onto the staging and production stages and our use of Synthetics.

# 📦 Staging & Production

Now let’s move on to the key considerations for our **Staging (Gamma)** and **Production** stages when it comes to **Synthetic testing**:

![img](https://miro.medium.com/v2/resize:fit:344/0*cVdm32Yjt-oFo8On.png)

## ✔️ Synthetic Tests using CloudWatch Synthetics

“Tests that run continuously in the background in a given environment to generate traffic and verify the system is healthy. These tests serve two purposes: 1/ Ensure there is always adequate traffic in the environment to trigger alarms if a deployment is unhealthy 2/ Test specific workflows and assert that the system is functioning correctly. Examples of tools that can be used for synthetic tests include but are not limited to [Amazon CloudWatch Synthetics](https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/CloudWatch_Synthetics_Canaries.html),[Dynatrace Synthetic Monitoring](https://www.dynatrace.com/monitoring/platform/synthetic-monitoring/), and [Datadog Synthetic Monitoring](https://docs.datadoghq.com/synthetics/).” — https://pipelines.devops.aws.dev/application-pipeline/index.html#local-development

![img](https://miro.medium.com/v2/resize:fit:700/1*afWXws1z6CtyB6Vq1iCZgw.png)

**What are CloudWatch Synthetics?**

“You can use Amazon CloudWatch Synthetics to create *canaries*, configurable scripts that run on a schedule, to monitor your endpoints and APIs. Canaries follow the same routes and perform the same actions as a customer, which makes it possible for you to continually verify your customer experience even when you don’t have any customer traffic on your applications. By using canaries, you can discover issues before your customers do.” — https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/CloudWatch_Synthetics_Canaries.html

> “Canaries check the availability and latency of your endpoints and can store load time data and screenshots of the UI. They monitor your REST APIs, URLs, and website content, and they can check for unauthorized changes from phishing, code injection and cross-site scripting.” — AWS

**API Testing Overview**

The YouTube video below is a great overview of CloudWatch Synthetics in general, and how we can use canaries for both our API and visual monitoring:

<iframe src="https://cdn.embedly.com/widgets/media.html?src=https%3A%2F%2Fwww.youtube.com%2Fembed%2FDSx65wW7lr0%3Ffeature%3Doembed&amp;display_name=YouTube&amp;url=https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3DDSx65wW7lr0&amp;image=https%3A%2F%2Fi.ytimg.com%2Fvi%2FDSx65wW7lr0%2Fhqdefault.jpg&amp;key=a19fcc184b9711e1b4764040d3dc5c07&amp;type=text%2Fhtml&amp;schema=youtube" allowfullscreen="" frameborder="0" height="480" width="854" title="Create Canaries Using Amazon CloudWatch Synthetics" class="ek n fk dy bg" scrolling="no" style="box-sizing: inherit; top: 0px; width: 680px; height: 382.188px; left: 0px;"></iframe>

**Visual Testing Overview**

The YouTube video below is a great overview of visual monitoring through CloudWatch synthetics which we will be implementing in our example:

<iframe src="https://cdn.embedly.com/widgets/media.html?src=https%3A%2F%2Fwww.youtube.com%2Fembed%2F_PCs-ucZz7E%3Ffeature%3Doembed&amp;display_name=YouTube&amp;url=https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3D_PCs-ucZz7E&amp;image=https%3A%2F%2Fi.ytimg.com%2Fvi%2F_PCs-ucZz7E%2Fhqdefault.jpg&amp;key=a19fcc184b9711e1b4764040d3dc5c07&amp;type=text%2Fhtml&amp;schema=youtube" allowfullscreen="" frameborder="0" height="480" width="854" title="Visual Monitoring of Applications with Amazon CloudWatch Synthetics | Amazon Web Services" class="ek n fk dy bg" scrolling="no" style="box-sizing: inherit; top: 0px; width: 680px; height: 382.188px; left: 0px;"></iframe>

**Our setup and walkthrough for staging and production.**

OK, now that we know what CloudWatch Synthetic Canaries are, let’s now cover how we implement this in our code base for the staging and production stages.

We create our canaries as part of our Stateless stack to monitor our applications, as opposed to directly in the pipeline like we do with Cypress. We start by ensuring that we only create the canaries in the right stages:

```
 // we only use synthetics in the staging (gamma) or prod stages
 // https://pipelines.devops.aws.dev/application-pipeline/index.html
 if (props.stageName === Stage.staging || props.stageName === Stage.prod) {
           .....
}
```

We create the two SNS topics first which will be used for alerting:

```
const apiTopic: sns.Topic = new sns.Topic(this, 'CanaryAPITopic', {
  displayName: `${props.stageName} API Canary Topic`,
  topicName: `${props.stageName}ApiCanaryTopic`,
});
apiTopic.applyRemovalPolicy(RemovalPolicy.DESTROY);

const visualTopic: sns.Topic = new sns.Topic(this, 'CanaryVisualTopic', {
  displayName: `${props.stageName} Visual Canary Topic`,
  topicName: `${props.stageName}VisualCanaryTopic`,
});
visualTopic.applyRemovalPolicy(RemovalPolicy.DESTROY);
```

We then setup an email subscription to ensure that we are alerted to any failing canaries (*passing in the email address from our stage specific configuration*):

```
const apiTopicSubscription = apiTopic.addSubscription(
  new subscriptions.EmailSubscription(props.canaryNotificationEmail)
);
const visualTopicSubscription = visualTopic.addSubscription(
  new subscriptions.EmailSubscription(props.canaryNotificationEmail)
);
```

We then create our actual canaries, with the code below specifically showing the one for visual testing:

```
const visualCanary: synthetics.Canary = new synthetics.Canary(
  this,
  'VisualCanary',
  {
    canaryName: `${props.stageName}-visual-canary`,
    role: canaryRole,
    schedule: synthetics.Schedule.rate(cdk.Duration.minutes(60)),
    artifactsBucketLocation: {
      bucket: props.assetsBucket,
    },
    test: synthetics.Test.custom({
      code: synthetics.Code.fromAsset(
        path.join(__dirname, './src/canaries/visual-canary')
      ),
      handler: 'index.handler',
    }),
    runtime: synthetics.Runtime.SYNTHETICS_NODEJS_PUPPETEER_3_9,
    environmentVariables: {
      STAGE: props.stageName,
      WEBSITE_URL: websiteSubDomain,
    },
  }
);
visualCanary.applyRemovalPolicy(RemovalPolicy.DESTROY);
```

We can see from the code that we will run the canary (*Lambda function*) every hour, and we will push any screenshots generated to our assets S3 bucket. We can also see that the packages we are using are from Puppeteer version 3.9.

```
Note - Canaries can utilise either Selenium or Puppeteer, and
can be written in Python or raw NodeJS.
```

> “Canaries are scripts written in Node.js or Python. They create Lambda functions in your account that use Node.js or Python as a framework. Canaries work over both HTTP and HTTPS protocols.
>
> Canaries offer programmatic access to a headless Google Chrome Browser via Puppeteer or Selenium Webdriver. For more information about Puppeteer, see [Puppeteer](https://developers.google.com/web/tools/puppeteer). For more information about Selenium, see [www.selenium.dev/](https://www.selenium.dev/).” — https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/CloudWatch_Synthetics_Canaries.html

Let’s now take a look at our Lambda function canary code below:

```
const { URL } = require('url');
const log = require('SyntheticsLogger');
const synthetics = require('Synthetics');
const syntheticsConfiguration = synthetics.getConfiguration();
 
const loadBlueprint = async function () {
    const urls = [process.env.WEBSITE_URL]; // this is where you add your website url
    syntheticsConfiguration.disableStepScreenshots();
    syntheticsConfiguration.setConfig({
       continueOnStepFailure: true,
       includeRequestHeaders: true,
       includeResponseHeaders: true,
       restrictedHeaders: [],
       restrictedUrlParameters: [],
    });
 
    syntheticsConfiguration.withVisualCompareWithBaseRun(true); // this ensures that it checks against the previous run
    syntheticsConfiguration.withVisualVarianceThresholdPercentage(5); // this is the percentage threshold of variance
 
    let page = await synthetics.getPage();
 
    for (const url of urls) {
        await loadUrl(page, url);
    }
};
 
const loadUrl = async function (page, urlPage) {
    let stepName = null;

    try {
        stepName = new URL(urlPage).hostname;
    } catch (error) {
        const errorString = `Error parsing url: ${urlPage}.  ${error}`;
        log.error(errorString);
        throw error;
    }
 
    await synthetics.executeStep(stepName, async function () {
        const response = await page.goto(urlPage, { waitUntil: ['domcontentloaded'], timeout: 30000});

        if (response) {
            const status = response.status();
            const statusText = response.statusText();
 
            const logResponseString = `Response from url: ${urlPage}  Status: ${status}  Status Text: ${statusText}`;
            log.info(logResponseString);
 
            if (response.status() < 200 || response.status() > 299) {
                throw `Failed to load url: ${urlPage} ${response.status()} ${response.statusText()}`;
            }
        } else {
            const logNoResponseString = `No response returned for url: ${urlPage}`;
            log.error(logNoResponseString);
            throw new Error(logNoResponseString);
        }
        await page.waitFor(1000);
        await synthetics.takeScreenshot(stepName, 'loaded');
    });
};

exports.handler = async () => {
    return await loadBlueprint();
};
```

The code above shows that we are iterating through the pages we pass into our function (*in our example we are specifically only passing through the main page*). We then ensure that we can load the page successfully via the URL (a 200 response) and we take a screenshot.

The screenshot stored is then used as reference for the subsequent run of the function to ensure that visually it has not deviated by a configurable percentage (*in the code above this is 5% visual difference*).

**Deployed stages**

The screenshot below shows what we see once we have deployed our pipeline through to production:

![img](https://miro.medium.com/v2/resize:fit:700/1*x-29UGiv7fvrOLBocAIBAQ.png)

Screenshot showing our staging and production canaries

Clicking on the production API canary will show any previous runs, whether successful or in alarm state.

![img](https://miro.medium.com/v2/resize:fit:700/1*QnzWdiz--j2CSLJ8_6b4_g.png)

The production API canary screenshot.

This is the same with the production visual canary too as shown below:

![img](https://miro.medium.com/v2/resize:fit:700/1*EGErtFhoQEXoViiOz1IL6w.png)

The production visual canary screenshot.

If we click on one of the visual canary runs we can specifically see the screenshot which it took on success, which is actually stored in our configured assets S3 bucket:

![img](https://miro.medium.com/v2/resize:fit:700/1*krJ_DZ731cOwKZRFc3Pcdw.png)

If we purposefully cause an alarmed state by changing the visuals drastically on the page we see the following failure:

![img](https://miro.medium.com/v2/resize:fit:700/1*3dPsTNP0w4Ba7dUHlhyWQQ.png)

Visual variation of 50.66% detected which causes our alarm to trigger and send us an email

It will also highlight where the differences are when the are any issues, for example, I turned the background a light purple colour which caused a variance of 50.66% and therefore triggered an alarm.

![img](https://miro.medium.com/v2/resize:fit:700/1*TWCtwdsqI7ap47Ad1wGFKw.png)

The screenshots which are recorded and stored in S3 showing why the alarm was triggered.

In our code we created an alarm for the canary based on success metrics as shown below:

```
const visualAlarm: cloudwatch.Alarm = new cloudwatch.Alarm(
  this,
  'VisualCanaryAlarm',
  {
    metric: visualCanary.metricSuccessPercent(), // percentage of successful canary runs over a given time
    evaluationPeriods: 1,
    threshold: 60,
    datapointsToAlarm: 1,
    actionsEnabled: true,
    alarmDescription: `${props.stageName} Visual Canary CloudWatch Alarm`,
    alarmName: `${props.stageName}VisualCanaryAlarm`,
    comparisonOperator: cloudwatch.ComparisonOperator.LESS_THAN_THRESHOLD,
  }
);

visualAlarm.addAlarmAction(new actions.SnsAction(visualTopic));
```

This means that we are alerted via email when we have any failures as shown below:

![img](https://miro.medium.com/v2/resize:fit:700/1*pF8TKS72zVzgv3qjtRw39Q.png)

This alarm means that day or night, and with or without users on our system, we will be alerted if there are any issues.

For more information on Amazon Synthetic Canaries please see the following deep dive article:

## Serverless Synthetic Canaries 🚀

### Practical example of using CloudWatch Synthetic Canaries to monitor your serverless applications, with visuals and…

blog.serverlessadvocate.com

# Summary

I hope you found that useful as a follow on from Part 2 in this series. In Part 4 we will cover progressive deployments and how we can utilise feature flags to deploy dark.

# Wrapping up 👋

Please [go and subscribe on my YouTube channel](https://www.youtube.com/channel/UC_Bi6eLsBXpLnNRNnxKQUsA) for similar content!

![img](https://miro.medium.com/v2/resize:fit:700/0*CQKZ2NcRWhe9kfRT.png)

I would love to connect with you also on any of the following:

https://www.linkedin.com/in/lee-james-gilmore/
https://twitter.com/LeeJamesGilmore

If you enjoyed the posts please follow my profile [Lee James Gilmore](https://medium.com/u/2906c6def240?source=post_page-----39c4f4ae5aff----------------------) for further posts/series, and don’t forget to connect and say Hi 👋

Please also use the ‘clap’ feature at the bottom of the post if you enjoyed it! (*You can clap more than once!!*)