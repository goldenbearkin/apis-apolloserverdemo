import 'core-js';

import * as https from 'https';
import * as pem from 'pem';
import { ExpressServer } from './app';
import { INJECTOR } from './util/di/Injector';

const expressServer = INJECTOR.get(ExpressServer) as ExpressServer;

pem.createCertificate({ days: 1, selfSigned: true }, (err, keys) => {
  if (err) {
    console.log(err);
    throw err;
  }

  const port = process.env.PORT || 4433;
  https.createServer({ key: keys.serviceKey, cert: keys.certificate }, expressServer.app).listen(port);
  console.log(`listening on https://localhost:${port}${expressServer.apiPath}/graphiql`);
});
