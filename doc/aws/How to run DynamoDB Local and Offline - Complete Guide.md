# How to run DynamoDB Local and Offline - Complete Guide

[source](https://dynobase.dev/run-dynamodb-locally/#connecting-dynamodb-offline-sdk)

Still using AWS console to work with DynamoDB? 🙈

Time to **10x your DynamoDB productivity** with Dynobase [[learn more\]](https://dynobase.dev/)

Imagine you're traveling by plane to a different city, and the deadline for your DynamoDB-powered project is really tight. Obviously, during flight, there's no internet, but you just had one of these "Aha!" moments. You want to rush into the implementation, but there's one problem:

> *Since DynamoDB is fully managed NoSQL database, you cannot access it when you're offline.* Bummer.

This didn't happened to me just once. Until recently, when I discovered I can run DynamoDB offline and locally on my computer, without AWS Cloud. In some scenarios, it makes developing and testing applications without accessing DynamoDB easier. In this guide, I'll show you how you can do that too. There are a few ways to do this; let's run through them below:

## Different ways to setup DynamoDB locally

- [Docker](https://dynobase.dev/run-dynamodb-locally/#docker)
- [Docker Compose](https://dynobase.dev/run-dynamodb-locally/#docker-compose) (**The recommended way 🚀**)
- [Java](https://dynobase.dev/run-dynamodb-locally/#java)
- [Serverless Framework](https://dynobase.dev/run-dynamodb-locally/#serverless-framework)
- [LocalStack](https://dynobase.dev/run-dynamodb-locally/#localstack)
- [With AWS Amplify mock](https://dynobase.dev/run-dynamodb-locally/#aws-amplify-mock)

## Using Offline DynamoDB Local

Once you started DynamoDB offline, you might also be wondering - How do I connect to it?

- [Connecting to DynamoDB Local using SDK](https://dynobase.dev/run-dynamodb-locally/#connecting-dynamodb-offline-sdk)
- [Connecting to DynamoDB Local using CLI](https://dynobase.dev/run-dynamodb-locally/#connecting-dynamodb-offline-cli)
- [Connecting to DynamoDB Local using Dynobase](https://dynobase.dev/run-dynamodb-locally/#connecting-dynamodb-offline-dynobase)

## Troubleshooting

- [How can I check if my DynamoDB is already running?](https://dynobase.dev/run-dynamodb-locally/#verify-if-running)
- [I know that my DynamoDB Local has start? How can I find its port?](https://dynobase.dev/run-dynamodb-locally/#dynamodb-local-port)
- [Error: You must specify a region](https://dynobase.dev/run-dynamodb-locally/#error-specify-a-region)
- [Error: Unable to locate credentials](https://dynobase.dev/run-dynamodb-locally/#error-unable-to-locate-credentials)
- [NetworkError: EPROTO](https://dynobase.dev/run-dynamodb-locally/#network-error-eproto)
- [I can't connect to my DynamoDB Offline in Dynobase](https://dynobase.dev/run-dynamodb-locally/#in-dynobase)



## Using Docker

This is my favorite way because it does not require Java installed. In this setup, DynamoDB is running in an isolated container on the port of your choice. Another good thing about this solution is that it works the same across all the operating systems and can be easily added to your Docker Compose setup.

1. Make sure you have Docker installed. If you don't have Docker yet, [you can get it here](https://docs.docker.com/get-docker/).
2. Open terminal and type:

```
docker run -p 8000:8000 amazon/dynamodb-local
```



And that's pretty much it.

Your DynamoDB local instance is now running on port 8000. If you want to connect to this container using SDK or CLI, don't forget to change the `endpoint` [parameter in the configuration](https://dynobase.dev/dynamodb-nodejs/#dynamodb-local). Otherwise, you'll keep trying to connect to the AWS network.



### Using Docker Compose

A bit better way to run DynamoDB locally is to use Docker Compose. Using this approach, you can configure persistent volumes, network and resources much easier without adding parameters to the `docker run` command. Moreover, a YAML file is easier to maintain and share as a file inside repo.

```
brew install docker-compose
```



1. Create a file called `docker-compose.yml` and paste following code:

```
version: "3.5"

services:
  dynamo:
    container_name: local-dynamodb
    image: amazon/dynamodb-local
    networks:
      - local-dynamodb
    ports:
      - "8000:8000"
    volumes:
      - dynamodata:/home/dynamodblocal
    working_dir: /home/dynamodblocal
    command: "-jar DynamoDBLocal.jar -sharedDb -dbPath ."

networks:
  local-dynamodb:
    name: local-dynamodb

volumes:
  dynamodata: {}
```



1. Run `docker-compose up -d`. You can skip `-d` flag if you don't want to run in in the *"detached"* mode.



## Using Java

In this setup, we're running Java binary in our system without any containerization. It's a bit more complicated

1. First, make sure you have Java Runtime Environment (JRE) version 6.x or newer already installed. It's required to run DynamoDB locally.
2. Second, [download DynamoDB](https://s3.us-west-2.amazonaws.com/dynamodb-local/dynamodb_local_latest.zip)
3. Then, extract the archive and copy its contents to a location of your choice.
4. Lastly, open terminal in the location where you've extracted files in step 3 and enter the following command:

```
java -Djava.library.path=./DynamoDBLocal_lib -jar DynamoDBLocal.jar -sharedDb
```



DynamoDB is now running on port `8000`. If you want to change it, use `-port` flag.

Similar to the Docker setup, you need to change the `endpoint` [parameter in the configuration](https://dynobase.dev/dynamodb-python-with-boto3/#dynamodb-local).

### Running out of memory

If you're going to use DynamoDB really heavily, it's possible that the allocated amount of memory for your JVM might not be enough. In a case like that, use a combination of `Xms` and `Xmx` flags to adjust the amount of RAM. For example:

```
java -Xms256m -Xmx2048m -Djava.library.path=./DynamoDBLocal_lib -jar DynamoDBLocal.jar -sharedDb
```



This will start your local DynamoDB instance with 256 MB of memory and allow the process to use up to 2048 MB of memory.



## With Serverless Framework

Using DynamoDB with Serverless Framework is a pretty popular combination. DDB in a case like this one is perfect for running offline integration tests or just running local replica of the AWS environment for development purposes. Here's how:

1. Run following command:

```
npm install serverless-dynamodb-local --save
# or if you're using yarn
yarn add serverless-dynamodb-local
```



1. Open `serverless.yml` file and add the following entry to the plugins section:

```
plugins:
  - serverless-dynamodb-local
```



1. Now, run the following command to let the plugin setup everything for us, including downloading DynamoDB Local:

```
serverless dynamodb install
```



1. If you don't have DynamoDB tables defined in your `serverless.yml` file, [do it now](https://www.serverless.com/framework/docs/providers/aws/guide/resources/#configuration).
2. Finally, start DynamoDB Local and migrate by running this command:

```
serverless dynamodb start --migrate
```



For more information, [checkout the plugin docs](https://www.npmjs.com/package/serverless-dynamodb-local).



## Using LocalStack

LocalStack is a project aiming to mock most of the AWS resources locally. Once again, in my opinion, using Localstack is much easier with Docker. Running DynamoDB local with it look like this:

```
docker run -e GATEWAY_LISTEN=0.0.0.0:4566 -p 4572:4572 -p 8080:8080 -p 4569:4569 -e SERVICES=s3,dynamodb localstack/localstack
```

```
docker run  -p 4572:4572 -p 8080:8080 -p 4569:4569 -e SERVICES=s3,dynamodb localstack/localstack:latest
```

```
 docker run --rm -it -e GATEWAY_LISTEN=0.0.0.0:4566  --name localstack_main -p 4566:4566 -p 4510-4559:4510-4559 localstack/localstack:latest
```

```
curl localhost:4566/_localstack/health
```



This will run a container exposing three ports:

- `4572` running S3
- `4569` running DynamoDB
- `8080` running Localstack's status dashboard

Similar to the previous approaches, if we want to use our offline services, we need to set the `endpoint` parameter of SDK or CLI to `http://localhost:4569`. If you don't want to set the `endpoint` setting explicitly when using CLI with each command, alternatively, you can use [awscli-local](https://github.com/localstack/awscli-local).



## With AWS Amplify mock

> *This method is only useful when you're working with Amplify-powered projects.*

One of the [AWS Amplify](https://aws.amazon.com/blogs/aws/new-local-mocking-and-testing-with-the-amplify-cli/) toolchain options is to mock some of the cloud functionality locally. In our case, when working with an Amplify-powered API, you can run command `amplify mock api` and it will not only mock your API, but also the DynamoDB which is used as a persistence layer for this interface. Under the hood, it will simply spin a Java process with a copy of [Java-based local DynamoDB](https://dynobase.dev/run-dynamodb-locally/#java).

The database will be ran with following parameters:

- Port: `62224`
- Region: `us-fake-1`
- AWS Access Key ID: `fake`



## Connecting to DynamoDB Local using SDK

All you need to do, is to tell the DynamoDB or DocumentClient to use the local endpoint in the constructor.

#### In Node.js

```
import { DynamoDB, DocumentClient } from "aws-sdk"

const ddb = new DynamoDB({
  endpoint: "http://localhost:8000",
  // ...rest of your configuration variables
})

// Or, in DocumentClient
const docClient = new DocumentClient({
  endpoint: "http://localhost:8000",
  // ...rest of your configuration variables
})
```



#### In Python

```
import boto3

# For a Boto3 client.
ddb = boto3.client('dynamodb', endpoint_url='http://localhost:8000')

# Or, for a Boto3 service resource
ddb = boto3.resource('dynamodb', endpoint_url='http://localhost:8000')
```



#### In Golang

```
func main() {
    sess, err := session.NewSession(&aws.Config{
        Endpoint: aws.String("http://localhost:8000")})
    if err != nil {
        log.Println(err)
        return
    }
    dbSvc := dynamodb.New(sess)
}
```





## Connecting to DynamoDB Local using CLI

Similarly to the SDK, in order to use DynamoDB Local in the CLI you need to end all your commands with `--endpoint-url=<endpoint>:<port>`.

Example:

```
aws dynamodb list-tables --endpoint-url http://localhost:8000
```





## Connecting to DynamoDB Local in Dynobase

![Dynobase UI with DynamoDB offline](https://camo.githubusercontent.com/01e9f71499f5c6d3a6046ff1704ddafd291623f1/68747470733a2f2f692e696d6775722e636f6d2f35694a5942394a2e706e67)

Even though DynamoDB offline comes with an interactive shell that allows you to query and modify data inside the database using a web-based console, I found it a bit clunky. Fortunately, [Dynobase works with DynamoDB local](https://dynobase.dev/dynamodb-local-admin-gui/) just like with the AWS managed one.

### Login to the AWS Console less. Use Dynobase.

### Try 7-day free trial. No credit card needed.

## Troubleshooting



#### How can I check if my DynamoDB is already running?

On Mac and Linux, you can enter following command in your Terminal:

```
ps aux | grep dynamodb
```



If you can see an entry looking something like this:

```
admin 38628 3.2 0.5 10420892  91780 s001  S+ 12:59PM 0:01.31 /usr/bin/java -Djava.library.path=./DynamoDBLocal_lib -jar DynamoDBLocal.jar -port 62224 -dbPath /Users/rafal/amplify-test-mock-db/amplify/mock-data/dynamodb
```



Then it means that your Local DynamoDB started successfully and you can start using it right away.

Alternatively, if you know on which port it *should* be running, you can use following command to verify if it's running correctly (replace `62224` with your port):

```
> lsof -i tcp:62224
COMMAND   PID  USER   FD   TYPE             DEVICE SIZE/OFF NODE NAME
java    38628 rafal   48u  IPv6 0x5d92e9b372bf8279      0t0  TCP *:62224 (LISTEN)
```





#### I know that my DynamoDB Local has start? How can I find its port?

Java-based distribution of DynamoDB Local uses port 8000 by default. If it's not available, DynamoDB Local shouldn't even start. If it was started with custom port (like in [Amplify's case](https://dynobase.dev/run-dynamodb-locally/#amplify)), you can run following command:

```
ps aux | grep dynamodb
```



And find a number supplied as `-port`. For example, in following result:

```
admin 48628 3.3 0.5 13330999  91780 s001  S+ 12:59PM 0:01.31 /usr/bin/java -Djava.library.path=./DynamoDBLocal_lib -jar DynamoDBLocal.jar -port 8080 -dbPath /Users/rafal/amplify-test-mock-db/amplify/mock-data/dynamodb
```



You can see number `8080` after `-port` which indicates that DynamoDB local has been started on port `8080`.



#### Error - You must specify a region

```
You must specify a region. You can also configure your region by running "aws configure".
```



*What?* I'm trying to connect to my local DynamoDB, there are no regions! This error is a not an DynamoDB specific error, it can happen with any AWS API/CLI/SDK command if you're not having a default AWS region setup in your environment variables or in credentials configuration.

To solve it, you can either set the `AWS_DEFAULT_REGION` environment variable to something like `us-east-1`:

```
export AWS_DEFAULT_REGION=us-east-1
```



or end your command with `--region=us-east-1`:

```
aws dynamodb list-tables --endpoint-url http://localhost:8000 --region=us-east-1
```





#### Error - Unable to locate credentials.

```
Unable to locate credentials. You can configure credentials by running "aws configure".
```



Similarly to the previous one, SDK or CLI is failing to find AWS Access and Secret Keys. Don't worry, they don't have to be real. DynamoDB offline is not validating them, you just need to provide *something*, it cannot be blank. You have two options here. Either provide them as environment variables:

```
export AWS_ACCESS_KEY_ID=223344
export AWS_SECRET_ACCESS_KEY=wJalrXUtTHISI/DYNAMODB/bPxRfiCYEXAMPLEKEY
```



or add them as a "profile" using `aws configure` command and reference using `--profile` flag.

```
aws dynamodb list-tables --endpoint-url http://localhost:8000 --region=us-east-1 --profile my-dynamodb-profile
```





#### NetworkError - EPROTO

```
Error: write EPROTO 139816494778176:error:140770FC:SSL routines:SSL23_GET_SERVER_HELLO:unknown protocol:../deps/openssl/openssl/ssl/s23_clnt.c:782:
```



This one might look scary but it is very likely that you're trying to connect to the local DynamoDB instance using `https` protocol. Change that to `http` and you should be fine:

```
const docClient = new DocumentClient({
  endpoint: "https://localhost:8000" ❌

  endpoint: "http://localhost:8000", ✅
})
```





#### I can't connect to my DynamoDB Offline in Dynobase

First, get your DynamoDB Local settings and verify that you can connect to it from the CLI or SDK. You can use following command to verify that parameters you're having are correct:

```
aws dynamodb list-tables --endpoint-url http://localhost:<port> --region <region>
```



If following command responds with data, it means that parameters you're using are correct and you can use them inside Dynobase for Offline Connection setting. You can change them inside `View -> Settings -> Offline Settings` section.

![Dynobase Offline Settings](https://dynobase-assets.s3-us-west-2.amazonaws.com/Screenshot+2021-04-17+at+17.04.58.png)

> **Important**: You must have *at least one table* created in your DynamoDB Local instance in order to be able to connect to it through Dynobase. Otherwise, your profile will be simply ignored.

### Tired of AWS Console? Try Dynobase.

### Try 7-day free trial. No credit card needed.