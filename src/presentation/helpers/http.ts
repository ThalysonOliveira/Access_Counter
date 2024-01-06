import { HttpResponse } from '../protocols/http';

export const badRequest = (error: Error): HttpResponse => ({
  statusCode: 400,
  body: error,
  success: false,
});

export const serverError = (error: Error): HttpResponse => ({
  statusCode: 500,
  body: error,
  success: false,
});

export const ok = (data: any): HttpResponse => ({
  statusCode: 200,
  body: data,
  success: true,
});
