import { User } from '../../../domain/models';

export interface FindUserByIdRepository {
  execute: (userId: string) => Promise<User>;
}
