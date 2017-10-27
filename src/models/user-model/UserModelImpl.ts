import * as AWS from 'aws-sdk';
import { Injectable } from 'injection-js';
import { CommonConfig } from '../../config/CommonConfig';
import { UserModel } from '../../services/user-service/UserModel';
import { UserInfoT } from '../../services/user-service/UserService';

@Injectable()
export class UserModelImpl extends UserModel {
  public constructor(private docClient: AWS.DynamoDB.DocumentClient,
                     private config: CommonConfig) {
    super();
  }

  public getUserInfoBySub(sub: string): Promise<UserInfoT | undefined> {
    const params: AWS.DynamoDB.DocumentClient.GetItemInput = {
      TableName: `${this.config.DYNAMODB_TABLE_PREFIX}_UserInfo`,
      Key: { sub }
    };

    return this.docClient.get(params)
      .promise()
      .then(data => {
        const item = data.Item;
        if (item === undefined) { return undefined; }
        return { sub, ...item } as UserInfoT;
      });
  }
}
