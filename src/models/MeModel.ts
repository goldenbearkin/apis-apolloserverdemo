import * as AWS from 'aws-sdk';

// This is the projection of UserTable
export type MeT = {
  sub: string;
  name: string;
  avatarURL: string;
};

const TablePrefix = 'ASD';
const TableSuffix = 'ME';

export const TableName = TablePrefix + '_' + TableSuffix;

export class MeModel {
  constructor(public docClient: AWS.DynamoDB.DocumentClient) { }

  public getMeBySub(sub: string): Promise<MeT | undefined> {
    const params: AWS.DynamoDB.DocumentClient.GetItemInput = {
      TableName,
      Key: { sub },
      ProjectionExpression: 'username, thumbnailURL'
    };

    return this.docClient.get(params)
      .promise()
      .then(data => {
        const item = data.Item;
        if (item === undefined) { return undefined; }
        return { sub, ...item } as MeT;
      });
  }
}
