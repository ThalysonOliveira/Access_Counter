import { IncrementAccessNumber } from '../../../domain/useCases/access';
import { Increment } from '../../protocols/counter';

export class IncrementAccessNumberService implements IncrementAccessNumber {
  constructor(private readonly increment: Increment) {}

  async execute(): Promise<void> {
    await this.increment.execute();
  }
}
