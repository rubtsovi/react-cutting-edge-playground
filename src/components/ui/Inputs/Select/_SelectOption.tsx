import React, { Fragment, forwardRef } from 'react';

import { Listbox, ListboxOptionProps } from '@headlessui/react';
import { FieldValues } from 'react-hook-form';

import Badge from '_components/ui/Badge';
import { cn } from '_utils';

import { useSelectContext } from './_selectContext.ts';

function SelectOptionInner<TOption extends FieldValues>(
  { className, as, children, ...props }: ListboxOptionProps<'ul', TOption>,
  ref: React.ForwardedRef<React.ElementRef<typeof Listbox.Option>>
) {
  const { horizontal } = useSelectContext();

  return (
    <Listbox.Option
      ref={ref}
      className={cn(
        `relative cursor-pointer select-none whitespace-nowrap transition
         ui-disabled:pointer-events-none ui-disabled:cursor-not-allowed ui-disabled:opacity-50`,
        className
      )}
      as={as ?? Fragment}
      {...props}
    >
      {bag => {
        const renderedChildren = typeof children === 'function' ? children(bag) : children;
        if (horizontal) {
          return (
            <Badge
              variant={bag.selected ? 'default' : 'outline'}
              className={cn('border', {
                'bg-primary/10': bag.active && !bag.selected,
                'bg-primary/70': bag.active && bag.selected,
              })}
            >
              {renderedChildren}
            </Badge>
          );
        }

        return (
          <div
            className={`ui-active:ui-not:text-base  ui-selected:ui-active:shadow-xs flex  items-center 
               rounded-md px-4 py-3 text-base font-bold text-foreground
               outline-none ui-selected:bg-accent ui-selected:text-primary
               ui-active:text-base ui-active:ui-not-selected:bg-input/40`}
          >
            {renderedChildren}
          </div>
        );
      }}
    </Listbox.Option>
  );
}

const SelectOption = forwardRef(SelectOptionInner);

export default SelectOption;
