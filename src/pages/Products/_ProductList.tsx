import { Link } from '@tanstack/react-router';

import Typography from '_components/ui/Typography';

const fakeProducts = [
  {
    id: 1,
    name: 'Product 1',
  },
  {
    id: 2,
    name: 'Product 2',
  },
  {
    id: 3,
    name: 'Product 3',
  },
  {
    id: 4,
    name: 'Product 4',
  },
];

function ProductList() {
  return (
    <div>
      <Typography variant='h2'>Product list</Typography>
      <ul>
        {fakeProducts.map(p => (
          <li key={p.id}>
            <Link to='/products/$productId' params={{ productId: `${p.id}` }} search={{}}>
              {p.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProductList;
