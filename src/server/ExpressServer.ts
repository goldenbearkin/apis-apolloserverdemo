import * as bodyParser from 'body-parser';
import * as compression from 'compression';
import * as cors from 'cors';
import * as express from 'express';

import { graphiqlExpress, graphqlExpress } from 'apollo-server-express';
import { makeExecutableSchema } from 'graphql-tools';
import { Inject, Injectable } from 'injection-js';

import { GraphQLOptions } from 'apollo-server-core';
import {Builder} from 'builder-pattern';
import { fileLoader, mergeResolvers, mergeTypes } from 'merge-graphql-schemas';
import * as path from 'path';
import { AclAdmin } from '../acl/acluser/AclAdmin';
import { AclGuest } from '../acl/acluser/AclGuest';
import { AclNormalUser } from '../acl/acluser/AclNormalUser';
import { IAclUser } from '../acl/acluser/IAclUser';
import { CommonConfig } from '../config/CommonConfig';

import { AccessControlList } from '../acl/AccessControlList';
import { Role } from '../acl/acluser/Role';
import { AwsExpressMiddleware } from '../util/di/AwsExpressMiddlewareFactory';
import { RequestContext } from './RequestContext';

@Injectable()
export class ExpressServer {
  public readonly app = express();
  public readonly apiPath = '/apolloserverdemo';
  public readonly basePath: string;

  public constructor(private config: CommonConfig,
                     @Inject(AwsExpressMiddleware) awsExpressMiddleware: express.RequestHandler,
                     acl: AccessControlList) {
    acl.init();

    const stagePath = (this.config.apiGateway.stagePath !== '') ? `/${this.config.apiGateway.stagePath}` : '';
    this.basePath = this.apiPath + stagePath;

    this.app.use(compression());
    this.app.use(cors());
    this.app.use(awsExpressMiddleware);

    const typeDefs = mergeTypes(fileLoader(path.join(__dirname, '../types')));
    const resolvers = mergeResolvers(fileLoader(path.join(__dirname, '../resolvers')));

    const executableSchema = makeExecutableSchema({ typeDefs, resolvers });

    this.app.use(this.basePath + '/graphql', bodyParser.json(), graphqlExpress(
      (req: express.Request, _resp: express.Response): GraphQLOptions => {

        const requestContext = this.buildRequestContext(req);

        return {
          schema: executableSchema,
          context: requestContext,
        };
      }
    ));

    this.app.use(this.basePath + '/graphiql', graphiqlExpress({
      endpointURL: this.basePath + '/graphql',
    }));
  }

  private buildRequestContext(req: express.Request): RequestContext {
    const builder = Builder<RequestContext>();

    builder.rawExpressRequest(req);

    // tslint:disable-next-line:no-string-literal
    const apiGatewayParams = (req as any)['apiGateway'];

    builder.awsEvent(apiGatewayParams.event);
    builder.awsContext(apiGatewayParams.context);

    const sub = apiGatewayParams.context.authorizer.claims.sub;

    builder.aclUser( this.roleToAclUser(this.getRoleBySub(sub), sub) );

    return builder.build();
  }

  private getRoleBySub(sub: string): Role {
    if (this.config.acl.guestSub === sub) {
      return Role.Guest;
    } else if (this.config.acl.adminSubs.includes(sub)) {
      return Role.Admin;
    }

    return Role.NormalUser;
  }

  private roleToAclUser(role: Role, sub: string): IAclUser {
    switch (role) {
      case Role.Guest:
        return new AclGuest(sub, role);
      case Role.NormalUser:
        return new AclNormalUser(sub, role);
      case Role.Admin:
        return new AclAdmin(sub, role);
    }
  }
}
