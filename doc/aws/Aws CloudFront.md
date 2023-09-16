# Aws CloudFront

## Step 1: Upload your content to Amazon S3 and grant object permissions

**To upload your content to Amazon S3 and grant read permissions to everyone**

1. Sign in to the AWS Management Console and open the Amazon S3 console at https://console.aws.amazon.com/s3/.

2. Choose **Create bucket**.

3. For **Bucket name**, enter a bucket name.

   

   ###### Important

   For your bucket to work with CloudFront, the name must conform to DNS naming requirements. For more information, see [Bucket restrictions and limitations](https://docs.aws.amazon.com/AmazonS3/latest/dev/BucketRestrictions.html) in the *Amazon Simple Storage Service User Guide*.

4. For **Region**, choose an AWS Region for your bucket. We recommend that you choose a Region close to you to optimize latency and minimize costs, or you might choose another Region to address regulatory requirements.

5. In the **Block Public Access settings for bucket** section, clear the check box for **Block \*all\* public access**.

   You must allow public read access to the bucket and files so that CloudFront URLs can serve content from the bucket. However, you can restrict access to specific content by using the CloudFront private content feature. For more information, see [Serving private content with signed URLs and signed cookies](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/PrivateContent.html).

   Select the check box for **I acknowledge that the current settings might result in this bucket and the objects within becoming public.**.

6. Leave all other settings at their defaults, and then choose **Create bucket**.

7. (Optional) If you don’t have your own website content, or if you just want to experiment with CloudFront before uploading your own content, use the following link to download a simple *hello world* webpage: [hello-world-html.zip](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/samples/hello-world-html.zip).

8. In the **Buckets** section, choose your new bucket, and then choose **Upload**.

9. Use the **Upload** page to add your content to the S3 bucket. If you downloaded the simple *hello world* webpage, add the `index.html` file and the `css` folder (with the `style.css` file inside it).

10. Choose **Additional upload options** to expand the section.

11. In the **Access control list (ACL)** section, select the check box for **Read** next to **Everyone (public access)** in the **Objects** column.

12. Select the check box for **I understand the effects of these changes on the specified objects.**

13. At the bottom of the page, choose **Upload**.

    After the upload is complete, you can navigate to the item by using its URL. For example:

    ```
    https://<bucket name>.s3-<AWS Region>.amazonaws.com/<object name>
    ```

    Replace `<bucket name>`, `<AWS Region>`, and `<object name>` with the appropriate values based on your bucket and content. If you used the simple *hello world* website in this procedure, replace `<object name>` with `index.html`.

    

    ###### Note

    If you created the bucket in the US East (N. Virginia) Region (us-east-1), omit the `<AWS Region>` portion of the URL. For example:

    ```
    https://<bucket name>.s3.amazonaws.com/<object name>
    ```

    Use the Amazon S3 URL to verify that your content is publicly accessible, but remember that this is not the URL you’ll use to access your content with CloudFront.

## Step 2: Create a CloudFront distribution



###### To create a CloudFront distribution

1. Open the CloudFront console at https://console.aws.amazon.com/cloudfront/v3/home.

2. Choose **Create distribution**.

3. Under **Origin**, for **Origin domain**, choose the Amazon S3 bucket that you created earlier.

   For the other settings under **Origin**, accept the default values.

4. For the settings under **Default cache behavior**, accept the default values.

   For more information about cache behavior options, see [Cache behavior settings](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/distribution-web-values-specify.html#DownloadDistValuesCacheBehavior).

5. For the remainder of **Settings**, accept the default values.

   For more information about these options, see [Distribution settings](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/distribution-web-values-specify.html#DownloadDistValuesGeneral).

6. At the bottom of the page, choose **Create distribution**.

7. After CloudFront creates your distribution, the value of the **Status** column for your distribution changes from **In Progress** to **Deployed**. This typically takes a few minutes.

   Record the domain name that CloudFront assigns to your distribution, which appears in the list of distributions. (It also appears on the **General** tab for a selected distribution.) It looks similar to the following: `d111111abcdef8.cloudfront.net`.

## Step 3: Access your content through CloudFront

To access your content through CloudFront, combine your CloudFront distribution domain name with the path to access your content. For example, your distribution domain name looks similar to the following: `d111111abcdef8.cloudfront.net`. Traditionally, the path to access the main page of a website is `/index.html`. 

```
https://d111111abcdef8.cloudfront.net/index.html
```