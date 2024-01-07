import { User } from '../../../domain/models';
import { DetailUser } from '../../../domain/useCases/users';
import { FindUserByIdRepository } from '../../repositories/users';

export class DetailUserService implements DetailUser {
  constructor(
    private readonly findUserByIdRepository: FindUserByIdRepository,
  ) {}

  async execute(userId: string): Promise<Partial<User> | null> {
    const user = await this.findUserByIdRepository.execute(userId);

    if (user) return null;

    const { id, name, email } = user;

    return {
      id,
      name,
      email,
    };
  }
}
