import { ReflectiveInjector } from 'injection-js';
import { ExpressServer } from '../../app';
import { CommonConfig } from '../../config/CommonConfig';

import { AwsExpressMiddleware, awsExpressMiddlewareFactory } from './AwsExpressMiddlewareFactory';

const PROVIDERS = [
  CommonConfig,
  ExpressServer,
  {provide: AwsExpressMiddleware, useFactory: awsExpressMiddlewareFactory, deps: [CommonConfig]}
];

export const INJECTOR: ReflectiveInjector = ReflectiveInjector.resolveAndCreate(PROVIDERS);
