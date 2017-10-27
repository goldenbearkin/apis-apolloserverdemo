import { UserService } from '../services/user-service/UserService';
import { INJECTOR } from '../util/di/Injector';

export default {
  Query: {
    me: () => {
      const userService = INJECTOR.get(UserService) as UserService;

      return userService.getUserInfoBySub('dev fake sub');
    }
  }
};
