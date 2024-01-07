import { User } from '../../models';

export interface DetailUser {
  execute: (userId: string) => Promise<Partial<User>>;
}
