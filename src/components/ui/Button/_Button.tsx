import { forwardRef } from 'react';
import * as React from 'react';

import { Slot } from '@radix-ui/react-slot';
import { VariantProps } from 'class-variance-authority';

import { cn } from '_utils';

import buttonVariants from './_Button.variants.ts';

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  myCustomEvent?: (count: number) => void;
}

function ButtonInner(
  { className, variant, size, shadow, asChild = false, ...props }: ButtonProps,
  ref: React.ForwardedRef<HTMLButtonElement>
) {
  const Comp = asChild ? Slot : 'button';
  return (
    <Comp
      className={cn(buttonVariants({ variant, size, shadow }), className)}
      ref={ref}
      {...props}
    />
  );
}

const Button = forwardRef(ButtonInner);

export default Button;
