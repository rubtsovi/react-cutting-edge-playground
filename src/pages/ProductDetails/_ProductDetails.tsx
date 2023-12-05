import { useParams } from '@tanstack/react-router';

import Typography from '_components/ui/Typography';
import { useProductDetails } from '_features/Product';
import { route as productDetailsRoute } from '_routes/_loggedIn/products.$productId';

function ProductDetails() {
  const { productId } = useParams({ from: productDetailsRoute.id });
  const { data } = useProductDetails(parseInt(productId));
  if (data) {
    return (
      <div>
        <Typography variant='h3'>{data.title}</Typography>
        <Typography variant='h5' textColor='primary'>
          {data.category}
        </Typography>
        <Typography variant='div'>{data.description}</Typography>
      </div>
    );
  }
  return <div>Product not found</div>;
}

export default ProductDetails;
