import { forwardRef } from 'react';

import { cn } from '_utils';

export function CardHeaderInner(
  { className, ...props }: React.HTMLAttributes<HTMLDivElement>,
  ref: React.ForwardedRef<HTMLDivElement>
) {
  return (
    <div ref={ref} className={cn('flex flex-row space-x-4 px-6 py-8', className)} {...props} />
  );
}

const CardHeader = forwardRef(CardHeaderInner);

export default CardHeader;
