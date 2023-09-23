# Remix Deployment with Architecture

## Remix deployment

```
npx create-remix --template remix-run/grunge-stack
```

## AWS secrets

add your **AWS_ACCESS_KEY_ID** and **AWS_SECRET_ACCESS_KEY** to your repo’s secrets. 

![br3](https://images.ctfassets.net/zojzzdop0fzx/4ZeTn3zgTBlmOQMlr2FD5Q/f57a3bae564d3c165fee89c337fdcf6f/br3.JPG)

## GitHub secrets

![br2](https://images.ctfassets.net/zojzzdop0fzx/19fAy4hIxXxVkRIe0Wn7yl/44c21abf5bd30c4183c390c92456768b/br2.JPG)

## AWS cli

* installation cli

```
curl "https://awscli.amazonaws.com/AWSCLIV2.pkg" -o "AWSCLIV2.pkg"
sudo installer -pkg AWSCLIV2.pkg -target /
```

- Create an [AWS credentials file](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-quickstart.html#getting-started-quickstart-new).

```
$ ``aws configure` 
`AWS Access Key ID [None]: AKIAIOSFODNN7EXAMPLE 
AWS Secret Access Key [None]: wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY 
Default region name [None]: us-west-2 
Default output format [None]: json
```

## ARC

***Adding env variables\***

```bash
npx arc env --add --env staging ARC_APP_SECRET $(openssl rand -hex 32)
npx arc env --add --env staging SESSION_SECRET $(openssl rand -hex 32)
npx arc env --add --env production ARC_APP_SECRET $(openssl rand -hex 32)
npx arc env --add --env production SESSION_SECRET $(openssl rand -hex 32)
```

If you don't have openssl installed, you can also use [1password](https://1password.com/password-generator) to generate a random secret, just replace `$(openssl rand -hex 32)` with the generated secret.

display all env:

```
npx arc env 
```





```
npx arc deploy
or
npx arc deploy —-dry-run
```



## Where do I find my CloudFormation?

You can find the CloudFormation template that Architect generated for you in the sam.yaml file.

To find it on AWS, you can search for [CloudFormation](https://console.aws.amazon.com/cloudformation/home) (make sure you're looking at the correct region!) and find the name of your stack (the name is a PascalCased version of what you have in `app.arc`, so by default it's RemixArchitectGrunge4127Staging and RemixArchitectGrunge4127Production) that matches what's in `app.arc`, you can find all of your app's resources under the "Resources" tab.

## GitHub Actions

We use GitHub Actions for continuous integration and deployment. Anything that gets into the `main` branch will be deployed to production after running tests/build/etc. Anything in the `dev` branch will be deployed to staging.



##  Issues I Had in My Own Project

 That was easy, since it created a lambda, API gateway, and bucket based on the items in my arc file.
