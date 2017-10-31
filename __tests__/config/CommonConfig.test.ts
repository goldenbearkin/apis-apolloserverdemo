import 'core-js';

import { CommonConfig, Environment } from '../../src/config/CommonConfig';
import { INJECTOR } from '../../src/util/di/Injector';

describe('Test CommonConfig.ts', () => {
  test('get config', () => {
    const config = INJECTOR.get(CommonConfig) as CommonConfig;

    expect( config.general.environment ).toBe( Environment.Test );
  });
});
