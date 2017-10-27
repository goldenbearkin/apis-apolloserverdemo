import * as AWS from 'aws-sdk';

export const documentClientFactory = (): AWS.DynamoDB.DocumentClient => {
  return new AWS.DynamoDB.DocumentClient({apiVersion: '2012-08-10'});
};
