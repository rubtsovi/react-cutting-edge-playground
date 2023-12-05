import { useQuery } from '@tanstack/react-query';

import { fetchProductById } from './_api.ts';
import keys from './_queryKeys.ts';

export function useProductDetails(id: number) {
  return useQuery({
    queryKey: keys.detail(id),
    queryFn: () => fetchProductById(id),
  });
}
