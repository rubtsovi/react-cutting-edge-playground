const productKeys = {
  all: [{ scope: 'products' }] as const,
  details: () => [{ ...productKeys.all[0], entity: 'detail' }] as const,
  detail: (id: number) => [{ ...productKeys.details()[0], id }] as const,
};

export default productKeys;
