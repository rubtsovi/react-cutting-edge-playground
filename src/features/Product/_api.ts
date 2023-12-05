import httpClient from '_config/httpClient';

import { Product } from './_models.ts';

export const fetchProductById = (id: number) => httpClient.get<Product>(`product/${id}`).response;

export const fetchProductList = () => httpClient.get<Product[]>('products').response;
