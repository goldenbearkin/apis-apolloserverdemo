import { Injectable } from 'injection-js';

export enum Environment {
  Dev,
  Prod
}

@Injectable()
export class CommonConfig {
  public readonly ENV: Environment  = Environment.Prod;
  public readonly STAGE: string     = '';
  public readonly USE_HTTP: boolean = false;
  public readonly PORT: number      = 4433;

  public readonly LOG_LEVEL: string = 'debug'; // debug, info, warn, error

  public readonly DYNAMODB_TABLE_PREFIX: string = 'ASD';

  public constructor() {
    if (process.env.ENV && process.env.ENV.toLowerCase() === 'dev') {
      this.ENV = Environment.Dev;
    }

    if (process.env.STAGE) {
      this.STAGE = process.env.STAGE;
    }

    if (process.env.USE_HTTP) {
      this.USE_HTTP = true;
    }

    if (process.env.PORT) {
      this.PORT = process.env.PORT;
    }
  }
}
