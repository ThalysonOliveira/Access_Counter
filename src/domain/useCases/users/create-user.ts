export interface CreateUserInput {
  name: string;
  email: string;
  password: string;
}

export interface CreateUser {
  execute: (input: CreateUserInput) => Promise<void>;
}
