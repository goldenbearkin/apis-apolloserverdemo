import * as https from 'https';
import * as pem from 'pem';
import { apiPath, app } from './app';

pem.createCertificate({ days: 1, selfSigned: true }, (err, keys) => {
  if (err) {
    console.log(err);
    throw err;
  }

  const port = process.env.PORT || 4433;
  https.createServer({ key: keys.serviceKey, cert: keys.certificate }, app).listen(port);
  console.log(`listening on https://localhost:${port}${apiPath}/graphiql`);
});
