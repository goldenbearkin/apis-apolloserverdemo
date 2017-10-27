import { Injectable } from 'injection-js';
import { UserModel } from './UserModel';

export type UserInfoT = {
  sub: string;
  name: string;
  avatarURL: string;
};

@Injectable()
export class UserService {
  public constructor(private userModel: UserModel) {
  }

  public getUserInfoBySub(sub: string): Promise<UserInfoT | undefined> {
    return this.userModel.getUserInfoBySub(sub);
  }
}
