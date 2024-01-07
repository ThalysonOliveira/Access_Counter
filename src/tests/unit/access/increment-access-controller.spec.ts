import assert from 'node:assert';
import { IncrementAccessNumber } from '../../../domain/useCases/access';
import { IncrementAccessNumberController } from '../../../presentation/controllers/access';

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
  it('Should increment access number', async () => {
    const { sut } = makeSut();

    await sut.handle();

    assert.equal(INITIAL_NUMBER_ACCESS, 1);
  });
});
