import { cva } from 'class-variance-authority';

import { tw } from '_utils';

export const commonInputVariants = cva(
  tw`flex min-h-[3rem] w-full rounded-full border border-input bg-background px-6 py-3 
  text-base leading-5 ring-0 ring-offset-input transition-shadow focus:border-input focus:ring-2
  focus:ring-primary/30 disabled:cursor-not-allowed disabled:opacity-60`
);

export const invalidInputVariants = cva(
  tw`border-destructive text-destructive focus:border-destructive focus:ring-destructive/30`
);

export const floatingLabelVariants = cva(
  tw`absolute left-6 top-3 flex h-6 items-center transition-transform `,
  {
    variants: {
      state: {
        idle: tw`peer-placeholder-shown:translate-x-0 
  peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:cursor-text
  peer-focus:-translate-x-1 peer-focus:-translate-y-9 peer-focus:scale-85 peer-focus:cursor-default`,
        floated: tw`-translate-x-1 -translate-y-9 scale-85 cursor-default`,
      },
    },
    defaultVariants: {
      state: 'idle',
    },
  }
);

export const selectTriggerVariants = cva(
  tw`group form-input relative max-h-6 items-center justify-between
  data-open:border-input data-open:ring-2 data-open:ring-primary/30`
);
