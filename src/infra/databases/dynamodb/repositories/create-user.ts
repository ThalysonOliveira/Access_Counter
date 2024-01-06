import { CreateUserRepository } from '../../../../data/repositories/users';
import { User } from '../../../../domain/models';
import { CreateUserInput } from '../../../../domain/useCases/users';
import { docClient } from '../config';
import { randomUUID } from 'node:crypto';

export class CreateUserRepositoryDynamoDb implements CreateUserRepository {
  async execute(input: CreateUserInput): Promise<User> {
    await docClient
      .put({
        TableName: 'users',
        Item: {
          ...input,
          id: randomUUID(),
        },
      })
      .promise();
  }
}
