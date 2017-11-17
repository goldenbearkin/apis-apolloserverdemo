import * as awsServerlessExpressMiddleware from 'aws-serverless-express/middleware';
import * as express from 'express';
import { CommonConfig, Environment } from '../../config/CommonConfig';
import { devAwsExpressMiddleware } from '../express-middleware/DevAwsExpressMiddleware';

export const awsExpressMiddlewareFactory = (config: CommonConfig): express.RequestHandler => {
  switch (config.general.environment) {
    case Environment.Prod:
      return awsServerlessExpressMiddleware.eventContext();
    case Environment.Dev:
    case Environment.Test:
      return devAwsExpressMiddleware;
  }
};
