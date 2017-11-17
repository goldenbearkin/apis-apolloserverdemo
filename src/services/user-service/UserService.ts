import * as CanCan from 'cancan';
import { Inject, Injectable } from 'injection-js';
import { Err, Result } from 'result-class';
import { AclAction } from '../../acl/AclAction';
import { AclTarget } from '../../acl/AclTarget';
import { IAclUser } from '../../acl/acluser/IAclUser';
import { IUserModel } from '../../models/user-model/IUserModel';
import { Its } from '../../util/di/Its';
import { IUserService, UserInfoT } from './IUserService';

@Injectable()
export class UserService implements IUserService {
  public constructor(private cancan: CanCan,
                     @Inject(Its.IUserModel) private userModel: IUserModel) {
  }

  public async getUserInfoBySub(performer: IAclUser, sub: string): Promise<Result<UserInfoT, string>> {
    if ( !this.cancan.can(performer, AclAction.Read, AclTarget.UserInfoT) ) {
      return new Err('Forbidden');
    }

    return this.userModel.getUserInfoBySub(sub)
      .then(v => v.ok_or('User not found'));
  }
}
