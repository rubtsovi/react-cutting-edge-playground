const METHOD = {
  GET: 'get',
  POST: 'post',
} as const;

export type HttpMethod = EnumLikeValues<typeof METHOD>;

export interface RequestBaseParams {
  url: string;
  method: HttpMethod;
}

export interface ResponseObject<T> {
  response: Promise<T>;
  abortController: AbortController;
}

export interface IHttpClient {
  makeRequest<TResponse, TRequest extends Record<string, unknown> | URLSearchParams>(
    baseParams: RequestBaseParams,
    data?: TRequest,
    options?: Record<string, unknown>
  ): ResponseObject<TResponse>;
  post<TResponse, TRequest extends Record<string, unknown>>(
    url: string,
    data: TRequest,
    options?: Record<string, unknown>
  ): ResponseObject<TResponse>;
  get<TResponse, TRequest extends URLSearchParams>(
    url: string,
    params?: TRequest,
    options?: Record<string, unknown>
  ): ResponseObject<TResponse>;
}

export type HttpClientFactory = new (baseUrl: string) => IHttpClient;
