import { CreateUser, CreateUserInput } from '../../../domain/useCases/users';
import { Encrypt } from '../../protocols/encrypter';
import {
  CreateUserRepository,
  FindUserByEmailRepository,
} from '../../repositories/users';

export class CreateUserService implements CreateUser {
  constructor(
    private readonly findUserByEmailRepository: FindUserByEmailRepository,
    private readonly createUserRepository: CreateUserRepository,
    private readonly encrypt: Encrypt,
  ) {}

  async execute(input: CreateUserInput): Promise<void> {
    const userEmailAlreadyExist = await this.findUserByEmailRepository.execute(
      input.email,
    );

    if (userEmailAlreadyExist) throw new Error('Email já cadastrado.');

    const newPassword = this.encrypt.execute(input.password);

    await this.createUserRepository.execute(
      Object.assign(input, { password: newPassword }),
    );
  }
}
