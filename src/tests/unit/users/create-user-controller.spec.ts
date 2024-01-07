import assert from 'node:assert';
import { CreateUser } from '../../../domain/useCases/users';
import { EmailValidate } from '../../../presentation/protocols';
import { CreateUserController } from '../../../presentation/controllers/users';
import { badRequest, ok, serverError } from '../../../presentation/helpers';

interface SutTypes {
  sut: CreateUserController;
  createUserStub: CreateUser;
  emailValidateStub: EmailValidate;
}

const makeCreateUser = () => {
  class CreateUserStub implements CreateUser {
    async execute(): Promise<void> {
      return await new Promise((resolve) => resolve());
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
  const createUserStub = makeCreateUser();
  const emailValidateStub = makeEmailValidator();
  const sut = new CreateUserController(createUserStub, emailValidateStub);

  return { createUserStub, emailValidateStub, sut };
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

  it('Should return bad request if email is not valid', async () => {
    const { sut, emailValidateStub } = makeSut();

    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_email@email.com',
        password: 'any_password',
      },
    };

    jest.spyOn(emailValidateStub, 'execute').mockReturnValueOnce(false);

    const response = await sut.handle(httpRequest);

    assert.deepEqual(response, badRequest(new Error('Email invalido.')));
  });

  it('Should return server error if CreateUser throw', async () => {
    const { sut, createUserStub } = makeSut();

    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_email@email.com',
        password: 'any_password',
      },
    };

    jest
      .spyOn(createUserStub, 'execute')
      .mockReturnValueOnce(
        new Promise((_resolve, reject) => reject(new Error())),
      );

    const response = await sut.handle(httpRequest);

    assert.deepEqual(response, serverError(new Error()));
  });

  it('Should return ok if valid data are provided', async () => {
    const { sut } = makeSut();

    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_email@email.com',
        password: 'any_password',
      },
    };

    const response = await sut.handle(httpRequest);

    assert.deepEqual(
      response,
      ok({
        data: {
          message: 'Usuário criado com sucesso.',
        },
      }),
    );
  });
});
