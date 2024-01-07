import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { serverlessAdapter } from '../../adapters';
import { makeDetailUser } from '../../factories/users';

export const handler = (
  event: APIGatewayProxyEvent,
): Promise<APIGatewayProxyResult> => {
  return serverlessAdapter(makeDetailUser())(event);
};
