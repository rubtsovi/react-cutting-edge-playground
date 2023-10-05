import React, { forwardRef } from 'react';

import { Slot } from '@radix-ui/react-slot';

import { useFormField } from './_hooks.ts';

function FormControlInner(
  { ...props }: React.ComponentPropsWithoutRef<typeof Slot>,
  ref: React.ForwardedRef<React.ElementRef<typeof Slot>>
) {
  const { error, formItemId, formDescriptionId, formMessageId } = useFormField();
  return (
    <Slot
      ref={ref}
      id={formItemId}
      aria-describedby={!error ? `${formDescriptionId}` : `${formDescriptionId} ${formMessageId}`}
      aria-invalid={Boolean(error)}
      {...props}
    />
  );
}

const FormControl = forwardRef(FormControlInner);

export default FormControl;
