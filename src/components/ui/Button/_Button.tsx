import { forwardRef } from 'react';
import * as React from 'react';

import { Slot } from '@radix-ui/react-slot';
import { VariantProps } from 'class-variance-authority';
import { Loader } from 'lucide-react';

import FadeAnimation from '_components/animations/FadeAnimation';
import { cn } from '_utils';

import buttonVariants from './_Button.variants.ts';

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  loading?: boolean;
}

function ButtonInner(
  {
    className,
    variant,
    size,
    shadow,
    children,
    loading = false,
    asChild = false,
    ...props
  }: ButtonProps,
  ref: React.ForwardedRef<HTMLButtonElement>
) {
  const Comp = asChild ? Slot : 'button';
  return (
    <Comp className={cn(buttonVariants({ variant, size, shadow }), className)} ref={ref} {...props}>
      &nbsp;
      <FadeAnimation show={!loading}>{children}</FadeAnimation>
      &nbsp;
      <FadeAnimation show={loading} asChild>
        <div className='absolute inset-0 flex h-full w-full items-center justify-center'>
          <Loader size={24} className='animate-spin' />
        </div>
      </FadeAnimation>
    </Comp>
  );
}

const Button = forwardRef(ButtonInner);

export default Button;
