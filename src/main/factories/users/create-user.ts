import { CreateUserService } from '../../../data/services/users';
import {
  CreateUserRepositoryDynamoDb,
  FindUserByEmailRepositoryDynamoDb,
} from '../../../infra/databases/dynamodb/repositories';
import { EmailValidatorAdapter } from '../../../infra/protocols/email';
import { EncryptAdapter } from '../../../infra/protocols/encrypter';
import { CreateUserController } from '../../../presentation/controllers/users';
import { Controller } from '../../../presentation/protocols';

const SALT_ENCRYPT_NUMBER = 8;

export const makeCreateUser = (): Controller => {
  const findUserByEmailRepository = new FindUserByEmailRepositoryDynamoDb();
  const createUserRepository = new CreateUserRepositoryDynamoDb();
  const encrypt = new EncryptAdapter(SALT_ENCRYPT_NUMBER);
  const emailValidator = new EmailValidatorAdapter();

  const createUserService = new CreateUserService(
    findUserByEmailRepository,
    createUserRepository,
    encrypt,
  );

  return new CreateUserController(createUserService, emailValidator);
};
