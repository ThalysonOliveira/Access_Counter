import { FindUserByEmailRepository } from '../../../../data/repositories/users';
import { User } from '../../../../domain/models';
import { docClient } from '../config';

export class FindUserByEmailRepositoryDynamoDb
  implements FindUserByEmailRepository
{
  async execute(email: string): Promise<User> {
    return docClient
      .get({
        TableName: 'users',
        Key: {
          email,
        },
      })
      .promise();
  }
}
