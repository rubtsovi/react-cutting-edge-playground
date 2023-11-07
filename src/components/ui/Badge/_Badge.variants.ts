import { cva } from 'class-variance-authority';

import { outlineVariants, solidVariants } from '_components/ui/commonVariants.ts';
import { tw } from '_utils';

const badgeVariants = cva(
  tw`relative inline-flex items-center justify-between whitespace-nowrap rounded-full font-bold`,
  {
    variants: {
      variant: {
        default: solidVariants({ variant: 'default' }),
        secondary: solidVariants({ variant: 'secondary' }),
        destructive: solidVariants({ variant: 'destructive' }),
        outline: outlineVariants({ variant: 'default', className: 'border-input' }),
        'outline-secondary': outlineVariants({ variant: 'secondary' }),
        'outline-destructive': outlineVariants({ variant: 'destructive' }),
      },
      size: {
        default: tw`h-8 px-6 text-base`,
        sm: tw`h-6 px-3 text-sm`,
        icon: tw`max-w-8 h-8 max-h-8 w-8 justify-center text-sm`,
        'icon-sm': tw`max-w-6 h-6 max-h-6 w-6 justify-center text-sm`,
        'icon-lg': tw`max-w-12 h-12 max-h-12 w-12 justify-center text-sm`,
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
    compoundVariants: [
      {
        variant: ['outline', 'outline-destructive', 'outline-secondary'],
        size: ['sm', 'icon-sm'],
        className: 'border',
      },
    ],
  }
);

export default badgeVariants;
