import { Listbox, ListboxButtonProps } from '@headlessui/react';

import ControlAddon from '_components/ui/Inputs/_ControlAddon.tsx';
import SelectOpenIndicator from '_components/ui/Inputs/_SelectOpenIndicator.tsx';
import { commonInputVariants } from '_components/ui/Inputs/_variants.ts';
import { useFloatingPopoverContext } from '_context/FloatingPopoverContext';
import { cn } from '_utils';

function SelectTrigger({ className, children, ...props }: ListboxButtonProps<'button'>) {
  const { refs } = useFloatingPopoverContext();
  return (
    <Listbox.Button
      ref={refs.setReference}
      className={cn(commonInputVariants(), 'form-input', className)}
      {...props}
    >
      {({ open }) => {
        return (
          <>
            {children}
            <ControlAddon className='right-2'>
              <SelectOpenIndicator open={open} />
            </ControlAddon>
          </>
        );
      }}
    </Listbox.Button>
  );
}

export default SelectTrigger;
