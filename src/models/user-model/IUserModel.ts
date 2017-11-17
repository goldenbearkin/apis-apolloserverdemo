import {Option} from 'result-class';
import { UserInfoT } from '../../services/user-service/IUserService';

export interface IUserModel {
  getUserInfoBySub(sub: string): Promise<Option<UserInfoT>>;
}
