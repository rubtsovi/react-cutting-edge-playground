import { HttpClientFactory } from '_models/httpClient.ts';

function initHttpClient(client: HttpClientFactory) {
  return new client('https://dummyjson.com', localStorage.getItem('token'));
}

export default initHttpClient;
