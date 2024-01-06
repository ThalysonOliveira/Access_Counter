import { CheckTotalAccessNumberService } from '../../../data/services/access';

import { TotalHitsAdapter } from '../../../infra/protocols/counter';
import { CheckTotalAccessNumberController } from '../../../presentation/controllers/access';
import { Controller } from '../../../presentation/protocols';

export const makeCheckTotalAccessNumber = (): Controller => {
  const totalHits = new TotalHitsAdapter();

  const checkTotalAccessNumberService = new CheckTotalAccessNumberService(
    totalHits,
  );

  return new CheckTotalAccessNumberController(checkTotalAccessNumberService);
};
