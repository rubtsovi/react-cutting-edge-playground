import { forwardRef } from 'react';

import * as LabelPrimitive from '@radix-ui/react-label';

import Label from '_components/ui/Label';
import { cn } from '_utils';

import { useFormField } from './_Form.hooks.ts';

function FormLabelInner(
  { className, ...props }: React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root>,
  ref: React.ForwardedRef<React.ElementRef<typeof LabelPrimitive.Root>>
) {
  const { error, formItemId } = useFormField();
  return (
    <Label
      ref={ref}
      className={cn(error && 'text-destructive', 'text-base font-bold', className)}
      htmlFor={formItemId}
      {...props}
    />
  );
}

const FormLabel = forwardRef(FormLabelInner);

export default FormLabel;
