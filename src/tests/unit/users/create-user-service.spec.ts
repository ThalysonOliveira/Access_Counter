import assert from 'node:assert';
import { CreateUserService } from '../../../data/services/users';
import {
  CreateUserRepository,
  FindUserByEmailRepository,
} from '../../../data/repositories/users';
import { Encrypt } from '../../../data/protocols/encrypter';
import { User } from '../../../domain/models';

interface SutTypes {
  sut: CreateUserService;
  findUserByEmailRepositoryStub: FindUserByEmailRepository;
  createUserRepositoryStub: CreateUserRepository;
  encryptStub: Encrypt;
}

const makeUser = (): User => ({
  id: 'any_id',
  name: 'any_name',
  email: 'any_email@email.com',
  password: 'any_password',
});

const makeFindUserByEmailRepository = () => {
  class FindUserByEmailRepositoryStub implements FindUserByEmailRepositoryStub {
    async execute(): Promise<User> {
      return await new Promise((resolve) => resolve(null as any));
    }
  }

  return new FindUserByEmailRepositoryStub();
};

const makeCreateUserRepository = () => {
  class CreateUserRepositoryStub implements CreateUserRepository {
    execute(): Promise<User> {
      return new Promise((resolve) => resolve(makeUser()));
    }
  }

  return new CreateUserRepositoryStub();
};

const makeEncrypt = () => {
  class EncryptStub implements Encrypt {
    execute(): string {
      return 'hashed_password';
    }
  }

  return new EncryptStub();
};

const makeSut = (): SutTypes => {
  const findUserByEmailRepositoryStub = makeFindUserByEmailRepository();
  const createUserRepositoryStub = makeCreateUserRepository();
  const encryptStub = makeEncrypt();
  const sut = new CreateUserService(
    findUserByEmailRepositoryStub,
    createUserRepositoryStub,
    encryptStub,
  );

  return {
    findUserByEmailRepositoryStub,
    createUserRepositoryStub,
    encryptStub,
    sut,
  };
};

describe('Create User Service', () => {
  test('Should call Encrypt with correct password', async () => {
    const { encryptStub, sut } = makeSut();

    const encryptSpy = jest.spyOn(encryptStub, 'execute');

    const userInput = {
      name: 'any_name',
      email: 'any_email@email.com',
      password: 'any_password',
    };

    await sut.execute(userInput);

    assert.call(encryptSpy, 'any_password');
  });
});
