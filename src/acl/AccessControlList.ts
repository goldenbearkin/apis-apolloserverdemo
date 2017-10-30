import * as CanCan from 'cancan';
import {Injectable} from 'injection-js';
import {AclAction} from './AclAction';
import {AclTarget} from './AclTarget';
import { AclAdmin } from './acluser/AclAdmin';
import { AclGuest } from './acluser/AclGuest';
import { AclNormalUser } from './acluser/AclNormalUser';

@Injectable()
export class AccessControlList {
  public constructor(private cancan: CanCan) {
  }

  public init(): void {
    this.cancan.allow(AclAdmin, AclAction.Manage, AclTarget.All);

    this.cancan.allow(AclGuest, AclAction.Read, AclTarget.UserInfoT);
    this.cancan.allow(AclNormalUser, [AclAction.Read, AclAction.Update], AclTarget.UserInfoT);
  }
}
