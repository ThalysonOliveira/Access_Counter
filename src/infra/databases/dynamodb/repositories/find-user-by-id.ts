import { FindUserByIdRepository } from '../../../../data/repositories/users';
import { User } from '../../../../domain/models';
import { docClient } from '../config';

export class FindUserByIdlRepositoryDynamoDb implements FindUserByIdRepository {
  async execute(userId: string): Promise<User> {
    return docClient
      .get({
        TableName: 'users',
        Key: {
          id: userId,
        },
      })
      .promise();
  }
}
