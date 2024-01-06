export interface HttpResponse {
  statusCode: number;
  body: any;
  success: boolean;
}

export interface HttpRequest {
  body?: any;
}
