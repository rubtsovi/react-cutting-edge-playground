import { IHttpClient, RequestBaseParams, ResponseObject } from '_models/httpClient.ts';

class FetchApiClient implements IHttpClient {
  constructor(private _baseUrl: string) {}

  private _handleGetParams(params: URLSearchParams, data: Record<string, unknown>) {
    Object.entries(data).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach(v => {
          params.append(key, handleSingleParam(v));
        });
        return;
      }

      params.set(key, handleSingleParam(value));
    });

    function handleSingleParam(value: unknown) {
      switch (typeof value) {
        case 'string':
          return value;
        case 'boolean':
          return value ? 'true' : 'false';
        case 'bigint':
        case 'number':
          return value.toString(10);
        case 'object':
          if (Array.isArray(value)) {
            return '';
          }
          if (value === null) {
            return '';
          }
          return encodeURIComponent(JSON.stringify(value));
        case 'function':
        case 'symbol':
        case 'undefined':
          return '';
      }
    }
  }

  public makeRequest<TResponse>(
    { url, method }: RequestBaseParams,
    data?: Record<string, unknown>
  ): ResponseObject<TResponse> {
    const abortController = new AbortController();
    const requestUrl = new URL(`${this._baseUrl}/${url}`);
    if (method === 'get') {
      this._handleGetParams(requestUrl.searchParams, data ?? {});
    }
    const response = fetch(requestUrl, {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      signal: abortController.signal,
      body: method === 'get' ? undefined : JSON.stringify(data),
    });
    return {
      response: response.then(r => r.json()) as Promise<TResponse>,
      abortController: abortController,
    };
  }

  public get<TResponse>(url: string, params?: Record<string, unknown>) {
    return this.makeRequest<TResponse>({ url, method: 'get' }, params);
  }

  public post<TResponse>(url: string, data: Record<string, unknown>) {
    return this.makeRequest<TResponse>({ url, method: 'post' }, data);
  }
}

export default FetchApiClient;
