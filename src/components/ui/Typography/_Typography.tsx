import React, { forwardRef } from 'react';

import { Slot } from '@radix-ui/react-slot';
import { VariantProps } from 'class-variance-authority';

import { cn } from '_utils';

import variants from './_variants.ts';

interface HeadingProps
  extends React.HTMLAttributes<HTMLHeadingElement>,
    VariantProps<typeof variants> {
  asChild?: boolean;
}

function TypographyInner(
  { className, asChild, variant, textColor, fontStyle, children }: HeadingProps,
  ref: React.ForwardedRef<HTMLHeadingElement>
) {
  const Component = asChild ? Slot : variant ?? 'div';
  return (
    <Component ref={ref} className={cn(variants({ variant, textColor, fontStyle }), className)}>
      {children}
    </Component>
  );
}

const Typography = forwardRef(TypographyInner);

export default Typography;
