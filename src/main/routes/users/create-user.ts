import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { serverlessAdapter } from '../../adapters';
import { makeCreateUser } from '../../factories/users';

export const handler = (
  event: APIGatewayProxyEvent,
): Promise<APIGatewayProxyResult> => {
  return serverlessAdapter(makeCreateUser())(event);
};
