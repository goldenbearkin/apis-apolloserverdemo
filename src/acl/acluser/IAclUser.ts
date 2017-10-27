import { Role } from './Role';

export interface IAclUser {
  getSub(): string;
  getRole(): Role;
}
