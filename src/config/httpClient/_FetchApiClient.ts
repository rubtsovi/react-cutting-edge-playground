import { IHttpClient, RequestBaseParams, ResponseObject } from '_models/httpClient.ts';

class FetchApiClient implements IHttpClient {
  constructor(private _baseUrl: string) {}

  public makeRequest<TResponse, TRequest extends Record<string, unknown> | URLSearchParams>(
    { url, method }: RequestBaseParams,
    data?: TRequest
  ): ResponseObject<TResponse> {
    const abortController = new AbortController();
    const response = fetch(`${this._baseUrl}/${url}`, {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      signal: abortController.signal,
      body: data instanceof URLSearchParams || typeof data === 'undefined' ? data : JSON.stringify(data),
    });
    return {
      response: response.then(r => r.json()) as Promise<TResponse>,
      abortController: abortController,
    };
  }

  public get<TResponse, TRequest extends URLSearchParams>(url: string, params?: TRequest) {
    return this.makeRequest<TResponse, TRequest>({ url, method: 'get' }, params);
  }

  public post<TResponse, TRequest extends Record<string, unknown>>(url: string, data: TRequest) {
    return this.makeRequest<TResponse, TRequest>({ url, method: 'post' }, data);
  }
}

export default FetchApiClient;
