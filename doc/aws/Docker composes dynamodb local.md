# Docker composes dynamodb local 🌟

Let us use docker compose to spin up dynamodb local

### Dynamodb local container 🤡

I prefer to use the docker mode of setting up dynamodb local since it was very much predictable and can also use docker compose yml file alongside.

Here in this snippet of yaml file below, you can find a simple dynamodb docker container bound to `cloud` network and local volume `ddb-data` which has been already pre-created.

COPY

COPY

```yaml
version: "3.5"

services:
  dynamo:
    container_name: local-ddb
    image: amazon/dynamodb-local
    networks:
      - cloud
    ports:
      - "8000:8000"
    volumes:
      - ddb-data:/home/dynamodblocal
    working_dir: /home/dynamodblocal
    command: "-jar DynamoDBLocal.jar -sharedDb -dbPath ."

networks:
  cloud:
    external: true

volumes:
  ddb-data:
    external: true
```

### Create the docker network 💦

Here let us define a docker network to be shared by our local cloud containers.

COPY

COPY

```sh
docker network create -d bridge cloud
```

### Create the docker volume 🐟

Here let us create a new docker volume and mount it to our local folder

COPY

COPY

```sh
docker volume create \
        --driver local \
        --opt type=none \
        --opt o=bind \
        --opt device=*******Your Local Volume folder*********** \
        ddb-data
```

### Start and Stop dynamodb local 🌱

Navigate to the directory you have defined the docker compose file. Open the terminal and run the below command to start it.

COPY

COPY

```sh
docker-compose up -d
```

And to stop the container run the below command

COPY

COPY

```sh
docker-compose down
```

### Validate the ddb connection local 🌴

Run the below command in the local terminal to make sure the port is correct as per your docker-compose you have defined above.

COPY

COPY

```sh
aws dynamodb list-tables --endpoint-url http://localhost:8000
```

You may get some results like the below.

COPY

COPY

```json
{
  "TableNames": [

  ]
}
```

### Create local table 🌸

Before that if the table already exists you can delete it as shown below.

COPY

COPY

```sh
aws dynamodb delete-table --table-name eventStores9 --endpoint-url http://localhost:8000
```

Net us create the table by copying the schema from the cloud table by running the below describe-table command

COPY

COPY

```sh
aws dynamodb describe-table --table-name eventStores9 --profile av > eventStores9.json
```

Note in the above step, I have not used the endpoint but rather used my AWS named profile `av` to connect. In your case, you can have your own and write the output to the file `eventStores9.json`

Now run the below command using the file created above (note it is expected to throw error)

COPY

COPY

```sh
aws dynamodb create-table --cli-input-json file://eventStores9.json --endpoint-url http://localhost:8000
```

![ddb local table creation error](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/hve1y14hjga2trx96ayb.png)

When you get the above error, you simply have to remove those nodes from the JSON file you are using and the cleanup version of the file is already checkin to the local of this project to help you identify.

And then you can run the same command again, if it does not throw any error it should create the table and will give the description of the table as output.

COPY

COPY

```sh
aws dynamodb create-table --cli-input-json file://eventStores9.json --endpoint-url http://localhost:8000
```

### Validate by listing the tables locally :cherry_blossom:

COPY

COPY

```sh
aws dynamodb list-tables --endpoint-url http://localhost:8000
```

You may get some results like the below.

COPY

COPY

```json
{
  "TableNames": [
    "eventStores9"
  ]
}
```

And there you have it your local dynamodb table is ready to help you.

## NoSQL Workbench 🐲

[docs.aws.amazon.com/amazondynamodb/latest/d..](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/workbench.settingup.html)

You may also try this tool which can help you model dynamodb much faster and even push it to the cloud or local connection. However, this tool does not support LSI in the data modeling stage. Hope it is available soon. If it supports LSI, we would have directly imported the cloud formation template without parameters to create the schema in the tool itself. I tried it but is ignoring the LSI. So that is why I used the AWS CLI to generate the table.

Still, this tool can help us with the `Operation Builder` feature which will connect to the dynamodb tables directly and help with a range of other features and even help with some code snippets as well to design.

### Create a new database connection 🐐

![local connection setup](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/09s3znev3y2gxwbjjlkh.png)

# Tools

## NoSQL Workbench

[download](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/workbench.settingup.html)

### Install NoSQL Workbench for DynamoDB

[PDF](https://docs.aws.amazon.com/pdfs/amazondynamodb/latest/developerguide/dynamodb-dg.pdf#workbench.settingup.install)[RSS](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/dynamodbupdates.rss)



Follow these steps to install NoSQL Workbench and DynamoDB local on a supported platform.

- Windows
- macOS
- Linux

###### To install NoSQL Workbench on Windows

1. Run the NoSQL Workbench installer application and choose the setup language. Then choose **OK** to begin the setup. For more information about downloading NoSQL Workbench, see [Download NoSQL Workbench for DynamoDB](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/workbench.settingup.html).

2. Choose **Next** to continue the setup, and then choose **Next** on the following screen.

3. By default, the **Install DynamoDB Local** check box is selected to include DynamoDB local as part of the installation. Keeping this option selected ensures that DynamoDB local will be installed, and the destination path will be the same as the installation path of NoSQL Workbench. Clearing the check box for this option will skip the installation of DynamoDB local, and the installation path will be for NoSQL Workbench only.

   Choose the destination where you want the software installed, and choose **Next**.

   

   ###### Note

   If you opted to not include DynamoDB local as part of the setup, clear the **Install DynamoDB Local** check box, choose **Next**, and skip to step 8. You can download DynamoDB local separately as a standalone installation at a later time. For more information, see [Setting up DynamoDB local (downloadable version) ](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/DynamoDBLocal.html).

   ![                                     Configure your installation path during this step.                                 ](https://docs.aws.amazon.com/images/amazondynamodb/latest/developerguide/images/workbench/Install-Win1.png)

4. Choose the Region for the download of DynamoDB local and choose **Next**.

5. Configure your AWS account by selecting the **Yes, I would like to enter my AWS credentials** check box. If you don't have an AWS account, or would like to set this up later, you can keep the check box clear and choose **Next**.

   ![                                     Configure your AWS credentials during this step.                                 ](https://docs.aws.amazon.com/images/amazondynamodb/latest/developerguide/images/workbench/Install-Win2.png)

6. You are shown a confirmation of your chosen AWS credentials. Choose **OK** to continue.

7. Choose the port number for DynamoDB local to use. The default port is 8000. After you enter the port number, choose **Next**.

8. Choose **Next** to begin setup.

9. When the setup has completed, choose **Finish** to close the setup screen.

10. Open the application in your installation path, such as */programs/DynamoDBWorkbench/*.



###### Note

If you opted to install DynamoDB local as part of the installation of NoSQL Workbench, DynamoDB local will be preconfigured with default options. To edit the default options, modify the *DDBLocalStart* script located in the */resources/DDBLocal_Scripts/* directory. You can find this in the path that you provided during installation. To learn more about DynamoDB local options, see [DynamoDB local usage notes ](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/DynamoDBLocal.UsageNotes.html).

If you opted to install DynamoDB local as part of the NoSQL Workbench installation, you will have access to a toggle to enable and disable DynamoDB local as shown in the following image.

![img](https://docs.aws.amazon.com/images/amazondynamodb/latest/developerguide/images/workbench/WorkbenchToggle.png)

Still, this tool can help us with the `Operation Builder` feature which will connect to the dynamodb tables directly and help with a range of other features and even help with some code snippets as well to design.

### Create a new database connection 🐐

![local connection setup](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/09s3znev3y2gxwbjjlkh.png)