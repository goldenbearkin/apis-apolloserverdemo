import { ReflectiveInjector } from 'injection-js';

import { CommonConfig } from '../../config/CommonConfig';

import * as AWS from 'aws-sdk';
import * as CanCan from 'cancan';
import { AccessControlList } from '../../acl/AccessControlList';
import { UserModel } from '../../models/user-model/UserModel';
import { ExpressServer } from '../../server/ExpressServer';

import { UserService } from '../../services/user-service/UserService';
import { awsExpressMiddlewareFactory } from './AwsExpressMiddlewareFactory';
import { cancanFactory } from './CanCanFactory';
import { documentClientFactory } from './DocumentClientFactory';
import { Its } from './Its';
import { loggerFactory } from './LoggerFactory';

const PROVIDERS = [
  CommonConfig,
  ExpressServer,
  {provide: Its.AwsExpressMiddleware, useFactory: awsExpressMiddlewareFactory, deps: [CommonConfig]},
  {provide: Its.Logger, useFactory: loggerFactory, deps: [CommonConfig]},
  {provide: CanCan, useFactory: cancanFactory, deps: []},
  AccessControlList,

  // dbs
  {provide: AWS.DynamoDB.DocumentClient, useFactory: documentClientFactory, deps: []},

  // services
  UserService,
  {provide: Its.IUserService, useClass: UserService},

  // models
  UserModel,
  {provide: Its.IUserModel, useClass: UserModel},
];

export const INJECTOR: ReflectiveInjector = ReflectiveInjector.resolveAndCreate(PROVIDERS);
