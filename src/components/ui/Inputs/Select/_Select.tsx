import { size } from '@floating-ui/react-dom';
import { Listbox, ListboxProps } from '@headlessui/react';
import { FieldValues } from 'react-hook-form';

import { FloatingPopover } from '_context/FloatingPopoverContext';
import { cn } from '_utils';

function Select<TValue extends FieldValues = FieldValues>({
  className,
  children,
  ...props
}: ListboxProps<
  'div',
  TValue | TValue[] | null,
  keyof TValue | ((a: TValue, z: TValue) => boolean)
>) {
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
          {typeof children === 'function' ? children(bag) : children}
        </FloatingPopover>
      )}
    </Listbox>
  );
}

export default Select;
