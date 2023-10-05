import { forwardRef } from 'react';

import { Slot } from '@radix-ui/react-slot';

import Typography from '_components/ui/Typography';

interface CardTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  asChild?: boolean;
}

function CardTitleInner(
  { asChild, children, ...props }: CardTitleProps,
  ref: React.ForwardedRef<HTMLHeadingElement>
) {
  return asChild ? (
    <Slot ref={ref}>{children}</Slot>
  ) : (
    <Typography ref={ref} variant='h3' {...props}>
      {children}
    </Typography>
  );
}

const CardTitle = forwardRef(CardTitleInner);

export default CardTitle;
