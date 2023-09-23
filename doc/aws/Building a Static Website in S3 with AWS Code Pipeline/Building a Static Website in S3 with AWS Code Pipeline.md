![Cover image for Building a Static Website in S3 with AWS Code Pipeline](/Users/yongnan/Yandex.Disk.localized/Tecdoc/aws/Building a Static Website in S3 with AWS Code Pipeline/img/cnw5u7sj09qliyjlxf1k-7868050.png)

[![AWS Community Builders  profile image](/Users/yongnan/Yandex.Disk.localized/Tecdoc/aws/Building a Static Website in S3 with AWS Code Pipeline/img/88da75b6-aadd-4ea1-8083-ae2dfca8be94-7868050.png)](https://dev.to/aws-builders)[![Kaye Alvarado](/Users/yongnan/Yandex.Disk.localized/Tecdoc/aws/Building a Static Website in S3 with AWS Code Pipeline/img/498e844a-c38e-4cf9-b445-c3f3389dd32d-7868050.jpg)](https://dev.to/kayea)

[Kaye Alvarado](https://dev.to/kayea) for [AWS Community Builders](https://dev.to/aws-builders)

Posted on Aug 15, 2022 • Updated on Oct 21, 2022

![img](/Users/yongnan/Yandex.Disk.localized/Tecdoc/aws/Building a Static Website in S3 with AWS Code Pipeline/img/sparkle-heart-5f9bee3767e18deb1bb725290cb151c25234768a0e9a2bd39370c382d02920cf.svg)10![img](/Users/yongnan/Yandex.Disk.localized/Tecdoc/aws/Building a Static Website in S3 with AWS Code Pipeline/img/multi-unicorn-b44d6f8c23cdd00964192bedc38af3e82463978aa611b4365bd33a0f1f4f3e97.svg)4

# Building a Static Website in S3 with AWS Code Pipeline

[#aws](https://dev.to/t/aws)[#awscommunitybuilders](https://dev.to/t/awscommunitybuilders)[#s3](https://dev.to/t/s3)

## [Static Website in AWS (2 Part Series)](https://dev.to/kayea/series/20208)

[1Deploying a Static Website Infrastructure with GitHub Actions](https://dev.to/aws-builders/basics-of-hosting-a-static-website-in-aws-3ko0)[2Building a Static Website in S3 with AWS Code Pipeline](https://dev.to/aws-builders/hosting-static-websites-on-a-cloud-storage-l3j)

# Introduction

This is a write-up of a talk I did on the same topic for PWA Pilipinas and AWS Siklab Pilipinas last March 20, 2022. I talked about a few basic AWS services to build up the most common architecture of a static website namely: S3, CloudFront, Route53, ACM, and IAM.

<iframe width="710" height="399" src="https://www.youtube.com/embed/ajS_W6k8MY4" allowfullscreen="" loading="lazy" class=" fluidvids-elem" style="box-sizing: border-box; top: 0px; left: 0px; width: 636.391px; height: 357.625px; border: 0px; margin: 0px;"></iframe>

...aaaand, just in case you're still not aware: AWS launched a role-playing game called [Cloud Quest](https://explore.skillbuilder.aws/) in the skillbuilder website where building a static website is the first task!



## What is a Static Website?

**Static Websites** are nothing but a collection of lightweight static files (these can be html, css, javascript, image files), and these are served by a host to the web browser or the client accessing the site, *exactly* as they stored. Regardless if **user1** tries to access the homepage of the site (index.html), and **user2** tries to access the same, they will get exactly the same content. It’s static (does not change with conditions) as opposed to a dynamic website which can differ from user to user.
[![Image description](/Users/yongnan/Yandex.Disk.localized/Tecdoc/aws/Building a Static Website in S3 with AWS Code Pipeline/img/nyxitp4tts3hpsx1iqhm-7868050.png)](https://res.cloudinary.com/practicaldev/image/fetch/s--wZVuXVkR--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/nyxitp4tts3hpsx1iqhm.png)
Basic design of a static website is you have client browsers (it can either be from a computer, or mobile) accessing a domain ([www.example.com](http://www.example.com/)) and behind this domain, it points to a webserver that has the static files being requested by the client. So it’s served via HTTP/HTTPS.
In a cloud architecture, where things can be **serverless** and the user has no knowledge of the underlying server infrastructure, it would look something like this:
[![Image description](/Users/yongnan/Yandex.Disk.localized/Tecdoc/aws/Building a Static Website in S3 with AWS Code Pipeline/img/dym0v51k2668za6dor2r-7868050.png)](https://res.cloudinary.com/practicaldev/image/fetch/s--usT2SyuC--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/dym0v51k2668za6dor2r.png)

1. **Route53** is the DNS service of AWS and is extremely reliable and cost effective way to route end users to internet apps. It can translate names such as [www.example.com](http://www.example.com/) to the numeric IP such as 202.54.44.181 that computers use to talk to each other.
2. **Cloudfront** on the one hand is the *content delivery network* (CDN) service of AWS. It provides caching capabilities to improve performance. It stores frequently accessed files in the edge location (which is closer to the end user) so the content doesn’t have to be retrieved from the backend repeatedly.
3. **AWS Certificate Manager (ACM)** is a service that lets you easily provision, manage, and deploy public and private Secure Sockets Layer/Transport Layer Security (SSL/TLS) certificates for use with AWS services and your internal connected resources.
4. We also have **S3**. It’s an object storage service (it’s *AWS managed* meaning you don’t own the server maintenance). It provides high availability, scalability, security and performance. In this architecture, we'll deploy a React application which is popular framework for making dynamic web applications, but on this demo, we will execute the build process to generate *static files* for deployment.

# Building the Infrastructure Step-by-Step

## **Pre-Requisites**

1. Node
2. Git
3. AWS-CLI

## **Create the React App**

1. Run the following commands to create a working directory and create a boilerplate react application![Image description](/Users/yongnan/Yandex.Disk.localized/Tecdoc/aws/Building a Static Website in S3 with AWS Code Pipeline/img/il20hxyl2szp9z8xo71z-7868050.png)

   Once done, it will show up something like below:![Image description](/Users/yongnan/Yandex.Disk.localized/Tecdoc/aws/Building a Static Website in S3 with AWS Code Pipeline/img/evwpnw5ya7tco37qckeb-7868050.png)

2. Start the application locally![Image description](/Users/yongnan/Yandex.Disk.localized/Tecdoc/aws/Building a Static Website in S3 with AWS Code Pipeline/img/jn4fpiwk9oj5dx44kz1g-7868050.png)
   It will load up in a browser in your localhost![Image description](/Users/yongnan/Yandex.Disk.localized/Tecdoc/aws/Building a Static Website in S3 with AWS Code Pipeline/img/uv0vbyok3h7o9xzhq66k-7868050.png)
   Now you know it works!

3. To create the static files to deploy, run the following command![Image description](/Users/yongnan/Yandex.Disk.localized/Tecdoc/aws/Building a Static Website in S3 with AWS Code Pipeline/img/xhd15k215xr5r5mpamti-7868050.png)
   You should then see a build folder containing the static files![Image description](/Users/yongnan/Yandex.Disk.localized/Tecdoc/aws/Building a Static Website in S3 with AWS Code Pipeline/img/rejuvpwau2pxjcurgefw-7868050.png)![Image description](/Users/yongnan/Yandex.Disk.localized/Tecdoc/aws/Building a Static Website in S3 with AWS Code Pipeline/img/32jp01fnn59ovkrenf0a-7868050.png)![Image description](/Users/yongnan/Yandex.Disk.localized/Tecdoc/aws/Building a Static Website in S3 with AWS Code Pipeline/img/b5rhf48djhxuzv06z4qt-7868050.png)
   

## **Setup the DNS (Router53)**

1. In AWS Management Console, go to the Route53 service, and look for **Register domain**.![Image description](/Users/yongnan/Yandex.Disk.localized/Tecdoc/aws/Building a Static Website in S3 with AWS Code Pipeline/img/5l0n15q6oydc7xxiyfm8-7868050.png)**.com** are of course the ones that most sites use and looks legitimate, so if it's for a company/institution, you should always go for a .com.![Image description](/Users/yongnan/Yandex.Disk.localized/Tecdoc/aws/Building a Static Website in S3 with AWS Code Pipeline/img/ahvbrulhx1frvq3hl4m2-7868050.png)

2. Pay a minimal fee for privacy protection (this is only needed for .com websites)![Image description](/Users/yongnan/Yandex.Disk.localized/Tecdoc/aws/Building a Static Website in S3 with AWS Code Pipeline/img/zef7a1uw71b3bct9aodw-7868050.png)

3. Complete your order![Image description](/Users/yongnan/Yandex.Disk.localized/Tecdoc/aws/Building a Static Website in S3 with AWS Code Pipeline/img/6ajpszmb93yo1vjs8600-7868050.png)When you register a domain with Amazon Route 53 or you transfer domain registration to Route 53, AWS configure the domain to renew automatically. The automatic renewal period is typically one year, although the registries for some top-level domains (TLDs) have longer renewal periods.![Image description](/Users/yongnan/Yandex.Disk.localized/Tecdoc/aws/Building a Static Website in S3 with AWS Code Pipeline/img/3sr81si9abf8piszacpc-7868050.png)
   Your domain should show up under **Pending requests** first, then move to **Registered domains** once complete.![Image description](/Users/yongnan/Yandex.Disk.localized/Tecdoc/aws/Building a Static Website in S3 with AWS Code Pipeline/img/2nnb7ej8zsl16u1ott60-7868050.png)AWS will send you a confirmation email![Image description](/Users/yongnan/Yandex.Disk.localized/Tecdoc/aws/Building a Static Website in S3 with AWS Code Pipeline/img/g4yziuq1uqegomfav2vv-7868050.png)
   ...as well as an email validation![Image description](/Users/yongnan/Yandex.Disk.localized/Tecdoc/aws/Building a Static Website in S3 with AWS Code Pipeline/img/9hs9j2ag1qn6jufz89bi-7868050.png)
   Verification link will create a hosted zone. A hosted zone is an Amazon Route 53 concept. A **hosted zone** is analogous to a traditional DNS zone file; it represents a collection of records that can be managed together, belonging to a single parent domain name. All resource record sets within a hosted zone must have the hosted zone's domain name as a suffix.![Image description](/Users/yongnan/Yandex.Disk.localized/Tecdoc/aws/Building a Static Website in S3 with AWS Code Pipeline/img/wp97hhhv773tlsuvvrin-7868050.png)
   Verify will send another email and that completes the Domain setup!![Image description](/Users/yongnan/Yandex.Disk.localized/Tecdoc/aws/Building a Static Website in S3 with AWS Code Pipeline/img/0dftra5dy3l3h7elqj4f-7868050.png)
   It is not pointing to anything yet, so it will not load anything when you browse it![Image description](/Users/yongnan/Yandex.Disk.localized/Tecdoc/aws/Building a Static Website in S3 with AWS Code Pipeline/img/12sw62rahjf9wd6rxaks-7868050.png)


## **Create an S3 Bucket**

In the AWS management console, go to S3![Image description](/Users/yongnan/Yandex.Disk.localized/Tecdoc/aws/Building a Static Website in S3 with AWS Code Pipeline/img/2tf2ecxtgha1il924zjy-7868050.png)Create two buckets namely: **[www.girlwhocodes.click](http://www.girlwhocodes.click/)** and **girlwhocodes.click**. Create the first onw without www, and keep everything as default![Image description](/Users/yongnan/Yandex.Disk.localized/Tecdoc/aws/Building a Static Website in S3 with AWS Code Pipeline/img/k0cwmi09j71szxnz4ko7-7868050.png)
Once created, do the same steps for [www](http://www/).![Image description](/Users/yongnan/Yandex.Disk.localized/Tecdoc/aws/Building a Static Website in S3 with AWS Code Pipeline/img/x8i7ypbd8eayy9iz5igc-7868050.png)We should now have two buckets:![Image description](/Users/yongnan/Yandex.Disk.localized/Tecdoc/aws/Building a Static Website in S3 with AWS Code Pipeline/img/z8nvwpq982sy659mnjwr-7868050.png)

## Create an IAM user

1. **Create an IAM user for AWS-CLI** We need to create an IAM user since the files will be uploaded using AWS-CLI. There's also an option to upload the files directly to S3 via the AWS management console, but this will demo the AWS-CLI option.

2. Go to IAM service![Image description](/Users/yongnan/Yandex.Disk.localized/Tecdoc/aws/Building a Static Website in S3 with AWS Code Pipeline/img/dytr9erzc51kxyt61zp4-7868050.png)Follow the wizard to create a user![Image description](/Users/yongnan/Yandex.Disk.localized/Tecdoc/aws/Building a Static Website in S3 with AWS Code Pipeline/img/74mw7zxft9teshuda5hq-7868050.png)Attach an AdministratorAccess to keep it simple![Image description](/Users/yongnan/Yandex.Disk.localized/Tecdoc/aws/Building a Static Website in S3 with AWS Code Pipeline/img/9h2bt0e16x1bdgel1p7o-7868050.png)
   Tags are optional
   ![Image description](/Users/yongnan/Yandex.Disk.localized/Tecdoc/aws/Building a Static Website in S3 with AWS Code Pipeline/img/8264yta1m2ixr122zdjj-7868050.png)

3. Complete the wizard..., 
  and click the new user => Security credentials, click Create access key

  ![2023-06-28_11-06-31](/Users/yongnan/Yandex.Disk.localized/Tecdoc/aws/Building a Static Website in S3 with AWS Code Pipeline/img/2023-06-28_11-06-31.png)


  ![Image description](/Users/yongnan/Yandex.Disk.localized/Tecdoc/aws/Building a Static Website in S3 with AWS Code Pipeline/img/2023-06-28_11-15-17.png)

4. Set up the user in your local machine by configuring the AWS Access Key ID and AWS Secret Access Key of your user![Image description](/Users/yongnan/Yandex.Disk.localized/Tecdoc/aws/Building a Static Website in S3 with AWS Code Pipeline/img/fxxols7m3ljg6jcdpgc4-7868050.png)


Test out the access by running any AWS-CLI command![Image description](/Users/yongnan/Yandex.Disk.localized/Tecdoc/aws/Building a Static Website in S3 with AWS Code Pipeline/img/klhw384xowmgt1j3x1v3-7868050.png)

## Upload the Static Files to S3

1. Run the s3 sync command to copy your local React build files to the s3 bucket![Image description](/Users/yongnan/Yandex.Disk.localized/Tecdoc/aws/Building a Static Website in S3 with AWS Code Pipeline/img/1q681uyswe1dfr6btjev-7868050.png)

2. You can then verify in the AWS management console if the files were uploaded![Image description](/Users/yongnan/Yandex.Disk.localized/Tecdoc/aws/Building a Static Website in S3 with AWS Code Pipeline/img/txgck4ut9iqsxh98h2it-7868050.png)**Update the S3 bucket permissions and Enable for Static Website Hosting**![Image description](/Users/yongnan/Yandex.Disk.localized/Tecdoc/aws/Building a Static Website in S3 with AWS Code Pipeline/img/33i08sfikvi9llfcouoe-7868050.png)


## Public access

1. By default, AWS blocks public access to your S3 bucket. AWS recommends that you block all public access to your buckets.
   ![Image description](/Users/yongnan/Yandex.Disk.localized/Tecdoc/aws/Building a Static Website in S3 with AWS Code Pipeline/img/apno28u19w075cfszswb-7868050.png)

2. For simplicity, we'll keep the s3 bucket accessible. The update will prompt for a confirmation that this is what you want to do.
   ![Image description](/Users/yongnan/Yandex.Disk.localized/Tecdoc/aws/Building a Static Website in S3 with AWS Code Pipeline/img/k25ondv8quik91w5et0s-7868050.png)
   Tada!
   ![Image description](/Users/yongnan/Yandex.Disk.localized/Tecdoc/aws/Building a Static Website in S3 with AWS Code Pipeline/img/ki0jtm68z7c1yzo0it1h-7868050.png)

3. To make the objects in your bucket publicly readable, write a bucket policy that grants everyone s3:GetObject permission.
   ![Image description](/Users/yongnan/Yandex.Disk.localized/Tecdoc/aws/Building a Static Website in S3 with AWS Code Pipeline/img/4xcbln26kihwgnmn36dd-7868050.png)


## Enable static website hosting

1. Enable the bucket for static website hosting (choose Enable)![Image description](/Users/yongnan/Yandex.Disk.localized/Tecdoc/aws/Building a Static Website in S3 with AWS Code Pipeline/img/ctbk65ttpf0oqusfgdfz-7868050.png)
   In index document, enter the filename of the home page, typically index.html.![Image description](/Users/yongnan/Yandex.Disk.localized/Tecdoc/aws/Building a Static Website in S3 with AWS Code Pipeline/img/k25gh4kxt6peghhoh235-7868050.png)
   Note: For non-wwww, since we don't want to maintain 2 copies of the files, select **Redirect requests for an object**

2. To quickly test this, click on the index.html file in your bucket. In the properties section, you can see an object endpoint.![Image description](/Users/yongnan/Yandex.Disk.localized/Tecdoc/aws/Building a Static Website in S3 with AWS Code Pipeline/img/wuhr5qzcqczzq1ezzq83-7868050.png)The **endpoint** is the Amazon S3 website endpoint for your bucket object. Clicking on the endpoint will load up the page in a browser.![Image description](/Users/yongnan/Yandex.Disk.localized/Tecdoc/aws/Building a Static Website in S3 with AWS Code Pipeline/img/sb8jpoibvvhuemzyjbm1-7868050.png)**More Domain Configurations!**


## DNS redirect

1. Add an A record to S3. Click on hosted zone:![Image description](/Users/yongnan/Yandex.Disk.localized/Tecdoc/aws/Building a Static Website in S3 with AWS Code Pipeline/img/u93o97sw5246j6t4kpjk-7868050.png)By default, you should have an NS and an SOA record.![Image description](/Users/yongnan/Yandex.Disk.localized/Tecdoc/aws/Building a Static Website in S3 with AWS Code Pipeline/img/fwoq9ddj87zuwsfol17j-7868050.png)An NS (name server) record indicates which DNS server is authoritative for that domain (i.e. which server contains the actual DNS records). Basically, NS records tell the Internet where to go to find out a domain's IP address. An SOA (start of authority) record stores important information about a domain or zone such as the email address of the administrator, when the domain was last updated, and how long the server should wait between refreshes. All DNS zones need an SOA record in order to conform to IETF standards. Proceed to create the www "A record" and route this to S3.![Image description](/Users/yongnan/Yandex.Disk.localized/Tecdoc/aws/Building a Static Website in S3 with AWS Code Pipeline/img/j8x1devoug6izqmclaza-7868050.png)

2. Add another "A record" for the non-www domain![Image description](/Users/yongnan/Yandex.Disk.localized/Tecdoc/aws/Building a Static Website in S3 with AWS Code Pipeline/img/dzfc5zisyf2qj51iejbn-7868050.png)Once done, you should now have the following records![Image description](/Users/yongnan/Yandex.Disk.localized/Tecdoc/aws/Building a Static Website in S3 with AWS Code Pipeline/img/i59uk8kfyk5twqhk4saj-7868050.png)
   Since your domain now points to S3, it should already load once viewed from a browser![Image description](/Users/yongnan/Yandex.Disk.localized/Tecdoc/aws/Building a Static Website in S3 with AWS Code Pipeline/img/9hbgqht0tykq2wlvduj3-7868050.png)
   You should note that this website is served from AmazonS3 when you view the response headers for Server.![Image description](/Users/yongnan/Yandex.Disk.localized/Tecdoc/aws/Building a Static Website in S3 with AWS Code Pipeline/img/23w01v8rlf9xnvzosbuc-7868050.png)


## Add TLS certificate (ACM)

1. Since this website is unsecure, we also need to setup CloudFront and attach a TLS certificate. **Request a Public Certificate in ACM**

2. Go to the ACM service. Make sure to request or import the certificate in the US East (N.Virginia) region.![Image description](/Users/yongnan/Yandex.Disk.localized/Tecdoc/aws/Building a Static Website in S3 with AWS Code Pipeline/img/f4tremkpr3nuqlismeb8-7868050.png)

3. Follow the wizard to request a public certificate![Image description](/Users/yongnan/Yandex.Disk.localized/Tecdoc/aws/Building a Static Website in S3 with AWS Code Pipeline/img/87qaj9ictgh2stlr4f2u-7868050.png)Add both www and non-www in the fully qualified domain names![Image description](/Users/yongnan/Yandex.Disk.localized/Tecdoc/aws/Building a Static Website in S3 with AWS Code Pipeline/img/nsvngn80vltxifkj80nm-7868050.png)

4. Choose DNS validation as the validation method because it is easier. Tags can be skipped, then click on Request.![Image description](/Users/yongnan/Yandex.Disk.localized/Tecdoc/aws/Building a Static Website in S3 with AWS Code Pipeline/img/pgfsuljplkojtiys53gf-7868050.png)It will bring you to this page showing **pending validation**. Click on create records.![Image description](/Users/yongnan/Yandex.Disk.localized/Tecdoc/aws/Building a Static Website in S3 with AWS Code Pipeline/img/0kpeu05f4ub6lte7az1p-7868050.png)The **canonical name (CNAME)** record is used in lieu of an A record, when a domain or subdomain is an alias of another domain. A CNAME Record is used in the Domain Name System (DNS) to create an alias from one domain name to another domain name.

5. From ACM, you can simply click on **Create records in Route53** to automatically add the CNAME records without having to copy and paste them there.![Image description](/Users/yongnan/Yandex.Disk.localized/Tecdoc/aws/Building a Static Website in S3 with AWS Code Pipeline/img/3a9w35uyvy937h83l093-7868050.png)
   If you open Route53, those records should have been added.![Image description](/Users/yongnan/Yandex.Disk.localized/Tecdoc/aws/Building a Static Website in S3 with AWS Code Pipeline/img/nh40v43zceit2evryg8y-7868050.png)
   In ACM, the certificate state should change from **Pending Validation** to **Issued**. **Setup CloudFront**


## Create a CloudFront distribution

1. Go to AWS Console and click on CloudFront![Image description](/Users/yongnan/Yandex.Disk.localized/Tecdoc/aws/Building a Static Website in S3 with AWS Code Pipeline/img/ttdmu0f9ipzgwuys5akk-7868050.png)

2. Add the details in the wizard. Origin in the source of the distribution, so add the S3 path there.![Image description](/Users/yongnan/Yandex.Disk.localized/Tecdoc/aws/Building a Static Website in S3 with AWS Code Pipeline/img/85kvx1fp0an9ve0tw3ie-7868050.png)
   Note that we need two distributions (one for www and one for non-www).

3. Add the CNAME record
   ![Image description](/Users/yongnan/Yandex.Disk.localized/Tecdoc/aws/Building a Static Website in S3 with AWS Code Pipeline/img/zbvnfgyr3vw2gw5z9ic8-7868050.png)

4. In the same wizard, add the ACM certificate
   ![Image description](/Users/yongnan/Yandex.Disk.localized/Tecdoc/aws/Building a Static Website in S3 with AWS Code Pipeline/img/2dhotfapwhfqi85qa2z1-7868050.png)
   Also, select redirect http to https. Everything else should be default so click on **Create distribution**.![Image description](/Users/yongnan/Yandex.Disk.localized/Tecdoc/aws/Building a Static Website in S3 with AWS Code Pipeline/img/q95uub2lnu0jugxuivcs-7868050.png)
   Do the same steps for the non-www domain![Image description](/Users/yongnan/Yandex.Disk.localized/Tecdoc/aws/Building a Static Website in S3 with AWS Code Pipeline/img/vogg4qbrjesdtuyw04ka-7868050.png)If you reload the page in a browser, you'll see that content is being served by S3, but there's a response header saying it's now via a CloudFront distribution.![Image description](/Users/yongnan/Yandex.Disk.localized/Tecdoc/aws/Building a Static Website in S3 with AWS Code Pipeline/img/dpchsfkszlli3e8h367n-7868050.png)

5. Update the Route53 www and non-www records to point now to CloudFront![Image description](/Users/yongnan/Yandex.Disk.localized/Tecdoc/aws/Building a Static Website in S3 with AWS Code Pipeline/img/td41mzab3ey3dkdq7tsn-7868050.png)When you reload the page, it will now show as secure![Image description](/Users/yongnan/Yandex.Disk.localized/Tecdoc/aws/Building a Static Website in S3 with AWS Code Pipeline/img/sm5o9cbzvv0hwgq5244i-7868050.png)
   If you do any file changes in S3 and it doesn't load in the browser, it's because CloudFront is service cached content. Invalidate it to force it to pull again from S3.![Image description](/Users/yongnan/Yandex.Disk.localized/Tecdoc/aws/Building a Static Website in S3 with AWS Code Pipeline/img/ca8n0h0adanlvelg67ha.png)

# Create a Deployment Pipeline (Extra!)

As a DevOps Engineer, I have to discuss more about pipelines so we'll explore more about Code Pipeline which is another AWS service.

## create Code Pipeline

1. Create a pipeline in Code Pipeline. Go through the wizard mostly with defaults. Also create a new service role.![Image description](/Users/yongnan/Yandex.Disk.localized/Tecdoc/aws/Building a Static Website in S3 with AWS Code Pipeline/img/qznvfemqke2mfuzhdexr.png)
   Select the following options![Image description](/Users/yongnan/Yandex.Disk.localized/Tecdoc/aws/Building a Static Website in S3 with AWS Code Pipeline/img/sx6bg79136ojn3f26lyl.png)

## Add source stage

1. For the source stage, since I've setup my code in GitHub, I will set it as my source![Image description](/Users/yongnan/Yandex.Disk.localized/Tecdoc/aws/Building a Static Website in S3 with AWS Code Pipeline/img/vyf1v77wvmeixpjqyoiq.png)
2. We also need to setup a connection to GitHub![Image description](/Users/yongnan/Yandex.Disk.localized/Tecdoc/aws/Building a Static Website in S3 with AWS Code Pipeline/img/130ixrbkot837ckn0225.png)Select GitHub here![Image description](/Users/yongnan/Yandex.Disk.localized/Tecdoc/aws/Building a Static Website in S3 with AWS Code Pipeline/img/9c8z0yc0spcatpyr7k0e.png)Add a name to the connection and click on Connect![Image description](/Users/yongnan/Yandex.Disk.localized/Tecdoc/aws/Building a Static Website in S3 with AWS Code Pipeline/img/dtbt20fdfork6ie8cacs.png)
   There should be a one-time setup for the verification of the connection![Image description](/Users/yongnan/Yandex.Disk.localized/Tecdoc/aws/Building a Static Website in S3 with AWS Code Pipeline/img/3glv56besnha6dq5vgn5.png)Select the repositories that you want to allow AWS access to![Image description](/Users/yongnan/Yandex.Disk.localized/Tecdoc/aws/Building a Static Website in S3 with AWS Code Pipeline/img/eqme1h1u3j2sw9snlfjq.png)
   It should set up a code for you, then click on Connect to complete the wizard![Image description](/Users/yongnan/Yandex.Disk.localized/Tecdoc/aws/Building a Static Website in S3 with AWS Code Pipeline/img/buw614zggxrpsrzz98dg.png)
3. Proceed to the other steps of the wizard![Image description](/Users/yongnan/Yandex.Disk.localized/Tecdoc/aws/Building a Static Website in S3 with AWS Code Pipeline/img/xebnr1hgqm75bcncrqji.png)
   Note: I skipped the build stage for now since I am building the files locally.

## Add build stage

1. ![Image description](/Users/yongnan/Yandex.Disk.localized/Tecdoc/aws/Building a Static Website in S3 with AWS Code Pipeline/img/ft2cn22pwgn2ilwjd571.png)

## Add deploy stage

1. In the deploy stage, select Amazon S3 as the provider![Image description](/Users/yongnan/Yandex.Disk.localized/Tecdoc/aws/Building a Static Website in S3 with AWS Code Pipeline/img/mghr9ek5jee3bp1yrx5g.png)
2. Review the pipeline in the final step![Image description](/Users/yongnan/Yandex.Disk.localized/Tecdoc/aws/Building a Static Website in S3 with AWS Code Pipeline/img/bqikeflk8ex45dulst22.png)
   Then create!
   ![Image description](/Users/yongnan/Yandex.Disk.localized/Tecdoc/aws/Building a Static Website in S3 with AWS Code Pipeline/img/h92w46y1eldrk3z6u1ge.png)
   The pipeline will be created, but will show up with red marks![Image description](/Users/yongnan/Yandex.Disk.localized/Tecdoc/aws/Building a Static Website in S3 with AWS Code Pipeline/img/7t6dcxsy05dg3j1kx9ju.png)If you click the error, it shows the reason that the S3 bucket does not allow ACLs yet![Image description](/Users/yongnan/Yandex.Disk.localized/Tecdoc/aws/Building a Static Website in S3 with AWS Code Pipeline/img/6bakaqzvdro9pxgv2lc0.png)
   This can be edited in S3 via the Management Console![Image description](/Users/yongnan/Yandex.Disk.localized/Tecdoc/aws/Building a Static Website in S3 with AWS Code Pipeline/img/vi0mk0y026lwryg8fzmm.png)
   ...and clear up the red marks in the pipeline![Image description](/Users/yongnan/Yandex.Disk.localized/Tecdoc/aws/Building a Static Website in S3 with AWS Code Pipeline/img/iodwu6gv2gdk5jpnjblg.png)

## Test the Pipeline

1. Update the files of your static website with something as simple as updating the paragraph![Image description](/Users/yongnan/Yandex.Disk.localized/Tecdoc/aws/Building a Static Website in S3 with AWS Code Pipeline/img/qd4ou8ibwpd9v07fk3eo.png)
2. Test the change locally
   ![Image description](/Users/yongnan/Yandex.Disk.localized/Tecdoc/aws/Building a Static Website in S3 with AWS Code Pipeline/img/nzgl19mit6ai8a55p7p2.png)
3. Run `npm build` to create new static files![Image description](/Users/yongnan/Yandex.Disk.localized/Tecdoc/aws/Building a Static Website in S3 with AWS Code Pipeline/img/iw1trl922d40m8g5zgj1.png)
4. Push the code in GitHub![Image description](/Users/yongnan/Yandex.Disk.localized/Tecdoc/aws/Building a Static Website in S3 with AWS Code Pipeline/img/j63x67mricm12e2442v3.png)
5. The pipeline should get triggered with the push action![Image description](/Users/yongnan/Yandex.Disk.localized/Tecdoc/aws/Building a Static Website in S3 with AWS Code Pipeline/img/72z1t0rkbw9tvqp14gy2.png)
6. The files will be uploaded to S3![Image description](/Users/yongnan/Yandex.Disk.localized/Tecdoc/aws/Building a Static Website in S3 with AWS Code Pipeline/img/4navpqutvh02ca6otzmk.png)
7. Invalidate the distribution cache again to see the changes reflect![Image description](/Users/yongnan/Yandex.Disk.localized/Tecdoc/aws/Building a Static Website in S3 with AWS Code Pipeline/img/2xhef2n3cu1mt5bbi7r6.png)
    This now completes the static website architecture with a pipeline for continuous deployment!![Image description](/Users/yongnan/Yandex.Disk.localized/Tecdoc/aws/Building a Static Website in S3 with AWS Code Pipeline/img/8z6sahhy43fwwmb2cdav.png)

There is a [Part 2](https://dev.to/aws-builders/basics-of-hosting-a-static-website-in-aws-3ko0) of this article that I wrote where the manual process of the architecture build-up is done with Terraform Code. Follow the link if you want to check that out!

# [Static Website in AWS (2 Part Series)](https://dev.to/kayea/series/20208)

[1Deploying a Static Website Infrastructure with GitHub Actions](https://dev.to/aws-builders/basics-of-hosting-a-static-website-in-aws-3ko0)[2Building a Static Website in S3 with AWS Code Pipeline](https://dev.to/aws-builders/hosting-static-websites-on-a-cloud-storage-l3j)