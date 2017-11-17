import { Result } from 'result-class';
import { IAclUser } from '../../acl/acluser/IAclUser';

export type UserInfoT = {
  sub: string;
  name: string;
  avatarURL: string;
};

export interface IUserService {
  getUserInfoBySub(performer: IAclUser, sub: string): Promise<Result<UserInfoT, string>>;
}
