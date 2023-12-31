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
  makeRequest<TResponse>(
    baseParams: RequestBaseParams,
    data?: Record<string, unknown>,
    options?: Record<string, unknown>
  ): ResponseObject<TResponse>;
  post<TResponse>(
    url: string,
    data: Record<string, unknown>,
    options?: Record<string, unknown>
  ): ResponseObject<TResponse>;
  get<TResponse>(
    url: string,
    params?: Record<string, unknown>,
    options?: Record<string, unknown>
  ): ResponseObject<TResponse>;
  setAuthToken(token: string | null): IHttpClient;
}

export type HttpClientFactory = new (baseUrl: string, token: string | null) => IHttpClient;
