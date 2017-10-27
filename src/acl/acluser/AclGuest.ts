import { AbstractAclUser } from './AbstractAclUser';
import { Role } from './Role';

export class AclGuest extends AbstractAclUser {
  public constructor(sub: string, role: Role) {
    super(sub, role);
  }
}
