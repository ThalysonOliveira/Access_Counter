import { DetailUser } from '../../../domain/useCases/users';
import { ok, serverError } from '../../helpers';
import { Controller, HttpRequest, HttpResponse } from '../../protocols';

export class DetailUserController implements Controller {
  constructor(private readonly detailUser: DetailUser) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const user = await this.detailUser.execute(httpRequest.params.id);

      return ok({
        data: {
          user,
        },
      });
    } catch (error) {
      return serverError(error);
    }
  }
}
