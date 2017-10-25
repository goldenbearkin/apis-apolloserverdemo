#!/bin/sh

REGION=`aws configure get region`
ACCOUNT_ID=`aws sts get-caller-identity --output text --query 'Account'`

cat swagger.yaml \
    | sed "s/YOUR_AWS_REGION/$REGION/g" \
    | sed "s/YOUR_ACCOUNT_ID/$ACCOUNT_ID/g"\
    | sed "s/YOUR_API_NAME/$1/g" \
    > packaged-swagger.yaml

echo "generated packaged-swagger.yaml"

aws cloudformation package \
    --template-file ./template.yaml \
    --s3-bucket packaged-templates \
    --output-template-file packaged-template.yaml

echo "generated packaged-template.yaml"

aws cloudformation deploy \
    --template-file `pwd`/packaged-template.yaml \
    --stack-name $1 \
    --capabilities CAPABILITY_IAM \
    --parameter-overrides `jq -r ".Parameters|to_entries|map(\"\(.key)=\(.value|tostring)\")|.[]" beta.json`

echo "finished deployment (stack name: $1)"
