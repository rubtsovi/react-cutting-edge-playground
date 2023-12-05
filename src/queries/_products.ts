import { useQuery } from '@tanstack/react-query';

import { fetchProductById } from '_features/Product';

export const productKeys = {
  all: ['products'] as const,
  details: () => [...productKeys.all, 'detail'] as const,
  detail: (id: number) => [...productKeys.details(), id] as const,
};

export function useProductDetailsQuery(id: number) {
  return useQuery({
    queryKey: productKeys.detail(id),
    queryFn: () => fetchProductById(id),
  });
}
