import { ReflectiveInjector } from 'injection-js';
import { ExpressServer } from '../../app';
import { CommonConfig } from '../../config/CommonConfig';

const PROVIDERS = [
  CommonConfig,
  ExpressServer
];

export const INJECTOR: ReflectiveInjector = ReflectiveInjector.resolveAndCreate(PROVIDERS);
