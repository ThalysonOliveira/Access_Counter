import { FindUserByEmailRepository } from '../../../../data/repositories/users';
import { User } from '../../../../domain/models';
import { docClient } from '../config';

export class FindUserByEmailRepositoryDynamoDb
  implements FindUserByEmailRepository
{
  async execute(email: string): Promise<User | any> {
    return docClient.get(
      {
        TableName: 'users',
        Key: {
          email,
        },
      },
      (error, data) => {
        if (error) {
          console.log(error);
        } else {
          return data.Item;
        }
      },
    );
  }
}
