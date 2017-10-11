import * as awsServerlessExpressMiddleware from 'aws-serverless-express/middleware';
import * as bodyParser from 'body-parser';
import * as compression from 'compression';
import * as cors from 'cors';
import * as express from 'express';

import { graphiqlExpress, graphqlExpress } from 'apollo-server-express';
import { executableSchema } from './nodes/executableSchema';

export const app = express();

const apiPath = '/apolloserverdemo';

const stagePath = process.env.STAGE ? `/${process.env.STAGE}` : '';
const basePath = apiPath + stagePath;

app.use(compression());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(awsServerlessExpressMiddleware.eventContext());

app.use(basePath + '/graphql', bodyParser.json(), graphqlExpress(
  {
    schema: executableSchema,
    // context: {
    // ...contextModel
    // },
  },
));

app.use(basePath + '/graphiql', graphiqlExpress({
  endpointURL: basePath + '/graphql',
}));
