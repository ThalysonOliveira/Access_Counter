import { User } from '../../../domain/models';

export interface FindUserByEmailRepository {
  execute: (email: string) => Promise<User>;
}
