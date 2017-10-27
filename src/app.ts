import * as bodyParser from 'body-parser';
import * as compression from 'compression';
import * as cors from 'cors';
import * as express from 'express';

import { graphiqlExpress, graphqlExpress } from 'apollo-server-express';
import { makeExecutableSchema } from 'graphql-tools';
import { Injectable, Inject } from 'injection-js';

import { fileLoader, mergeResolvers, mergeTypes } from 'merge-graphql-schemas';
import * as path from 'path';
import { LoggerInstance } from 'winston';
import { CommonConfig } from './config/CommonConfig';
import { AwsExpressMiddleware } from './util/di/AwsExpressMiddlewareFactory';
import { Logger } from './util/di/LoggerFactory';

@Injectable()
export class ExpressServer {
  public readonly app = express();
  public readonly apiPath = '/apolloserverdemo';
  public readonly basePath: string;

  public constructor(private config: CommonConfig,
                     @Inject(AwsExpressMiddleware) awsExpressMiddleware: express.RequestHandler,
                     @Inject(Logger) private logger: LoggerInstance) {
    const stagePath = (this.config.STAGE !== '') ? `/${this.config.STAGE}` : '';
    this.basePath = this.apiPath + stagePath;

    this.app.use(compression());
    this.app.use(cors());
    this.app.use(awsExpressMiddleware);

    const typeDefs = mergeTypes(fileLoader(path.join(__dirname, './types')));
    const resolvers = mergeResolvers(fileLoader(path.join(__dirname, './resolvers')));

    const executableSchema = makeExecutableSchema({ typeDefs, resolvers });

    this.app.use(this.basePath + '/graphql', bodyParser.json(), graphqlExpress(
      {
        schema: executableSchema,
        // context: {
        // ...contextModel
        // req.apiGateway.event.request.userAttributes.sub
        // },
      },
    ));

    this.app.use(this.basePath + '/graphiql', graphiqlExpress({
      endpointURL: this.basePath + '/graphql',
    }));
  }
}
