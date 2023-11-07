import { forwardRef } from 'react';

import Typography from '_components/ui/Typography';
import { cn } from '_utils';

import { useFormField } from './_Form.hooks.ts';

function FormDescriptionInner(
  { className, ...props }: React.ComponentPropsWithoutRef<typeof Typography>,
  ref: React.ForwardedRef<React.ElementRef<typeof Typography>>
) {
  const { formDescriptionId, error } = useFormField();
  return (
    <Typography
      {...props}
      className={cn('text-sm', className, error ? 'text-destructive' : null)}
      ref={ref}
      id={formDescriptionId}
    />
  );
}

const FormDescription = forwardRef(FormDescriptionInner);

export default FormDescription;
