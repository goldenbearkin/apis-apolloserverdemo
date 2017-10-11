# Demo for Apollo server with custom domain
AWS services: API Gateway, Lambda, Route 53

To run locally at http://localhost:8000/apolloserverdemo/graphiql
```sh
yarn start
```

or, to deploy to AWS, first save a beta.json at root level
```json
{
  "Parameters": {
    "DomainName": "example.com",
    "SubDomainName": "apis",
    "BasePath": "apolloserverdemo",
    "DistributionDomainName": "**********.cloudfront.net",
    "Stage": "prod"
  }
}
```
then run
```sh
brew install jq # if you don't have jq installed
yarn deploy
```
*** Deployment uses cloudformation. The stack name of cloudformation and the API name of APIGW align with the name of package.json.

*** Before deployment, you have to have jq installed for your shell. (https://stedolan.github.io/jq/)

*** DistributionDomainName can be achieved by
1) aws console -> Amazon API Gateway -> Custom Domain Names -> Create Custom Domain Name, or
2) cloudformation with Type: AWS::ApiGateway::DomainName