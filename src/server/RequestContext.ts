import * as express from 'express';
import { IAclUser } from '../acl/acluser/IAclUser';

// tslint:disable-next-line:interface-name
export interface RequestContextRaw {
  rawExpressRequest: express.Request;

  aclUser: IAclUser;

  awsEvent: any;
  awsContext: any;
}

export type RequestContext = Readonly<RequestContextRaw>;
