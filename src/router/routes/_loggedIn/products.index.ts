import { FileRoute } from '@tanstack/react-router';

import { fetchProductList } from '_features/Product';
import ProductList from '_src/pages/Products';

export const route = new FileRoute('/_loggedIn/products/').createRoute({
  component: ProductList,
  loader: () => fetchProductList(),
});
