import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { Controller } from '../../presentation/protocols';

export const serverlessAdapter = (controller: Controller) => {
  return async (
    event: APIGatewayProxyEvent,
  ): Promise<APIGatewayProxyResult> => {
    const params = event.pathParameters;

    const httpRequest = {
      body: JSON.parse(event.body!),
      params,
    };

    const response = await controller.handle(httpRequest);

    return {
      statusCode: response.statusCode,
      body: JSON.stringify(response.body),
    };
  };
};
