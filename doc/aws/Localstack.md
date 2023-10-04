# Localstack

# Installation

## Localstack cli

**Xcode Commnad Line Tools**

 https://developer.apple.com/download/all/.

You should download the Command Line Tools for Xcode 13.2.1.

https://download.developer.apple.com/Developer_Tools/Command_Line_Tools_for_Xcode_14.3.1/Command_Line_Tools_for_Xcode_14.3.1.dmg

```
brew install localstack/tap/localstack-cli
```

o verify that the LocalStack CLI was installed correctly, you can check the version in your terminal:

```text
$ localstack --version
2.2.0
```

## Docker

You can start the Docker container simply by executing the following `docker run` command:

```shell
docker run \
  --rm -it \
  -p 4566:4566 \
  -p 4510-4559:4510-4559 \
  localstack/localstackCopy
```

## Docker-compose

`docker-compose.yml`

```yaml
version: "3.8"

services:
  localstack:
    container_name: "${LOCALSTACK_DOCKER_NAME-localstack_main}"
    image: localstack/localstack
    ports:
      - "127.0.0.1:4566:4566"            # LocalStack Gateway
      - "127.0.0.1:4510-4559:4510-4559"  # external services port range
    environment:
      - DEBUG=${DEBUG-}
      - DOCKER_HOST=unix:///var/run/docker.sock
    volumes:
      - "${LOCALSTACK_VOLUME_DIR:-./volume}:/var/lib/localstack"
      - "/var/run/docker.sock:/var/run/docker.sock"
```



, add:

><pre>
>	vlolumes:
>		- "$PWD/init-aws.sh:/etc/localstack/init/ready.d/init-aws.sh"  # ready hook
></pre>

add `init-aws.sh`

```bash
#!/bin/bash

awslocal dynamodb create-table \
    --table-name table-global \
    --attribute-definitions AttributeName=id,AttributeType=S \
    --key-schema AttributeName=id,KeyType=HASH \
    --provisioned-throughput ReadCapacityUnits=5,WriteCapacityUnits=5

awslocal dynamodb create-table \
    --table-name Music \
    --attribute-definitions \
       AttributeName=Artist,AttributeType=S \
       AttributeName=SongTitle,AttributeType=S \
    --key-schema \
       AttributeName=Artist,KeyType=HASH \
       AttributeName=SongTitle,KeyType=RANGE \
    --provisioned-throughput \
       ReadCapacityUnits=10,WriteCapacityUnits=5   

awslocal --endpoint-url=http://localhost:4566 dynamodb put-item \
    --table-name Music  \
    --item \
       '{"Artist": {"S": "No One You Know"}, "SongTitle": {"S": "Call Me Today"}, "AlbumTitle": {"S": "Somewhat Famous"}, "Awards": {"N": "1"}}'        
```

then

```
chmod +x init-aws.sh
```

 validate this via the following command:

```bash
$ curl -s localhost:4566/_localstack/init/ready    
or 
$ awslocal dynamodb list-tables
{
    "TableNames": [
        "Music",
        "table-global"
    ]
}
```

```
docker-compose up
```

# Integrations

## AWS Command Line

`~/.aws/config`

```
[profile localstack]
region = ap-northeast-1
output = json

[profile featuredev]
region = eu-north-1
output = json

[profile staging]
region = eu-central-1
output = json

[profile prod]
region = eu-west-2
output = json

[default]
region = ap-northeast-1
output = json
```

`~/.aws/credentials`

```
[localstack]
<<<<<<< HEAD
aws_access_key_id = 000000000000
=======
aws_access_key_id = 
>>>>>>> 4c77056a3e0716d2e3ab77a4e099c5d2c5ccadf9
aws_secret_access_key = 

[featuredev]
aws_access_key_id = 
aws_secret_access_key = 
AWS_ROLE_ARN = arn:aws:iam::767873598297:role/cdk-hnb659fds-deploy-role-767873598297-eu-central-1

[staging]
aws_access_key_id = 
aws_secret_access_key = 

[prod]
aws_access_key_id = 
aws_secret_access_key = 

[default]
<<<<<<< HEAD
aws_access_key_id = 000000000000
=======
aws_access_key_id = 
>>>>>>> 4c77056a3e0716d2e3ab77a4e099c5d2c5ccadf9
aws_secret_access_key = test
```



```
<<<<<<< HEAD
export AWS_ACCESS_KEY_ID="000000000000"
=======
export AWS_ACCESS_KEY_ID=""
>>>>>>> 4c77056a3e0716d2e3ab77a4e099c5d2c5ccadf9
export AWS_SECRET_ACCESS_KEY="test"
export AWS_DEFAULT_REGION="ap-northeast-1"

aws --endpoint-url=http://localhost:4566 kinesis list-streams
```

```
brew install python
pip3 install awscli-local
```

**usage**

```
 awslocal kinesis list-streams
 awslocal sqs list-queues
```



# Doc

https://docs.localstack.cloud/overview/

# Tutorial

## Deploying a Sample App

The CDK command line ships with a sample app generator to run a quick test for getting started:

```
$ mkdir /tmp/test; cd /tmp/test
$ cdklocal init sample-app --language=javascript
...
```

Make sure that LocalStack is installed and started up with the required services:

```
$ SERVICES=serverless,sqs,sns localstack start
```



Then deploy the sample app against the local APIs via the `cdklocal` command line:

```
$ cdklocal deploy
...
Do you wish to deploy these changes (y/n)? y
...
Stack ARN:
arn:aws:cloudformation:us-east-1:000000000000:stack/TestStack/e3debc0a-311e-4968-8230-ed78f89cb614
```

Once the deployment is done, you can inspect the created resources via the [`awslocal`](https://github.com/localstack/awscli-local) command line:

```
$ awslocal sns list-topics
{
    "Topics": [
        {
            "TopicArn": "arn:aws:sns:us-east-1:000000000000:TestStack-TestTopic339EC197-79F43WWCCS4Z"
        }
    ]
}
```

## AWS CDK CLI for LocalStack[ ](https://docs.localstack.cloud/user-guide/integrations/aws-cdk/#aws-cdk-cli-for-localstack)

`cdklocal` is a thin wrapper script for using the [AWS CDK](https://github.com/aws/aws-cdk) library against local APIs provided by [LocalStack](https://github.com/localstack/localstack).

### Installation

The `cdklocal` command line is published as an [npm library](https://www.npmjs.com/package/aws-cdk-local):

```bash
# Install globally
npm install -g aws-cdk-local aws-cdk
```
