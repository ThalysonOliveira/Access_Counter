import { IncrementAccessNumberService } from '../../../data/services/access';

import { IncrementAdapter } from '../../../infra/protocols/counter';
import { IncrementAccessNumberController } from '../../../presentation/controllers/access';
import { Controller } from '../../../presentation/protocols';

export const makeIncrementAccessNumber = (): Controller => {
  const increment = new IncrementAdapter();

  const incrementAccessNumberService = new IncrementAccessNumberService(
    increment,
  );

  return new IncrementAccessNumberController(incrementAccessNumberService);
};
