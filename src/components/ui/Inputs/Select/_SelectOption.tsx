import React, { forwardRef } from 'react';

import { Listbox, ListboxOptionProps } from '@headlessui/react';
import { FieldValues } from 'react-hook-form';

import { cn } from '_utils';

function SelectOptionInner<TOption extends FieldValues>(
  { className, ...props }: ListboxOptionProps<'ul', TOption>,
  ref: React.ForwardedRef<React.ElementRef<typeof Listbox.Option>>
) {
  return (
    <Listbox.Option
      ref={ref}
      className={cn(
        `ui-active:ui-not:text-base relative flex w-full cursor-pointer select-none items-center rounded-md px-4 
        py-3 text-base font-bold text-foreground outline-none ui-selected:bg-accent
        ui-selected:text-primary ui-active:text-base ui-active:ui-not-selected:bg-input/40
        ui-disabled:pointer-events-none ui-disabled:opacity-50`,
        className
      )}
      {...props}
    />
  );
}

const SelectOption = forwardRef(SelectOptionInner);

export default SelectOption;
