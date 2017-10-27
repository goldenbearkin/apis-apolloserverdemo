import { UserInfoT } from './UserService';

export abstract class UserModel {
  public abstract getUserInfoBySub(sub: string): Promise<UserInfoT | undefined>;
}
