import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { serverlessAdapter } from '../../adapters';
import { makeIncrementAccessNumber } from '../../factories/access';

export const handler = (
  event: APIGatewayProxyEvent,
): Promise<APIGatewayProxyResult> => {
  return serverlessAdapter(makeIncrementAccessNumber())(event);
};
