import { IncrementAccessNumber } from '../../../domain/useCases/access';
import { ok, serverError } from '../../helpers';
import { Controller, HttpResponse } from '../../protocols';

export class IncrementAccessNumberController implements Controller {
  constructor(private readonly incrementAccessNumber: IncrementAccessNumber) {}

  async handle(): Promise<HttpResponse> {
    try {
      await this.incrementAccessNumber.execute();

      return ok({
        data: {
          message: 'Número de acessos incrementado.',
        },
      });
    } catch (error) {
      return serverError(error as Error);
    }
  }
}
