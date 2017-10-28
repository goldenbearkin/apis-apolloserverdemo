import * as AWS from 'aws-sdk';
import { Injectable } from 'injection-js';
import {None, Option, Some} from 'result-class';
import { CommonConfig } from '../../config/CommonConfig';
import { UserInfoT } from '../../services/user-service/UserService';
import { UserModel } from './UserModel';

@Injectable()
export class UserModelImpl extends UserModel {
  public constructor(private docClient: AWS.DynamoDB.DocumentClient,
                     private config: CommonConfig) {
    super();
  }

  public async getUserInfoBySub(sub: string): Promise<Option<UserInfoT>> {
    const params: AWS.DynamoDB.DocumentClient.GetItemInput = {
      TableName: `${this.config.DYNAMODB_TABLE_PREFIX}_UserInfo`,
      Key: { sub }
    };

    return this.docClient.get(params)
      .promise()
      .then(data => {
        const item = data.Item;
        if (item === undefined) { return None.getInstance<UserInfoT>(); }
        return new Some({ sub, ...item } as UserInfoT);
      });
  }
}
