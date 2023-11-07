import { forwardRef } from 'react';

import { VariantProps } from 'class-variance-authority';

import { cn } from '_utils';

import cardVariants from './_Card.variants.ts';

function CardInner(
  {
    className,
    variant,
    shadow,
    ...props
  }: React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof cardVariants>,
  ref: React.ForwardedRef<HTMLDivElement>
) {
  return <div ref={ref} className={cn(cardVariants({ variant, shadow }), className)} {...props} />;
}

const Card = forwardRef(CardInner);

export default Card;
