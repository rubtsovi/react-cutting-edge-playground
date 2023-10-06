import { useMemo } from 'react';

import { size } from '@floating-ui/react-dom';
import { Listbox, ListboxProps } from '@headlessui/react';
import { FieldValues } from 'react-hook-form';

import { FloatingPopover } from '_context/FloatingPopoverContext';
import { cn } from '_utils';

import { SelectContext, useSelectContext } from './_selectContext.ts';

function Select<TValue extends FieldValues = FieldValues>({
  className,
  children,
  ...props
}: ListboxProps<
  'div',
  TValue | TValue[] | null,
  keyof TValue | ((a: TValue, z: TValue) => boolean)
>) {
  const providerValue = useMemo<ReturnType<typeof useSelectContext>>(
    () => ({
      horizontal: props.horizontal ?? false,
      hasValue: props.multiple ? (props.value ?? []).length > 0 : Boolean(props.value),
    }),
    [props.horizontal, props.multiple, props.value]
  );

  return (
    <Listbox className={cn(className)} {...props}>
      {bag => (
        <FloatingPopover
          open={bag.open}
          modal={false}
          placement='bottom'
          flipOptions={{ fallbackAxisSideDirection: 'none' }}
          middleware={[
            size({
              apply({ availableHeight, elements, rects }) {
                Object.assign(elements.floating.style, {
                  width: `${rects.reference.width}px`,
                  maxHeight: `${Math.min(availableHeight, window.innerHeight * 0.3333)}px`,
                });
              },
            }),
          ]}
        >
          <SelectContext.Provider value={providerValue}>
            {typeof children === 'function' ? children(bag) : children}
          </SelectContext.Provider>
        </FloatingPopover>
      )}
    </Listbox>
  );
}

export default Select;
