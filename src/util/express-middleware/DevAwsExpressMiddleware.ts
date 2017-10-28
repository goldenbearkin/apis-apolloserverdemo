import * as express from 'express';

export const devAwsExpressMiddleware: express.RequestHandler = (req: express.Request,
                                                                _resp: express.Response,
                                                                next: express.NextFunction) => {
  const request = req as any;

  const lambdaParam = {
    event: {},
    context: {
      authorizer: {
        claims: {
          sub: 'dev fake sub'
        }
      }
    }
  };

  request.apiGateway = lambdaParam;
  next();
};
