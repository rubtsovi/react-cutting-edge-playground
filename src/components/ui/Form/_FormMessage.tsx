import React, { forwardRef } from 'react';

import Typography from '_components/ui/Typography';
import { cn } from '_utils';

import { useFormField } from './_Form.hooks.ts';

function FormMessageInner(
  { children, textColor, className, ...props }: React.ComponentPropsWithoutRef<typeof Typography>,
  ref: React.ForwardedRef<React.ElementRef<typeof Typography>>
) {
  const { error, formMessageId } = useFormField();
  const body = error ? String(error?.message) : children;
  const color = error ? 'destructive' : textColor;

  if (!body) {
    return null;
  }

  return (
    <Typography
      ref={ref}
      {...props}
      className={cn('text-sm', className)}
      textColor={color}
      id={formMessageId}
    >
      {body}
    </Typography>
  );
}

const FormMessage = forwardRef(FormMessageInner);

export default FormMessage;
