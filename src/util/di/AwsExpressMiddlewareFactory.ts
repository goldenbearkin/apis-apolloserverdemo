import {InjectionToken} from 'injection-js';

import * as awsServerlessExpressMiddleware from 'aws-serverless-express/middleware';
import * as express from 'express';
import { CommonConfig, Environment } from '../../config/CommonConfig';
import { devAwsExpressMiddleware } from '../express-middleware/DevAwsExpressMiddleware';

// tslint:disable-next-line:variable-name
export const AwsExpressMiddleware = new InjectionToken<express.RequestHandler>('AwsExpressMiddleware');

export const awsExpressMiddlewareFactory = (config: CommonConfig): express.RequestHandler => {
  return config.general.environment === Environment.Dev ? devAwsExpressMiddleware : awsServerlessExpressMiddleware.eventContext();
};
