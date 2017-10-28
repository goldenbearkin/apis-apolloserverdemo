import { ReflectiveInjector } from 'injection-js';

import { CommonConfig } from '../../config/CommonConfig';

import * as AWS from 'aws-sdk';
import * as CanCan from 'cancan';
import { AccessControlList } from '../../acl/AccessControlList';
import { UserModelImpl } from '../../models/user-model/UserModelImpl';
import { ExpressServer } from '../../server/ExpressServer';

import { UserModel } from '../../models/user-model/UserModel';
import { UserService } from '../../services/user-service/UserService';
import { UserServiceImpl } from '../../services/user-service/UserServiceImpl';
import { AwsExpressMiddleware, awsExpressMiddlewareFactory } from './AwsExpressMiddlewareFactory';
import { cancanFactory } from './CanCanFactory';
import { documentClientFactory } from './DocumentClientFactory';
import { Logger, loggerFactory } from './LoggerFactory';

const PROVIDERS = [
  CommonConfig,
  ExpressServer,
  {provide: AwsExpressMiddleware, useFactory: awsExpressMiddlewareFactory, deps: [CommonConfig]},
  {provide: Logger, useFactory: loggerFactory, deps: [CommonConfig]},
  {provide: CanCan, useFactory: cancanFactory, deps: []},
  AccessControlList,

  // dbs
  {provide: AWS.DynamoDB.DocumentClient, useFactory: documentClientFactory, deps: []},

  // services
  UserServiceImpl,
  {provide: UserService, useClass: UserServiceImpl},

  // models
  UserModelImpl,
  {provide: UserModel, useClass: UserModelImpl},
];

export const INJECTOR: ReflectiveInjector = ReflectiveInjector.resolveAndCreate(PROVIDERS);
