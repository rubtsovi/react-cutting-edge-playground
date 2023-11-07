import { forwardRef, useId } from 'react';

import { FormItemContext } from '_components/ui/Form/_Form.context.ts';
import { cn } from '_utils';

interface FormItemProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> {
  children: React.ReactNode | ((props: { id: string }) => React.ReactNode);
}

function FormItemInner(
  { className, children, ...props }: FormItemProps,
  ref: React.ForwardedRef<HTMLDivElement>
) {
  const id = useId();

  return (
    <FormItemContext.Provider value={{ id }}>
      <div ref={ref} className={cn('space-y-2', className)} {...props}>
        {typeof children === 'function' ? children({ id }) : children}
      </div>
    </FormItemContext.Provider>
  );
}

const FormItem = forwardRef(FormItemInner);

export default FormItem;
