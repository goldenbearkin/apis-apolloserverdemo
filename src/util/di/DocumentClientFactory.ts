import * as AWS from 'aws-sdk';
import { CommonConfig } from '../../config/CommonConfig';

export const documentClientFactory = (config: CommonConfig): AWS.DynamoDB.DocumentClient => {
  return new AWS.DynamoDB.DocumentClient({apiVersion: '2012-08-10'});
};
