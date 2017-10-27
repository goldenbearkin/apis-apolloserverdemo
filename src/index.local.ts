import 'core-js';

import * as https from 'https';
import * as pem from 'pem';
import { ExpressServer } from './app';
import { CommonConfig } from './config/CommonConfig';
import { INJECTOR } from './util/di/Injector';

const expressServer = INJECTOR.get(ExpressServer) as ExpressServer;
const config = INJECTOR.get(CommonConfig) as CommonConfig;

const port = config.PORT;

if (!config.USE_HTTP) {
  pem.createCertificate({ days: 1, selfSigned: true }, (err, keys) => {
    if (err) {
      console.log(err);
      throw err;
    }

    https.createServer({ key: keys.serviceKey, cert: keys.certificate }, expressServer.app).listen(port);
  });
} else {
  expressServer.app.listen(port);
}

const protocolStr = config.USE_HTTP ? 'http' : 'https';
console.log(`listening on ${protocolStr}://localhost:${port}${expressServer.basePath}/graphiql`);
