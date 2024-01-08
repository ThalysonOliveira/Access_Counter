import { DetailUser } from '../../../domain/useCases/users';
import { badRequest, ok, serverError } from '../../helpers';
import { Controller, HttpRequest, HttpResponse } from '../../protocols';

export class DetailUserController implements Controller {
  constructor(private readonly detailUser: DetailUser) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const userParamsId = httpRequest.params.id;

      if (!userParamsId)
        return badRequest(new Error('O campo id é obrigatório.'));

      const user = await this.detailUser.execute(httpRequest.params.id);

      return ok({
        data: {
          user,
        },
      });
    } catch (error) {
      return serverError(error as Error);
    }
  }
}
