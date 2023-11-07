import { forwardRef } from 'react';

import TextareaAutosize from 'react-textarea-autosize';

import { cn } from '_utils';

import { commonInputVariants } from './_Inputs.variants.ts';

function TextareaInner(
  { className, ...props }: React.ComponentPropsWithoutRef<typeof TextareaAutosize>,
  ref: React.ForwardedRef<HTMLTextAreaElement>
) {
  return (
    <TextareaAutosize
      className={cn(commonInputVariants(), 'rounded-3xl', className)}
      ref={ref}
      {...props}
    />
  );
}

const Textarea = forwardRef(TextareaInner);

export default Textarea;
