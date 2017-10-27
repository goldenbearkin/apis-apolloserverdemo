import { ReflectiveInjector } from 'injection-js';
import { ExpressServer } from '../../app';
import { CommonConfig } from '../../config/CommonConfig';

import { AwsExpressMiddleware, awsExpressMiddlewareFactory } from './AwsExpressMiddlewareFactory';
import { Logger, loggerFactory } from './LoggerFactory';

const PROVIDERS = [
  CommonConfig,
  ExpressServer,
  {provide: AwsExpressMiddleware, useFactory: awsExpressMiddlewareFactory, deps: [CommonConfig]},
  {provide: Logger, useFactory: loggerFactory, deps: [CommonConfig]}
];

export const INJECTOR: ReflectiveInjector = ReflectiveInjector.resolveAndCreate(PROVIDERS);
