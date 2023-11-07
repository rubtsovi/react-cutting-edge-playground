import { forwardRef } from 'react';

import { commonInputVariants } from '_components/ui/Inputs/_Inputs.variants.ts';
import { cn } from '_utils';

function TextInputInner(
  { className, type, ...props }: React.InputHTMLAttributes<HTMLInputElement>,
  ref: React.ForwardedRef<HTMLInputElement>
) {
  return (
    <input
      type={type}
      className={cn(commonInputVariants(), 'max-h-12', className)}
      ref={ref}
      {...props}
    />
  );
}

const TextInput = forwardRef(TextInputInner);

export default TextInput;
