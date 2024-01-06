import { User } from '../../../domain/models';
import { CreateUserInput } from '../../../domain/useCases/users';

export interface CreateUserRepository {
  execute: (input: CreateUserInput) => Promise<User>;
}
