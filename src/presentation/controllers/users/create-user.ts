import { CreateUser } from '../../../domain/useCases/users';
import { badRequest, ok, serverError } from '../../helpers';
import {
  Controller,
  EmailValidate,
  HttpRequest,
  HttpResponse,
} from '../../protocols';

export class CreateUserController implements Controller {
  constructor(
    private readonly createUser: CreateUser,
    private readonly emailValidator: EmailValidate,
  ) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const requiredFields = ['name', 'email', 'password'];

      for (const field of requiredFields) {
        if (!httpRequest.body[field])
          return badRequest(new Error(`O campo ${field} é obrigatório.`));
      }

      const emailIsValid = this.emailValidator.execute(httpRequest.body.email);

      if (!emailIsValid) {
        return badRequest(new Error('Email invalido.'));
      }

      await this.createUser.execute(httpRequest.body);

      return ok({
        data: {
          message: 'Usuário criado com sucesso.',
        },
      });
    } catch (error) {
      return serverError(error as Error);
    }
  }
}
