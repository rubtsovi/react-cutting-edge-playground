import { cva } from 'class-variance-authority';

import { tw } from '_utils';

const cardVariants = cva('rounded-lg text-card-foreground', {
  variants: {
    variant: {
      contained: tw`border-none bg-card`,
      outlined: tw`border-2 border-card bg-background`,
    },
    shadow: {
      none: tw`shadow-none`,
      default: tw`shadow`,
      sm: tw`shadow-sm`,
      hover: tw`hover:shadow`,
      'hover-sm': tw`hover:shadow-sm`,
    },
  },
  defaultVariants: {
    variant: 'contained',
    shadow: 'none',
  },
  compoundVariants: [
    {
      shadow: ['default', 'sm', 'hover-sm', 'hover'],
      className: 'transition-shadow',
    },
  ],
});

export default cardVariants;
