import {Option} from 'result-class';
import { UserInfoT } from '../../services/user-service/UserService';

export abstract class UserModel {
  public abstract getUserInfoBySub(sub: string): Promise<Option<UserInfoT>>;
}
