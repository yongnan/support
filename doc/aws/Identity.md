# Identity

## Managing access keys (AWS CLI)

To manage the IAM user access keys from the AWS CLI, run the following commands.

- To create an access key: [`aws iam create-access-key`](https://docs.aws.amazon.com/cli/latest/reference/iam/create-access-key.html)
- To deactivate or activate an access key: [`aws iam update-access-key`](https://docs.aws.amazon.com/cli/latest/reference/iam/update-access-key.html)
- To list a user's access keys: [`aws iam list-access-keys`](https://docs.aws.amazon.com/cli/latest/reference/iam/list-access-keys.html)
- To determine when an access key was most recently used: [`aws iam get-access-key-last-used`](https://docs.aws.amazon.com/cli/latest/reference/iam/get-access-key-last-used.html)
- To delete an access key: [`aws iam delete-access-key`](https://docs.aws.amazon.com/cli/latest/reference/iam/delete-access-key.html)

## Managing access keys (AWS API)

To manage the access keys of an IAM user from the AWS API, call the following operations.

- To create an access key: [`CreateAccessKey`](https://docs.aws.amazon.com/IAM/latest/APIReference/API_CreateAccessKey.html)
- To deactivate or activate an access key: [`UpdateAccessKey`](https://docs.aws.amazon.com/IAM/latest/APIReference/API_UpdateAccessKey.html)
- To list a user's access keys: [`ListAccessKeys`](https://docs.aws.amazon.com/IAM/latest/APIReference/API_ListAccessKeys.html)
- To determine when an access key was most recently used: [`GetAccessKeyLastUsed`](https://docs.aws.amazon.com/IAM/latest/APIReference/API_GetAccessKeyLastUsed.html)
- To delete an access key: [`DeleteAccessKey`](https://docs.aws.amazon.com/IAM/latest/APIReference/API_DeleteAccessKey.html)

## Auditing access keys

You can pass an access key ID using 

the [`aws sts get-access-key-info`](https://docs.aws.amazon.com/cli/latest/reference/sts/get-access-key-info.html) AWS CLI command 

or

 the [`GetAccessKeyInfo`](https://docs.aws.amazon.com/STS/latest/APIReference/API_GetAccessKeyInfo.html) AWS API operation.

# How IAM works

![       IntroToIAM_Diagram     ](https://docs.aws.amazon.com/images/IAM/latest/UserGuide/images/intro-diagram%20_policies_800.png)

## Authentication

* To authenticate from the console as a root user, you must sign in with your email address and password. 
* As a federated user, you are authenticated by your identity provider and granted access to AWS resources by assuming IAM roles. 
* As an IAM user, provide your account ID or alias, and then your user name and password. 
* To authenticate workloads from the API or AWS CLI, you might use temporary credentials through being assigned a role or you might use long-term credentials by providing your access key and secret key.





