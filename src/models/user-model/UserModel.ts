import { UserInfoT } from '../../services/user-service/UserService';

export abstract class UserModel {
  public abstract getUserInfoBySub(sub: string): Promise<UserInfoT | undefined>;
}
