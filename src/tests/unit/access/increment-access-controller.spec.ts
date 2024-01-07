import assert from 'node:assert';
import { IncrementAccessNumber } from '../../../domain/useCases/access';
import { IncrementAccessNumberController } from '../../../presentation/controllers/access';
import { serverError } from '../../../presentation/helpers';

let INITIAL_NUMBER_ACCESS = 0;

interface SutTypes {
  sut: IncrementAccessNumberController;
  incrementAccessNumberStub: IncrementAccessNumber;
}

const makeIncrementAccessNumber = () => {
  class IncrementAccessNumberStub implements IncrementAccessNumber {
    async execute(): Promise<void> {
      INITIAL_NUMBER_ACCESS += 1;
      return await new Promise((resolve) => resolve());
    }
  }

  return new IncrementAccessNumberStub();
};

const makeSut = (): SutTypes => {
  const incrementAccessNumberStub = makeIncrementAccessNumber();
  const sut = new IncrementAccessNumberController(incrementAccessNumberStub);

  return { incrementAccessNumberStub, sut };
};

describe('Check Total Access Number Controller', () => {
  it('Should return server error if IncrementAccessNumber throw', async () => {
    const { sut, incrementAccessNumberStub } = makeSut();

    jest
      .spyOn(incrementAccessNumberStub, 'execute')
      .mockReturnValueOnce(
        new Promise((_resolve, reject) => reject(new Error())),
      );

    const response = await sut.handle();

    assert.deepEqual(response, serverError(new Error()));
  });

  it('Should increment access number', async () => {
    const { sut } = makeSut();

    await sut.handle();

    assert.equal(INITIAL_NUMBER_ACCESS, 1);
  });
});
