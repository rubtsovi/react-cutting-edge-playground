import React from 'react';

import { GetItemPropsOptions } from 'downshift';
import { FieldValues } from 'react-hook-form';

import Badge from '_components/ui/Badge';
import { cn, tw } from '_utils';

import { useSelectContext } from './_SelectContext.ts';

type SelectOptionProps<TOption extends FieldValues> = Omit<
  GetItemPropsOptions<TOption>,
  keyof React.HTMLProps<HTMLElement>
>;

function SelectOption<T extends FieldValues = FieldValues>({
  isSelected,
  index,
  ...itemProps
}: SelectOptionProps<T>) {
  const { getItemProps, highlightedIndex, labelGetter, horizontal } = useSelectContext();
  const label = labelGetter?.(itemProps.item);
  return (
    <div {...getItemProps(itemProps)}>
      {horizontal ? (
        <Badge
          variant={isSelected ? 'default' : 'outline'}
          className={cn('cursor-pointer border hover:bg-primary/10', {
            'bg-primary/10': highlightedIndex === index && !isSelected,
            'bg-primary/70 text-white': highlightedIndex === index && isSelected,
            'text-white hover:bg-primary/70': isSelected,
          })}
        >
          {label}
        </Badge>
      ) : (
        <div
          className={cn(
            tw`relative cursor-pointer select-none whitespace-nowrap transition`,
            tw`flex items-center rounded-md px-4 py-3 text-base font-bold text-foreground outline-none`,
            {
              [tw`bg-accent text-primary`]: isSelected,
              [tw`bg-input/40`]: highlightedIndex === index,
            }
          )}
        >
          {label}
        </div>
      )}
    </div>
  );
}

export default SelectOption;
