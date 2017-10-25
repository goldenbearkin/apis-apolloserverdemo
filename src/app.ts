import * as awsServerlessExpressMiddleware from 'aws-serverless-express/middleware';
import * as bodyParser from 'body-parser';
import * as compression from 'compression';
import * as cors from 'cors';
import * as express from 'express';

import { graphiqlExpress, graphqlExpress } from 'apollo-server-express';
import { makeExecutableSchema } from 'graphql-tools';
import { Injectable } from 'injection-js';
// import { executableSchema } from './nodes/executableSchema';

import { fileLoader, mergeResolvers, mergeTypes } from 'merge-graphql-schemas';
import * as path from 'path';

const typeDefs = mergeTypes(fileLoader(path.join(__dirname, './types')));
const resolvers = mergeResolvers(fileLoader(path.join(__dirname, './resolvers')));

const executableSchema = makeExecutableSchema({ typeDefs, resolvers });

// export const app = express();
// export const apiPath = '/apolloserverdemo';

@Injectable()
export class ExpressServer {
  public readonly app = express();
  public readonly apiPath = '/apolloserverdemo';

  public constructor() {
    const stagePath = process.env.STAGE ? `/${process.env.STAGE}` : '';
    const basePath = this.apiPath + stagePath;

    this.app.use(compression());
    this.app.use(cors());
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.use(awsServerlessExpressMiddleware.eventContext());

    this.app.use(basePath + '/graphql', bodyParser.json(), graphqlExpress(
      {
        schema: executableSchema,
        // context: {
        // ...contextModel
        // req.apiGateway.event.request.userAttributes.sub
        // },
      },
    ));

    this.app.use(basePath + '/graphiql', graphiqlExpress({
      endpointURL: basePath + '/graphql',
    }));
  }
}
