import { cva } from 'class-variance-authority';

import { tw } from '_utils';

export const solidVariants = cva(tw``, {
  variants: {
    variant: {
      default: tw`bg-primary text-primary-foreground`,
      secondary: tw`bg-secondary text-secondary-foreground`,
      destructive: tw`bg-destructive text-destructive-foreground`,
    },
  },
});

export const outlineVariants = cva(tw`border-2 bg-background`, {
  variants: {
    variant: {
      default: tw`border-primary/40 text-primary`,
      secondary: tw`border-secondary/40 text-secondary`,
      destructive: tw`border-destructive/40 text-destructive`,
    },
  },
});
