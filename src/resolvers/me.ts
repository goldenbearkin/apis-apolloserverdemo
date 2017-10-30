import { RequestContext } from '../server/RequestContext';
import { UserService } from '../services/user-service/UserService';
import { INJECTOR } from '../util/di/Injector';

export default {
  Query: {
    me: (_obj: any, _args: any, context: RequestContext, _info: any) => {
      const userService = INJECTOR.get(UserService) as UserService;

      const result = userService.getUserInfoBySub(context.aclUser, context.aclUser.getSub());

      return result.then(data =>
        data.match({
          Ok: v => v,
          Err: e => { throw new Error(e); }
        })
      );
    }
  }
};
