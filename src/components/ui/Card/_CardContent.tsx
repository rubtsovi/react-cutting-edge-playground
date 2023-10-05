import { forwardRef } from 'react';

import { cn } from '_utils';

function CardContentInner(
  { className, ...props }: React.HTMLAttributes<HTMLDivElement>,
  ref: React.ForwardedRef<HTMLDivElement>
) {
  return <div ref={ref} className={cn('p-6 pt-0', className)} {...props} />;
}

const CardContent = forwardRef(CardContentInner);

export default CardContent;
