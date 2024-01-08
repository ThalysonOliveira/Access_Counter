import { FindUserByIdRepository } from '../../../../data/repositories/users';
import { User } from '../../../../domain/models';
import { docClient } from '../config';

export class FindUserByIdlRepositoryDynamoDb implements FindUserByIdRepository {
  async execute(userId: string): Promise<User | any> {
    return docClient.get(
      {
        TableName: 'users',
        Key: {
          id: userId,
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
