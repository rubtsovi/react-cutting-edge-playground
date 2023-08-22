import { HttpClientFactory } from '_models/httpClient.ts';

function initHttpClient(client: HttpClientFactory) {
  return new client('https://jsonplaceholder.typicode.com');
}

export default initHttpClient;
