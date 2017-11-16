import 'core-js';

import * as awsServerlessExpress from 'aws-serverless-express';
import { LoggerInstance } from 'winston';
import { ExpressServer } from './server/ExpressServer';
import { INJECTOR } from './util/di/Injector';
import { Logger } from './util/di/LoggerFactory';

const expressServer = INJECTOR.get(ExpressServer) as ExpressServer;
const logger = INJECTOR.get(Logger) as LoggerInstance;

// NOTE: If you get ERR_CONTENT_DECODING_FAILED in your browser, this is likely
// due to a compressed response (e.g. gzip) which has not been handled correctly
// by aws-serverless-express and/or API Gateway. Add the necessary MIME types to
// binaryMimeTypes below, then redeploy (`npm run package-deploy`)
const binaryMimeTypes = [
  'application/javascript',
  'application/json',
  'application/octet-stream',
  'application/xml',
  'font/eot',
  'font/opentype',
  'font/otf',
  'image/jpeg',
  'image/png',
  'image/svg+xml',
  'text/comma-separated-values',
  'text/css',
  'text/html',
  'text/javascript',
  'text/plain',
  'text/text',
  'text/xml',
];
// don't know why the type of expressServer.app is not compactiable with createServer
// cast expressServer.app to any to workaround the compile error first
// need to investigate later
const server = awsServerlessExpress.createServer(expressServer.app as any, undefined, binaryMimeTypes);
// const server = awsServerlessExpress.createServer(expressServer.app as any);

exports.handler = (event: AWSLambda.APIGatewayEvent, context: AWSLambda.Context) => {
  logger.debug(JSON.stringify(event));
  logger.debug('hello');

  return awsServerlessExpress.proxy(server, event, context);
};
