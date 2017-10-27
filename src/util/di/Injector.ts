import { ReflectiveInjector } from 'injection-js';

import { CommonConfig } from '../../config/CommonConfig';

import * as AWS from 'aws-sdk';
import { ExpressServer } from '../../app';
import { UserModelImpl } from '../../models/user-model/UserModelImpl';
import { UserModel } from '../../services/user-service/UserModel';
import { UserService } from '../../services/user-service/UserService';
import { AwsExpressMiddleware, awsExpressMiddlewareFactory } from './AwsExpressMiddlewareFactory';
import { documentClientFactory } from './DocumentClientFactory';
import { Logger, loggerFactory } from './LoggerFactory';

const PROVIDERS = [
  CommonConfig,
  ExpressServer,
  {provide: AwsExpressMiddleware, useFactory: awsExpressMiddlewareFactory, deps: [CommonConfig]},
  {provide: Logger, useFactory: loggerFactory, deps: [CommonConfig]},

  // dbs
  {provide: AWS.DynamoDB.DocumentClient, useFactory: documentClientFactory, deps: [CommonConfig]},

  // services
  UserService,

  // models
  UserModelImpl,
  {provide: UserModel, useClass: UserModelImpl},
];

export const INJECTOR: ReflectiveInjector = ReflectiveInjector.resolveAndCreate(PROVIDERS);
