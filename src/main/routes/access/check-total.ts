import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { serverlessAdapter } from '../../adapters';
import { makeCheckTotalAccessNumber } from '../../factories/access';

export const handler = (
  event: APIGatewayProxyEvent,
): Promise<APIGatewayProxyResult> => {
  return serverlessAdapter(makeCheckTotalAccessNumber())(event);
};
