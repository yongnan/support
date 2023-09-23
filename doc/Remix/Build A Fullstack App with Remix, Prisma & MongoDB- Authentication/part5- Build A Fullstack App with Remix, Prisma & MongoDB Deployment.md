[Up to 1000x faster database queries with **Accelerate** -> Sign up for Early Access](https://www.prisma.io/data-platform/accelerate)

[![prisma_logo](https://prismalens.vercel.app/header/logo-dark.svg)](https://www.prisma.io/)

Product

[Docs](https://www.prisma.io/docs)

Developer

Use Cases

Company

[Get Started](https://www.prisma.io/docs/getting-started/quickstart)

April 29, 2022

# Build A Fullstack App with Remix, Prisma & MongoDB: Deployment

[SERIES](https://www.prisma.io/blog/series/fullstack-remix-prisma-mongodb-MaTVLuwpaICD)

[![sabinadams](https://github.com/sabinadams.png)Sabin Adams@sabinthedev](https://twitter.com/sabinthedev)

*10 min read*

Welcome to the last article of this series where you are learning how to build a full-stack application from the ground up using MongoDB, Prisma, and Remix! In this part, you will deploy the application you've been building using Vercel.

![img](https://prisma-blog-ebon.vercel.app/blog/posts/fullstack-mongodb-5.svg)

[PART 1**Build A Fullstack App with Remix, Prisma & MongoDB: Project Setup**](https://www.prisma.io/blog/fullstack-remix-prisma-mongodb-1-7D0BfTXBmB6r)[PART 2**Build A Fullstack App with Remix, Prisma & MongoDB: Authentication**](https://www.prisma.io/blog/fullstack-remix-prisma-mongodb-2-ZTmOy58p4re8)[PART 3**Build A Fullstack App with Remix, Prisma & MongoDB: CRUD, Filtering & Sorting**](https://www.prisma.io/blog/fullstack-remix-prisma-mongodb-3-By5pmN5Nzo1v)[PART 4**Build A Fullstack App with Remix, Prisma & MongoDB: Referential Integrity & Image Uploads**](https://www.prisma.io/blog/fullstack-remix-prisma-mongodb-4-l3MwEp4ZLIm2)

PART 5

(Currently reading)

**Build A Fullstack App with Remix, Prisma & MongoDB: Deployment**

## Table Of Contents

- Introduction
  - [Development environment](https://www.prisma.io/blog/fullstack-remix-prisma-mongodb-5-gOhQsnfUPXSx#development-environment)
- [Host your project on Github](https://www.prisma.io/blog/fullstack-remix-prisma-mongodb-5-gOhQsnfUPXSx#host-your-project-on-github)
- [Set up your project in Vercel](https://www.prisma.io/blog/fullstack-remix-prisma-mongodb-5-gOhQsnfUPXSx#set-up-your-project-in-vercel)
- [Set up environment variables](https://www.prisma.io/blog/fullstack-remix-prisma-mongodb-5-gOhQsnfUPXSx#set-up-environment-variables)
- [Deploy](https://www.prisma.io/blog/fullstack-remix-prisma-mongodb-5-gOhQsnfUPXSx#deploy)
- [Update MongoDB access settings](https://www.prisma.io/blog/fullstack-remix-prisma-mongodb-5-gOhQsnfUPXSx#update-mongodb-access-settings)
- [Summary & Final remarks](https://www.prisma.io/blog/fullstack-remix-prisma-mongodb-5-gOhQsnfUPXSx#summary--final-remarks)

<iframe frameborder="0" allowfullscreen="1" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" title="Build A Fullstack App with Remix, Prisma &amp; MongoDB: Deployment" width="100%" height="360" src="https://www.youtube.com/embed/E2fy2tGKaYc?rel=0&amp;showinfo=1&amp;modestbranding=1&amp;enablejsapi=1&amp;origin=https%3A%2F%2Fwww.prisma.io&amp;widgetid=23" id="widget24" style="box-sizing: inherit; margin-top: 32px; width: 740px;"></iframe>

## Introduction

In the [last part](https://www.prisma.io/blog/fullstack-remix-prisma-mongodb-4-l3MwEp4ZLIm2) of this series you wrapped up development on the Kudos application by giving your users a way to update their profile settings, add a profile picture, and delete their account and related data.

In this part you will deploy your application to your users using Vercel.

> **Note**: The starting point for this project is available in the [part-4](https://github.com/sabinadams/kudos-remix-mongodb-prisma/tree/part-4) branch of the GitHub repository.

### Development environment

In order to follow along with the examples provided, you will be expected to ...

- ... have [Node.js](https://nodejs.org/) installed.
- ... have [Git](https://git-scm.com/downloads) installed.
- ... have the [TailwindCSS VSCode Extension](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss) installed. *(optional)*
- ... have the [Prisma VSCode Extension](https://marketplace.visualstudio.com/items?itemName=Prisma.prisma) installed. *(optional)*

> **Note**: The optional extensions add some really nice intellisense and syntax highlighting for Tailwind and Prisma.

## Host your project on GitHub

To deploy your application, you will use [Vercel](https://vercel.com/). Vercel offers a [Git integration](https://vercel.com/docs/concepts/git/vercel-for-GitHub) which will allow you to easily deploy the app and update it in the future.

The first step in this process is making sure your project is hosted on GitHub. If your project and the latest changes are in a GitHub repository, feel free to move on to the [next step](https://www.prisma.io/blog/fullstack-remix-prisma-mongodb-5-gOhQsnfUPXSx#set-up-your-project-in-vercel).

If you do need to set up your codebase in a repository, you will first need to sign in to [GitHub](https://github.com/). Once on GitHub's home page, click the green **New** button at the top left of the screen to create a new repository.

![img](https://prisma-blog-ebon.vercel.app/blog/posts/fullstack-mongodb-remix-prisma-5/new-repo.png)

That will take you a page where you are asked for some details and options to configure about the repository. Fill those out however you would like and hit the **Create repository** button at the bottom.

![img](https://prisma-blog-ebon.vercel.app/blog/posts/fullstack-mongodb-remix-prisma-5/create-repo.png)

After creating the repository, you will land in the repository page with a *Quick setup* section at the top of the view. This section will have a connection string which you will use to push your codebase to the repository.

![img](https://prisma-blog-ebon.vercel.app/blog/posts/fullstack-mongodb-remix-prisma-5/repo-url.png)

In a terminal, navigate to the kudos project in your file system and run the following commands, providing the URL for your repository:

```sh
git init
git add .
git commit -m "Initial Commmit"
git branch -M main
git remote add origin <repo-url>
git push -u origin main

```

Once that finishes, head over to the repository page on GitHub. You should see your codebase has been pushed up and made available on GitHub.

![img](https://prisma-blog-ebon.vercel.app/blog/posts/fullstack-mongodb-remix-prisma-5/repo-pushed.png)

## Set up your project in Vercel

Next, log in to your account on [Vercel](https://vercel.com/login?). If you don't already have an account, the easiest option will be to [sign up](https://vercel.com/signup) with your GitHub account.

Once you have signed in, on your dashboard you will see a **New Project** button. Hit that button to start configuring your project.

![img](https://prisma-blog-ebon.vercel.app/blog/posts/fullstack-mongodb-remix-prisma-5/vercel-new.png)

On this page you will be asked to import a GitHub repository or choose a pre-made template. If you haven't already linked your GitHub account to your Vercel account you will do so here as will.

Select your project's repository from the list of repos under *Import Git Repository*.

![img](https://prisma-blog-ebon.vercel.app/blog/posts/fullstack-mongodb-remix-prisma-5/vercel-repos.png)

After you click **Import** on your repository you will be brought to a page where you can configure the project and deploy it.

Under the **Framework Preset** section of this page, if it isn't already selected, select `"Remix"` as the value to let Vercel know this is a Remix project. It will automatically set up a some of the build and deployment options for you with this information.

## Set up environment variables

Inside of the **Environment Variables** block you have the ability to add your environment variables to the deployment environment.

These will correlate to the variables you've set up in your project's `.env` file. Add all of your environment variables here. As an example, in the image below the information is filled out the for the `DATABASE_URL` variable. Hit **Add** after filling out the form for each variable.

![img](https://prisma-blog-ebon.vercel.app/blog/posts/fullstack-mongodb-remix-prisma-5/vercel-env.png)

## Deploy

Once all of your environment variables are configured, go ahead and click the **Deploy** button at the bottom of the form.

Clicking this button will kick off the application's build process, run any checks that need to be made, and deploy the application with a URL provisioned by Vercel.

![img](https://prisma-blog-ebon.vercel.app/blog/posts/fullstack-mongodb-remix-prisma-5/vercel-deploying.png)

When the deployment is finished, if you head back over to the dashboard you should see your kudos project available and accessible at the provisioned domain.

![img](https://prisma-blog-ebon.vercel.app/blog/posts/fullstack-mongodb-remix-prisma-5/vercel-deployed-dash.png)

If you click the **Visit** button on this page, you should be navigated to the live version of your site! Congrats!

## Update MongoDB access settings

You aren't quite done yet, however. You may notice if you attempt to sign in or sign up on your live site, you receive a nasty error.

![img](https://prisma-blog-ebon.vercel.app/blog/posts/fullstack-mongodb-remix-prisma-5/kudos-error.png)

This is due to the fact that your MongoDB database is still configured to only be accessible from *your development machine's IP address*.

That will need to be opened up to allow *any* IP address connections since Vercel will automatically assign random IP addresses to your deployed functions.

> **Note**: Because Vercel deploys in a serverless environment, it is not possible to determine a list of valid IP addresses. This is still considered a safe configuration, so long as a strong password and proper usage of database roles and users are in place.

Open up the MongoDB dashboard and navigate to the **Network Access** tab on the left-hand menu.

![img](https://prisma-blog-ebon.vercel.app/blog/posts/fullstack-mongodb-remix-prisma-5/mongodb-network.png)

Here you will find a green button labeled **ADD IP ADDRESS**. Click that and you will be shown the modal below.

![img](https://prisma-blog-ebon.vercel.app/blog/posts/fullstack-mongodb-remix-prisma-5/ip-modal.png)

In this modal, hit the **ALLOW ACCESS FROM ANYWHERE** button and then hit the green **Confirm** button at the bottom.

This will open up your database to connections from any IP address, allowing you to connect in a serverless setting managed by Vercel.

Now if you head back to your deployed application and attempt a sign in or sign up, you should now be able to complete the action successfully!

![img](https://prisma-blog-ebon.vercel.app/blog/posts/fullstack-mongodb-remix-prisma-5/success.gif)

## Summary & Final remarks

Congratulations! 🎉

![img](https://prisma-blog-ebon.vercel.app/blog/posts/fullstack-mongodb-remix-prisma-5/congrats.gif)

Throughout this series you:

- Took a dive into the features Prisma offers that allow you to easily work with a MongoDB database.
- Implemented end-to-end type safety thanks to Prisma and Remix.
- Built all of the app's React components and styled them with TailwindCSS.
- Configured an AWS S3 bucket to store images.
- Deployed your application with Vercel.

The main takeaway from this series is that setting up, building, and deploying an entire application is a very doable *(and enjoyable)* experience, as many of the tools available nowadays take care of a lot of the grunt-work for you and make the experience smooth and easy.

The source code for this project can be found on [GitHub](https://github.com/sabinadams/kudos-remix-mongodb-prisma/tree/part-4). Please feel free to raise an issue in the repository or submit a PR if you notice a problem.

If you have any questions, also feel free to reach out to me on [Twitter](https://twitter.com/sabinthedev).

[EDUCATION](https://www.prisma.io/blog/education)

### Don’t miss the next post!

Sign up for the Prisma Newsletter









[Building a REST API with NestJS and Prisma: AuthenticationMarch 31, 2023*10 min read*Welcome to the fifth tutorial in this series about building a REST API with NestJS, Prisma and PostgreSQL! In this tutorial, you will learn how to implement JWT authentication in your NestJS REST API.](https://www.prisma.io/blog/nestjs-prisma-authentication-7D056s1s0k3l)

[EDUCATION](https://www.prisma.io/blog/education)



[The Ultimate Guide to Testing with Prisma: CI PipelinesMarch 24, 2023Continuous Integration (CI) refers to the process of safely integrating code changes from various authors into a central repository. In this article, you will learn in more detail what a CI pipeline is, how to configure a CI pipeline and how to use that pipeline to automate your tests.](https://www.prisma.io/blog/testing-series-5-xWogenROXm)

[EDUCATION](https://www.prisma.io/blog/education)



[Building a REST API with NestJS and Prisma: Handling Relational DataMarch 23, 2023*8 min read*Welcome to the fourth tutorial in this series about building a REST API with NestJS, Prisma and PostgreSQL! In this tutorial, you will learn how to handle relational data in your NestJS REST API.](https://www.prisma.io/blog/nestjs-prisma-relational-data-7D056s1kOabc)

[EDUCATION](https://www.prisma.io/blog/education)

#### PRODUCT

[Client](https://www.prisma.io/client)[Migrate](https://www.prisma.io/migrate)[Data Browser](https://www.prisma.io/data-platform)[Data Proxy](https://www.prisma.io/data-platform/proxy)[Pricing](https://www.prisma.io/pricing)

#### DEVELOPERS

[Docs](https://www.prisma.io/docs)[Get Started](https://www.prisma.io/docs/getting-started)[Prisma Examples](https://github.com/prisma/prisma-examples)[Data Guide](https://www.prisma.io/dataguide)[Prisma in your Stack](https://www.prisma.io/stack)[Support](https://www.prisma.io/support)[Community](https://www.prisma.io/community)[Data Platform Status](https://www.prisma-status.com/)

#### USE CASES

[Customer Stories](https://www.prisma.io/showcase)[Enterprise](https://www.prisma.io/enterprise)

#### COMPANY

[About](https://www.prisma.io/about)[Blog](https://www.prisma.io/blog)[Careers](https://www.prisma.io/careers)[Events](https://www.prisma.io/events)[Causes](https://pris.ly/causes)[Terms & Privacy](https://pris.ly/privacy)

#### NEWSLETTER







![prisma_logo](https://prismalens.vercel.app/header/logo-dark.svg)

© 2023 Prisma Data, Inc.