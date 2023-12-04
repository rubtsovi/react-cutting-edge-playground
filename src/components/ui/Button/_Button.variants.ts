import { cva } from 'class-variance-authority';

import { outlineVariants, solidVariants } from '_components/ui/commonVariants.ts';
import { tw } from '_utils';

const buttonVariants = cva(
  `relative inline-flex items-center justify-center rounded-full text-sm font-bold 
  uppercase transition focus-visible:outline-none focus-visible:ring-2 
  focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50`,
  {
    variants: {
      variant: {
        secondary: solidVariants({
          variant: 'secondary',
          className: tw`hover:bg-secondary/80 focus-visible:ring-secondary disabled:bg-muted disabled:text-muted-foreground`,
        }),
        default: solidVariants({
          variant: 'default',
          className: tw`hover:bg-primary/80 focus-visible:ring-primary disabled:bg-muted disabled:text-muted-foreground`,
        }),
        destructive: solidVariants({
          variant: 'destructive',
          className: tw`hover:bg-destructive/80 focus-visible:ring-destructive`,
        }),
        outline: outlineVariants({
          variant: 'default',
          className: tw`hover:border-primary hover:bg-primary/10 focus:bg-primary/10 focus-visible:ring-primary active:bg-primary/10
            disabled:border-muted disabled:text-muted`,
        }),
        'outline-destructive': outlineVariants({
          variant: 'destructive',
          className: tw`hover:border-destructive hover:bg-destructive/10 focus:bg-destructive/10 focus-visible:ring-destructive active:bg-destructive/10
            disabled:border-muted disabled:text-muted`,
        }),
        'outline-secondary': outlineVariants({
          variant: 'secondary',
          className: tw`hover:border-secondary hover:bg-secondary/10 focus:bg-secondary/10 focus-visible:ring-secondary active:bg-secondary/10
            disabled:border-muted disabled:text-muted`,
        }),
        ghost: tw`text-secondary hover:bg-accent hover:text-accent-foreground`,
        link: tw`text-primary underline-offset-4 hover:underline`,
      },
      size: {
        default: 'h-12 px-10 py-2',
        sm: 'h-8 px-6 py-2',
        lg: 'h-11 px-8',
        icon: 'h-12 w-12 rounded-lg',
        'icon-sm': 'h-8 w-8 rounded-lg',
      },
      shadow: {
        default: 'hover:shadow',
        sm: 'hover:shadow-sm',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
    compoundVariants: [
      {
        variant: ['default', 'outline'],
        shadow: ['default', 'sm'],
        className: 'hover:shadow-primary/20',
      },
      {
        variant: ['destructive', 'outline-destructive'],
        shadow: ['default', 'sm'],
        className: 'hover:shadow-destructive/20',
      },
      {
        variant: ['secondary', 'outline-secondary'],
        shadow: ['default', 'sm'],
        className: 'hover:shadow-secondary/20',
      },
      {
        variant: ['outline', 'outline-destructive'],
        shadow: ['default', 'sm'],
        className: 'hover:bg-background',
      },
    ],
  }
);

export default buttonVariants;
