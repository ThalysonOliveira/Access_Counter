import assert from 'node:assert';
import { ok, serverError } from '../../../presentation/helpers';
import { CheckTotalAccessNumber } from '../../../domain/useCases/access';
import { CheckTotalAccessNumberController } from '../../../presentation/controllers/access';

const NUMBER_ACCESS = 1;

interface SutTypes {
  sut: CheckTotalAccessNumberController;
  checkTotalAccessNumberStub: CheckTotalAccessNumber;
}

const makeCheckTotalAccessNumber = () => {
  class CheckTotalAccessNumberStub implements CheckTotalAccessNumber {
    async execute(): Promise<number> {
      return new Promise((resolve) => resolve(NUMBER_ACCESS));
    }
  }

  return new CheckTotalAccessNumberStub();
};

const makeSut = (): SutTypes => {
  const checkTotalAccessNumberStub = makeCheckTotalAccessNumber();
  const sut = new CheckTotalAccessNumberController(checkTotalAccessNumberStub);

  return { checkTotalAccessNumberStub, sut };
};

describe('Check Total Access Number Controller', () => {
  it('Should return server error if CheckTotalAccessNumber throw', async () => {
    const { sut, checkTotalAccessNumberStub } = makeSut();

    jest
      .spyOn(checkTotalAccessNumberStub, 'execute')
      .mockReturnValueOnce(
        new Promise((_resolve, reject) => reject(new Error())),
      );

    const response = await sut.handle();

    assert.deepEqual(response, serverError(new Error()));
  });
  it('Should return any numbers access', async () => {
    const { sut } = makeSut();

    const response = await sut.handle();

    assert.deepEqual(
      response,
      ok({
        data: {
          totalHits: NUMBER_ACCESS,
        },
      }),
    );
  });
});
