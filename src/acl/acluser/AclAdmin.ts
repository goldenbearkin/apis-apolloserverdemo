import { AbstractAclUser } from './AbstractAclUser';
import { Role } from './Role';

export class AclAdmin extends AbstractAclUser {
  public constructor(sub: string, role: Role) {
    super(sub, role);
  }
}
