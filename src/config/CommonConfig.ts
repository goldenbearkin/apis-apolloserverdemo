import { Builder } from 'builder-pattern';
import * as config from 'config';
import { Injectable } from 'injection-js';

export enum Environment {
  Dev,
  Prod,
  Test,
}

export interface General {
  environment: Environment;
  logLevel: string;
}

export interface WebServer {
  useHttps: boolean;
  port: number;
}

export interface ApiGateway {
  apiPath: string;
  // stagePath: string;
}

export interface DynamoDb {
  dynamoDbTablePrefix: string;
}

export interface Acl {
  guestSub: string;
  adminSubs: string[];
}

@Injectable()
export class CommonConfig {
  public readonly general: Readonly<General>;
  public readonly webServer: Readonly<WebServer>;
  public readonly apiGateway: Readonly<ApiGateway>;
  public readonly dynamoDb: Readonly<DynamoDb>;
  public readonly acl: Readonly<Acl>;

  public constructor() {
    {
      const builder = Builder<General>();

      const envStr = config.get('General.environment');

      let env: Environment;

      switch (envStr) {
        case 'prod':
          env = Environment.Prod;
          break;
        case 'dev':
          env = Environment.Dev;
          break;
        case 'test':
          env = Environment.Test;
          break;

        default:
          throw new Error('unknown General->environment in config yaml');
      }

      builder.environment(env);

      builder.logLevel( config.get('General.logLevel') );

      this.general = builder.build();
    }

    {
      const builder = Builder<WebServer>();

      builder.useHttps( config.get('WebServer.useHttps') );
      builder.port( config.get('WebServer.port') );

      this.webServer = builder.build();
    }

    {
      const builder = Builder<ApiGateway>();

      builder.apiPath( config.get('ApiGateway.apiPath') );
      // builder.stagePath( config.get('ApiGateway.stagePath') );

      this.apiGateway = builder.build();
    }

    {
      const builder = Builder<DynamoDb>();

      builder.dynamoDbTablePrefix( config.get('DynamoDb.dynamoDbTablePrefix') );

      this.dynamoDb = builder.build();
    }

    {
      const builder = Builder<Acl>();

      builder.guestSub( config.get('Acl.guestSub') );
      builder.adminSubs( config.get('Acl.adminSubs') );

      this.acl = builder.build();
    }
  }
}
