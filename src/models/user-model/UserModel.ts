import * as AWS from 'aws-sdk';
import { Injectable } from 'injection-js';
import {None, Option, Some} from 'result-class';
import { CommonConfig } from '../../config/CommonConfig';
import { UserInfoT } from '../../services/user-service/IUserService';
import { IUserModel } from './IUserModel';

@Injectable()
export class UserModel implements IUserModel {
  public constructor(private docClient: AWS.DynamoDB.DocumentClient,
                     private config: CommonConfig) {
  }

  public async getUserInfoBySub(sub: string): Promise<Option<UserInfoT>> {
    const params: AWS.DynamoDB.DocumentClient.GetItemInput = {
      TableName: `${this.config.dynamoDb.dynamoDbTablePrefix}_UserInfo`,
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
