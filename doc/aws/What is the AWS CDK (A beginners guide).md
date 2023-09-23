# What is the AWS CDK? (A beginners guide)

![Danny Steenman](https://towardsthecloud.com/wp-content/uploads/danny-steenman.webp)

Danny Steenman





Write, schedule, and publish great Twitter tweets & threads. Grow your following on Twitter with Typefully!

[Sign up for free](https://towardsthecloud.com/aws-cdk)

Provisioning infrastructure in the Cloud using code has been a best practice standard now for a couple of years now. Businesses and organizations now see the benefit of provisioning AWS resources compared to the manual approach in the AWS console.

From that point on there were two popular tools available that allowed you to define Cloud resources using a declarative approach such as AWS CloudFormation and Terraform.

However, the configuration of a declarative approach can be rather extensive and results in very large templates written in JSON or YAML that need to be maintained in order to keep your infrastructure as code up-to-date.

That’s where AWS CDK comes in to improve the workflow of developers and help them provision Cloud infrastructure using an imperative approach.

In this guide, you’ll learn what AWS CDK is, how you can use it to create your own infrastructure as code, and apply the best practices during development.

Table of Contents



[What is the AWS Cloud Development Kit (CDK)?](https://towardsthecloud.com/aws-cdk#What_is_the_AWS_Cloud_Development_Kit_CDK)[AWS CDK Concept](https://towardsthecloud.com/aws-cdk#AWS_CDK_Concept)[AWS CDK construct concept](https://towardsthecloud.com/aws-cdk#AWS_CDK_construct_concept)[What are some of the features of AWS CDK?](https://towardsthecloud.com/aws-cdk#What_are_some_of_the_features_of_AWS_CDK)[AWS CDK vs CloudFormation](https://towardsthecloud.com/aws-cdk#AWS_CDK_vs_CloudFormation)[How do I get started with AWS CDK?](https://towardsthecloud.com/aws-cdk#How_do_I_get_started_with_AWS_CDK)[AWS CDK best practices](https://towardsthecloud.com/aws-cdk#AWS_CDK_best_practices)[Developer tools for AWS CDK](https://towardsthecloud.com/aws-cdk#Developer_tools_for_AWS_CDK)[Conclusion](https://towardsthecloud.com/aws-cdk#Conclusion)[AWS CDK FAQ](https://towardsthecloud.com/aws-cdk#AWS_CDK_FAQ)[What is the difference between AWS SDK and AWS CDK?](https://towardsthecloud.com/aws-cdk#What_is_the_difference_between_AWS_SDK_and_AWS_CDK)[Is AWS CDK better than terraform?](https://towardsthecloud.com/aws-cdk#Is_AWS_CDK_better_than_terraform)[Is AWS CDK IaC?](https://towardsthecloud.com/aws-cdk#Is_AWS_CDK_IaC)[Is AWS CDK the future?](https://towardsthecloud.com/aws-cdk#Is_AWS_CDK_the_future)[Elevate Your AWS CDK App with Expert Review & Guidance](https://towardsthecloud.com/aws-cdk#Elevate_Your_AWS_CDK_App_with_Expert_Review_Guidance)

## What is the AWS Cloud Development Kit (CDK)?

AWS CDK stands for Cloud Development Kit and is a framework developed by AWS that allows you to define and provision Cloud infrastructure in code and deploy it through AWS CloudFormation.

AWS publicly released AWS CDK (v.0.8.0) in beta back in 2018 as an alternative approach to developing AWS resources programmatically using TypeScript.

![First public beta release of AWS CDK](https://towardsthecloud.com/wp-content/uploads/aws-cdk-public-release-1024x579.webp)First public beta release of AWS CDK

They made this project open-source so that it enabled the community to contribute to the code and directly pass on feedback to the official maintainers.

In December 2021 during Re:Invent Werner Vogels announced that [AWS CDKv2](https://towardsthecloud.com/migrate-aws-cdk-v2) became generally available (GA) and currently supports the following programming languages:

- TypeScript
- JavaScript
- Python
- Java
- C#
- Go (Developer preview)

When AWS CDK became GA this meant that there wouldn’t be any breaking changes from that point on and it could safely be used for production workloads.

### AWS CDK Concept

To simplify the concept of AWS CDK is that it consists of 3 major building blocks that allow you to customize the provisioning of your infrastructure:

- App – That is the root of your construct tree and consolidates all stacks and constructs in one application that can then be used to deploy on AWS Cloud.
- [Stack](https://towardsthecloud.com/aws-cdk-stack) – is similar to a CloudFormation stack. It’s a single unit (template) that holds the AWS resources in the form of constructs and can be used for deployment.
- [Construct](https://towardsthecloud.com/aws-cdk-construct) – is the basic building block that can contain a single AWS resource or multiple AWS resources combined. You’re free to build and combine AWS resources in your own constructs.

![AWS CDK Concept architecture diagram](https://towardsthecloud.com/wp-content/uploads/aws-cdk-concept-1024x758.webp)AWS CDK Concept architecture diagram

When an AWS CDK application is synthesized, the result is a [cloud assembly](https://docs.aws.amazon.com/cdk/latest/guide/apps.html#apps_cloud_assembly), which contains the generated AWS CloudFormation templates for your stacks including the assets of your application. This package can then be deployed by the AWS CDK CLI to your preferred AWS account and region.

### AWS CDK construct concept

As you might’ve noticed in the previous diagram, you’ll see multiple constructs displayed within the stacks, each containing different AWS resources. These constructs are fundamental to the biggest benefit that AWS CDK provides to the developer.

There are **3 ways** to build constructs in AWS CDK, each with its own unique features:

- **L1 Constructs** are basically the AWS CDK version of AWS CloudFormation resource types. The properties are mapped exactly as its AWS CloudFormation counterpart. There’s no real benefit to using L1 constructs if you can build AWS resources using L2 and L3 constructs. There’s one exception to this rule… if an L2 or L3 construct doesn’t let you customize a certain property via its API, then you can fix that using an [escape hatch](https://docs.aws.amazon.com/cdk/v2/guide/cfn_layer.html).
- **L2 Constructs** are AWS resources developed by the AWS CDK team that encapsulate L1 constructs using pre-configured security measures in place including sensible defaults. The primary benefit of L2 constructs is that you’re able to create secure AWS resources with a few lines of code.
- **L3 Constructs** (also called patterns) are a group of L2 constructs combined to deliver a full solution. For example, you can group multiple resources together like an EC2 instance that is linked to an RDS and an Application Load Balancer (ALB). You can initialize this group of resources using a few lines of code, which allows you to reuse these patterns in multiple projects or stacks.

## What are some of the features of AWS CDK?

The AWS CDK is a major step for developers to control and automate AWS infrastructure. Because it allowed you to develop AWS resources faster using your own development tools speed at which I can develop and iterate using CDK is significantly faster than using AWS CloudFormation alone. The ability to share and distribute AWS CloudFormation patterns using my company’s native software tools increases the consistency and standardization across all Intuit accounts. Even more importantly, AWS has made this project open source. This finally enables customers to directly contribute to and enhance the future of AWS CloudFormation.

Here are the best **AWS Cloud Development Kit** features that improve your development cycle:

- Supports multiple programming languages
- Use your own [development tools](https://towardsthecloud.com/best-vscode-extensions-typescript) to enhance the code quality of your AWS CDK project.
- You don’t have to reinvent the wheel as you create new AWS resources for your project because you can make use of the [construct hub](https://constructs.dev/) where you can find and share L2 and L3 CDK constructs
- Store your Infrastructure, application, config, and deployment in a single repo under one CDK app.
- Ability to contribute and pass feedback to the developer team since AWS CDK is open source.
- Ability to generate CloudFormation templates containing 1000s of lines with a few lines of Typescript code
- Ability to create recursive functions that allow you to iteratively generate multiple AWS resources e.g. generate 5 AWS Lambda functions without writing the same code 5 times.

## AWS CDK vs CloudFormation

When AWS CDK came out I saw a huge shift happening and a community gets formed where [constructs were shared](https://constructs.dev/) and people discuss new ideas and [share their experiences](https://cdk.dev/).

Back in the days when I used CloudFormation, I haven’t seen such a community that focused on sharing CloudFormation templates for instance, other than code shared on GitHub.

From my own experience as a **DevOps engineer** having used both services extensively over the years, I would say that I prefer AWS CDK over AWS CloudFormation for the following reasons:

- Speed up the development time of new resources by using L2/L3 constructs that contain sensible defaults and best practice security policies
- Ability to use a programming language of choice to define my infrastructure instead of having to strictly declare resources using YAML or JSON
- Spending time mastering a programming language is more useful for your career than spending time writing YAML for CloudFormation. The skills you learn writing code day in and day out are more transferable to other technical job functions.

One of the AWS community members made a good point about what many would consider a unique selling point of AWS CDK:

<iframe id="twitter-widget-0" scrolling="no" frameborder="0" allowtransparency="true" allowfullscreen="true" class="" title="Twitter Tweet" src="https://platform.twitter.com/embed/Tweet.html?creatorScreenName=dannysteenman&amp;dnt=true&amp;embedId=twitter-widget-0&amp;features=eyJ0ZndfdGltZWxpbmVfbGlzdCI6eyJidWNrZXQiOltdLCJ2ZXJzaW9uIjpudWxsfSwidGZ3X2ZvbGxvd2VyX2NvdW50X3N1bnNldCI6eyJidWNrZXQiOnRydWUsInZlcnNpb24iOm51bGx9LCJ0ZndfdHdlZXRfZWRpdF9iYWNrZW5kIjp7ImJ1Y2tldCI6Im9uIiwidmVyc2lvbiI6bnVsbH0sInRmd19yZWZzcmNfc2Vzc2lvbiI6eyJidWNrZXQiOiJvbiIsInZlcnNpb24iOm51bGx9LCJ0ZndfbWl4ZWRfbWVkaWFfMTU4OTciOnsiYnVja2V0IjoidHJlYXRtZW50IiwidmVyc2lvbiI6bnVsbH0sInRmd19leHBlcmltZW50c19jb29raWVfZXhwaXJhdGlvbiI6eyJidWNrZXQiOjEyMDk2MDAsInZlcnNpb24iOm51bGx9LCJ0ZndfZHVwbGljYXRlX3NjcmliZXNfdG9fc2V0dGluZ3MiOnsiYnVja2V0Ijoib24iLCJ2ZXJzaW9uIjpudWxsfSwidGZ3X3ZpZGVvX2hsc19keW5hbWljX21hbmlmZXN0c18xNTA4MiI6eyJidWNrZXQiOiJ0cnVlX2JpdHJhdGUiLCJ2ZXJzaW9uIjpudWxsfSwidGZ3X2xlZ2FjeV90aW1lbGluZV9zdW5zZXQiOnsiYnVja2V0Ijp0cnVlLCJ2ZXJzaW9uIjpudWxsfSwidGZ3X3R3ZWV0X2VkaXRfZnJvbnRlbmQiOnsiYnVja2V0Ijoib24iLCJ2ZXJzaW9uIjpudWxsfX0%3D&amp;frame=false&amp;hideCard=false&amp;hideThread=false&amp;id=1466465582501531662&amp;lang=en&amp;origin=https%3A%2F%2Ftowardsthecloud.com%2Faws-cdk&amp;sessionId=4dcfa2350050d3b7f5151acc4aa39605b46d506f&amp;siteScreenName=dannysteenman&amp;theme=light&amp;widgetsVersion=aaf4084522e3a%3A1674595607486&amp;width=500px" data-tweet-id="1466465582501531662" style="box-sizing: border-box; max-width: 100%; visibility: visible; width: 500px; height: 361px; display: block; flex-grow: 1;"></iframe>

In the end, AWS CDK is just a transpiler for AWS CloudFormation by using `cdk synth` to turn your TypeScript source definition into a JSON template that will be deployed using AWS CloudFormation.

Therefore it’s a best practice to validate the output by tools such as [cfn-lint](https://towardsthecloud.com/validating-cloudformation-templates-codepipeline) and [checkov](https://github.com/bridgecrewio/checkov) to prevent misconfiguration of your infrastructure as code.

Having an abstraction such as AWS CDK can be great but only if you understand the underlying concepts. If you don’t know how CloudFormation works, it might be detrimental to your development cycle as you spend more time debugging and not understanding why things might not work.

## How do I get started with AWS CDK?

To get started with AWS CDK you first need to [install the AWS CDK toolkit](https://towardsthecloud.com/install-aws-cdk) on your machine, you use the **node package manager** in your terminal to install the package globally:

```bash
➜ npm install -g aws-cdk

added 180 packages, and audited 181 packages in 7s
found 0 vulnerabilities
~ took 7s
```

## AWS CDK best practices

I’ve summed up a list of best practices that’ll help improve the way you develop using AWS CDK. These best practices focus on how you manage your code, environments, pipelines, and constructs.

- Start with implementing a [landing zone](https://towardsthecloud.com/landing-zone) strategy to organize your AWS accounts and automate the security policies and guardrails so you can quickly onboard and configure new accounts and teams.
- Create multiple stages (AWS accounts) e.g. Development, Test, Staging, and Production to promote build changes from your AWS CDK Apps.
- Add (automated) integration tests in your pipelines to mitigate any breaking changes to your application.
- Use the `cdk diff` command to inspect the AWS resource changes before you deploy to production.
- Consider keeping stateful constructs (like databases & storage) in a separate stack from stateless constructs (API, ECS, Monitoring). You can then turn on termination protection on the stateful stack, and can freely destroy or create multiple copies of the stateless stack without risk of data loss.
- Stateful resources are more sensitive to construct renaming—renaming leads to resource replacement—so it makes sense not to nest them inside constructs that are likely to be moved around or renamed (unless the state can be rebuilt if lost, like a cache). This is another good reason to put stateful resources in their own stack.
- Use conditions in your programming language to decide how to instantiate a construct at synthesis time. Don’t use the AWS CloudFormation logic (`Conditions`, `{ Fn::If }`, and `Parameters`).

For more best practices, check out the [official documentation](https://docs.aws.amazon.com/cdk/v2/guide/best-practices.html).

## Developer tools for AWS CDK

To help you speed up your development time and [improve your code quality](https://towardsthecloud.com/best-vscode-extensions-typescript) you need assistance in the form of tools. Here’s a list of tools that’ll help improve your workflow using AWS CDK:

- [AWS Toolkit for VS Code](https://towardsthecloud.com/best-vscode-extensions-cloud-engineers#5_AWS_Toolkit) – allows you to gain tree view access on your CDK App within your code editor.
- [Projen](https://github.com/projen/projen) – is a project generator that initializes new CDK projects for you which are already pre-configured using best practices. Managing project configuration files can be difficult and hard to transfer to new projects. With Projen you synthesize project configuration files from a well-typed definition written in TypeScript.
- Eslint – is a linter that statically analyzes your code to find problems based on a set of pre-configured rules.
- [Visual Studio IntelliCode](https://towardsthecloud.com/best-vscode-extensions-typescript#4_Visual_Studio_IntelliCode) – provides AI-assisted code completion when building constructs.
- [Cdk-nag](https://github.com/cdklabs/cdk-nag) – checks your application for best practices based on a library of available rules. Implement this tool in your CI/CD pipeline to enforce high standards on the AWS resources that you build and deploy.

## Conclusion

In this article, you’ve learned what AWS CDK is and how it could improve your own development cycle. You’ve read how it stacks up against AWS CloudFormation and what the benefits and features are when you’re ready to adopt AWS CDK.

The best practices and tools that are shared will keep your code and infrastructure quality high without sacrificing the speed of delivery.

If you liked this and want to dive deeper. Then have a look at these [AWS CDK examples](https://towardsthecloud.com/tag/aws-cdk-example) that I’ve documented so you can build and deploy AWS CDK Constructs yourself and learn in a practical manner.

## AWS CDK FAQ

1. ### What is the difference between AWS SDK and AWS CDK?

   The AWS Software Development Kit (SDK) is a set of libraries that allow you to integrate your application with AWS Services. The AWS Cloud Development Kit (CDK) is a framework that allows you to provision Cloud infrastructure using code.

2. ### Is AWS CDK better than terraform?

   Both are great Infrastructure as Code tools and both have great ecosystems available to find and share AWS resources. So it comes down to your own skills and preferences. Terraform is a declarative approach and uses its own configuration syntax. AWS CDK is imperative and allows you to use a programming language such as Python and Typescript to build AWS resources.

3. ### Is AWS CDK IaC?

   Yes AWS CDK is Infrastructure as Code (IaC) as it defines and provision Cloud infrastructure in code and deploys it through AWS CloudFormation.

4. ### Is AWS CDK the future?

   AWS CDK has been getting adopted by developers at a rapid pace and in such a short time a big community has already formed around this open-source project. No doubt that AWS CDK is the future as this will only grow further and more people share their patterns and constructs online.

## Elevate Your AWS CDK App with Expert Review & Guidance

Unlock the full potential of your AWS CDK app with our Expert AWS CDK App Code Review Service, conveniently delivered through AWS IQ.

Gain invaluable insights, minimize risks, and set a clear path forward for your project’s success.

[Schedule Your CDK Review Now](https://towardsthecloud.com/services/aws-cdk-app-review)

[guide](https://towardsthecloud.com/tag/guide)[python](https://towardsthecloud.com/tag/python)[typescript](https://towardsthecloud.com/tag/typescript)[vscode](https://towardsthecloud.com/tag/vscode)

<iframe class="giscus-frame" title="Comments" scrolling="no" allow="clipboard-write" src="https://giscus.app/en/widget?origin=https%3A%2F%2Ftowardsthecloud.com%2Faws-cdk&amp;session=&amp;theme=light&amp;reactionsEnabled=1&amp;emitMetadata=0&amp;inputPosition=bottom&amp;repo=dannysteenman%2Ftowardsthecloud.com&amp;repoId=R_kgDOJJbiJA&amp;category=General&amp;categoryId=DIC_kwDOJJbiJM4CU3c5&amp;strict=0&amp;description=In+this+guide%2C+you%27ll+learn+what+AWS+CDK+is%2C+how+you+can+use+it+to+create+your+own+infrastructure+as+code%2C+and+apply+the+best+practices+during+development.&amp;backLink=https%3A%2F%2Ftowardsthecloud.com%2Faws-cdk&amp;term=aws-cdk" loading="lazy" style="box-sizing: border-box; width: 664.734px; min-height: 150px; border: none; color-scheme: light dark;"></iframe>

### Share this post

[Share onFacebook](https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Ftowardsthecloud.com%2Faws-cdk)[Share onTwitter](https://twitter.com/intent/tweet?text=What is the AWS CDK%3F (A beginners guide)&url=https%3A%2F%2Ftowardsthecloud.com%2Faws-cdk&via=dannysteenman&related=dannysteenman)[Share onLinkedIn](https://www.linkedin.com/shareArticle?mini=1&url=https%3A%2F%2Ftowardsthecloud.com%2Faws-cdk&title=What is the AWS CDK%3F (A beginners guide)&source=https%3A%2F%2Ftowardsthecloud.com&summary=In this guide%2C you'll learn what AWS CDK is%2C how you can use it to create your own infrastructure as code%2C and apply the best practices during development.)[Share onReddit](https://www.reddit.com/submit?url=https%3A%2F%2Ftowardsthecloud.com%2Faws-cdk)[Share onWhatsApp](https://api.whatsapp.com/send?text=What is the AWS CDK%3F (A beginners guide) — https%3A%2F%2Ftowardsthecloud.com%2Faws-cdk)

### You may like the following related articles

- [Autocomplete AWS CDK Constructs in VS Code](https://towardsthecloud.com/autocomplete-aws-cdk-constructs-vscode)
- [Optimize your AWS CDK Project Structure for Growth](https://towardsthecloud.com/aws-cdk-project-structure)
- [How to create an AWS CDK Construct](https://towardsthecloud.com/aws-cdk-construct)
- [How to create an AWS CDK Stack](https://towardsthecloud.com/aws-cdk-stack)
- [How to migrate to AWS CDK v2](https://towardsthecloud.com/migrate-aws-cdk-v2)

![Danny Steenman](https://towardsthecloud.com/wp-content/uploads/danny-steenman.webp)

[Danny Steenman](https://towardsthecloud.com/author/dannysteenman)

A Senior AWS Cloud Engineer with over 9 years of experience migrating workloads from on-premises to AWS Cloud.

I have helped companies of all sizes shape their cloud adoption strategies, optimizing operational efficiency, reducing costs, and improving organizational agility.

[Connect with me today](https://iq.aws.amazon.com/e/dannysteenman) to discuss your cloud aspirations, and let’s work together to transform your business by leveraging the power of AWS Cloud