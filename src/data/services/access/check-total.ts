import { CheckTotalAccessNumber } from '../../../domain/useCases/access';
import { TotalHits } from '../../protocols/counter';

export class CheckTotalAccessNumberService implements CheckTotalAccessNumber {
  constructor(private readonly totalHits: TotalHits) {}

  execute(): Promise<number> {
    return this.totalHits.execute();
  }
}
