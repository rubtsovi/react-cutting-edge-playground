import { forwardRef } from 'react';

import { Listbox } from '@headlessui/react';

import { FormLabel } from '_components/ui/Form';
import { floatingLabelVariants } from '_components/ui/Inputs/_variants.ts';
import { cn } from '_utils';

import { useSelectContext } from './_selectContext.ts';

function SelectLabelInner(
  { className, ...props }: React.ComponentProps<typeof FormLabel>,
  ref: React.ForwardedRef<React.ComponentRef<typeof FormLabel>>
) {
  const { hasValue } = useSelectContext();
  return (
    <Listbox.Label
      as={FormLabel}
      ref={ref}
      className={cn(floatingLabelVariants({ state: hasValue ? 'floated' : 'idle' }), className)}
      {...props}
    />
  );
}

const SelectLabel = forwardRef(SelectLabelInner);

export default SelectLabel;
