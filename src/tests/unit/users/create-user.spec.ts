import assert from 'node:assert';
import { CreateUser } from '../../../domain/useCases/users';
import { EmailValidate } from '../../../presentation/protocols';
import { CreateUserController } from '../../../presentation/controllers/users';
import { badRequest } from '../../../presentation/helpers';

interface SutTypes {
  sut: CreateUserController;
  createUser: CreateUser;
  emailValidate: EmailValidate;
}

const makeCreateUser = () => {
  class CreateUserStub implements CreateUser {
    async execute(): Promise<void> {
      await new Promise((resolve) => resolve);
    }
  }

  return new CreateUserStub();
};

const makeEmailValidator = () => {
  class EmailValidatorStub implements EmailValidate {
    execute(): boolean {
      return true;
    }
  }

  return new EmailValidatorStub();
};

const makeSut = (): SutTypes => {
  const createUser = makeCreateUser();
  const emailValidate = makeEmailValidator();
  const sut = new CreateUserController(createUser, emailValidate);

  return { createUser, emailValidate, sut };
};

describe('Create User Controller', () => {
  it('Should return bad request if name is not provided', async () => {
    const { sut } = makeSut();

    const httpRequest = {
      body: {
        email: 'any_email@email.com',
        password: 'any_password',
      },
    };

    const response = await sut.handle(httpRequest);

    assert.deepEqual(
      response,
      badRequest(new Error('O campo name é obrigatório.')),
    );
  });

  it('Should return bad request if email is not provided', async () => {
    const { sut } = makeSut();

    const httpRequest = {
      body: {
        name: 'any_name',
        password: 'any_password',
      },
    };

    const response = await sut.handle(httpRequest);

    assert.deepEqual(
      response,
      badRequest(new Error('O campo email é obrigatório.')),
    );
  });

  it('Should return bad request if password is not provided', async () => {
    const { sut } = makeSut();

    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_email@email.com',
      },
    };

    const response = await sut.handle(httpRequest);

    assert.deepEqual(
      response,
      badRequest(new Error('O campo password é obrigatório.')),
    );
  });
});
