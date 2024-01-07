import assert from 'node:assert';
import { DetailUser } from '../../../domain/useCases/users';
import { DetailUserController } from '../../../presentation/controllers/users';
import { badRequest, ok } from '../../../presentation/helpers';
import { User } from '../../../domain/models';

interface SutTypes {
  sut: DetailUserController;
  detailUserStub: DetailUser;
}

const makeUser = (): User => ({
  id: 'any_id',
  name: 'any_name',
  email: 'any_email@email.com',
  password: 'any_password',
});

const makeDetailUser = () => {
  class DetailUserStub implements DetailUser {
    async execute(): Promise<Partial<User> | null> {
      return new Promise((resolve) => resolve(makeUser()));
    }
  }

  return new DetailUserStub();
};

const makeSut = (): SutTypes => {
  const detailUserStub = makeDetailUser();
  const sut = new DetailUserController(detailUserStub);

  return { detailUserStub, sut };
};

describe('Detail User Controller', () => {
  it('Should return bad request if user id is not provided', async () => {
    const { sut } = makeSut();

    const httpRequest = {
      params: {},
    };

    const response = await sut.handle(httpRequest);

    assert.deepEqual(
      response,
      badRequest(new Error('O campo id é obrigatório.')),
    );
  });

  it('Should return data user if user id are provided', async () => {
    const { sut } = makeSut();

    const httpRequest = {
      params: {
        id: 'any_id',
      },
    };

    const response = await sut.handle(httpRequest);

    assert.deepEqual(
      response,
      ok({
        data: {
          user: makeUser(),
        },
      }),
    );
  });
});
