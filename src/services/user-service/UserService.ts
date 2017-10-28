import { Result } from 'result-class';
import { IAclUser } from '../../acl/acluser/IAclUser';

export type UserInfoT = {
  sub: string;
  name: string;
  avatarURL: string;
};

export abstract class UserService {
  public abstract getUserInfoBySub(performer: IAclUser, sub: string): Result<Promise<UserInfoT | undefined>, string>;
}
