import { cva } from 'class-variance-authority';

import { tw } from '_utils';

const typographyVariants = cva('text-foreground', {
  variants: {
    variant: {
      h1: tw`text-4xl font-bold text-black`,
      h2: tw`text-3xl font-bold text-black`,
      h3: tw`text-2xl font-bold text-black`,
      h4: tw`text-xl font-bold text-black`,
      h5: tw`text-lg font-bold text-foreground`,
      h6: tw`text-base font-bold text-foreground`,
      div: tw`text-base`,
      p: tw`mb-4 text-base last:mb-0`,
      span: tw`text-base`,
    },
    textColor: {
      primary: tw`text-primary`,
      destructive: tw`text-destructive`,
      black: tw`text-black`,
      slate: tw`text-muted`,
    },
    fontStyle: {
      italic: tw`italic`,
      normal: tw`font-normal not-italic`,
      thin: tw`font-thin`,
      bold: tw`font-bold`,
      bolder: tw`font-black`,
    },
  },
  defaultVariants: {
    variant: 'div',
    // textColor: 'black',
    // fontStyle: 'normal',
  },
});

export default typographyVariants;
