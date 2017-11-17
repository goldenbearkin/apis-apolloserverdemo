import { RequestContext } from '../server/RequestContext';
import { IUserService } from '../services/user-service/IUserService';
import { INJECTOR } from '../util/di/Injector';
import { Its } from '../util/di/Its';

export default {
  Query: {
    me: (_obj: any, _args: any, context: RequestContext, _info: any) => {
      const userService = INJECTOR.get(Its.IUserService) as IUserService;

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
