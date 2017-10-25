import { ReflectiveInjector } from 'injection-js';
import { ExpressServer } from '../../app';

const PROVIDERS = [
  ExpressServer
];

export const INJECTOR: ReflectiveInjector = ReflectiveInjector.resolveAndCreate(PROVIDERS);
