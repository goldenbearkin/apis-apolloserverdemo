import { IAclUser } from './IAclUser';
import { Role } from './Role';

export abstract class AbstractAclUser implements IAclUser {
  public constructor(private sub: string, private role: Role) {
  }

  public getSub(): string {
    return this.sub;
  }

  public getRole(): Role {
    return this.role;
  }
}
