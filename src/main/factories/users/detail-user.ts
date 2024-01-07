import { DetailUserService } from '../../../data/services/users';
import { FindUserByIdlRepositoryDynamoDb } from '../../../infra/databases/dynamodb/repositories';
import { DetailUserController } from '../../../presentation/controllers/users';
import { Controller } from '../../../presentation/protocols';

export const makeDetailUser = (): Controller => {
  const findUserByIdRepository = new FindUserByIdlRepositoryDynamoDb();

  const detailUserService = new DetailUserService(findUserByIdRepository);

  return new DetailUserController(detailUserService);
};
