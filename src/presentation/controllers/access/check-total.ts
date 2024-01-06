import { CheckTotalAccessNumber } from '../../../domain/useCases/access';
import { ok, serverError } from '../../helpers';
import { Controller, HttpResponse } from '../../protocols';

export class CheckTotalAccessNumberController implements Controller {
  constructor(
    private readonly checkTotalAccessNumber: CheckTotalAccessNumber,
  ) {}

  async handle(): Promise<HttpResponse> {
    try {
      const totalHits = await this.checkTotalAccessNumber.execute();

      return ok({
        data: {
          totalHits,
        },
      });
    } catch (error) {
      return serverError(error);
    }
  }
}
