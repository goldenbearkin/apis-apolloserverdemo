import * as CanCan from 'cancan';
import { Injectable } from 'injection-js';
import { Err, Result } from 'result-class';
import { AclAction } from '../../acl/AclAction';
import { AclTarget } from '../../acl/AclTarget';
import { IAclUser } from '../../acl/acluser/IAclUser';
import { UserModel } from '../../models/user-model/UserModel';
import { UserInfoT, UserService } from './UserService';

@Injectable()
export class UserServiceImpl extends UserService {
  public constructor(private cancan: CanCan,
                     private userModel: UserModel) {
    super();
  }

  public async getUserInfoBySub(performer: IAclUser, sub: string): Promise<Result<UserInfoT, string>> {
    if ( !this.cancan.can(performer, AclAction.Read, AclTarget.UserInfoT) ) {
      return new Err('Forbidden');
    }

    return this.userModel.getUserInfoBySub(sub)
      .then(v => v.ok_or('User not found'));
  }
}
