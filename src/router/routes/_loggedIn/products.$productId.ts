import { FileRoute } from '@tanstack/react-router';

import { fetchProductById, productQueryKeys } from '_features/Product';
import ProductDetails from '_src/pages/ProductDetails';

export const route = new FileRoute('/_loggedIn/products/$productId').createRoute({
  component: ProductDetails,
  loader: async ({ params: { productId }, context: { queryClient } }) => {
    const id = parseInt(productId);
    await queryClient.ensureQueryData({
      queryKey: productQueryKeys.detail(id),
      queryFn: () => fetchProductById(id),
    });
  },
});
