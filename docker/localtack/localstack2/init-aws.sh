#!/bin/bash

#awslocal dynamodb create-table \
#  --table-name table-global \
#  --attribute-definitions AttributeName=id,AttributeType=S \
#  --key-schema AttributeName=id,KeyType=HASH \
#  --provisioned-throughput ReadCapacityUnits=5,WriteCapacityUnits=5

#awslocal dynamodb create-table \
#   --table-name Music \
#   --attribute-definitions \
#      AttributeName=Artist,AttributeType=S \
#      AttributeName=SongTitle,AttributeType=S \
#   --key-schema \
#      AttributeName=Artist,KeyType=HASH \
#      AttributeName=SongTitle,KeyType=RANGE \
#   --provisioned-throughput \
#      ReadCapacityUnits=10,WriteCapacityUnits=5   
#
#awslocal --endpoint-url=http://localhost:4566 dynamodb put-item \
#   --table-name Music  \
#   --item \
#      '{"Artist": {"S": "No One You Know"}, "SongTitle": {"S": "Call Me Today"}, "AlbumTitle": {"S": "Somewhat Famous"}, "Awards": {"N": "1"}}'        