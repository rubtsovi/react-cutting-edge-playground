import FetchApiClient from './_FetchApiClient.ts';
import initHttpClient from './_initHttpClient.ts';

const httpClient = initHttpClient(FetchApiClient);

export default httpClient;
