import React from 'react';

import { GetItemPropsOptions } from 'downshift';
import { FieldValues } from 'react-hook-form';

import Badge from '_components/ui/Badge';
import { cn, tw } from '_utils';

import { useSelectContext } from './_Select.context.ts';

type SelectOptionProps<TOption extends FieldValues> = Omit<
  GetItemPropsOptions<TOption>,
  keyof React.HTMLProps<HTMLElement> | 'isSelected'
>;

function SelectOption<T extends FieldValues = FieldValues>({
  index,
  ...itemProps
}: SelectOptionProps<T>) {
  const selectContextValue = useSelectContext<T>();
  const label = selectContextValue.labelGetter?.(itemProps.item);
  let isOptionSelected: boolean;
  if (selectContextValue.multiple) {
    isOptionSelected = selectContextValue.selectedItems.includes(itemProps.item);
  } else {
    isOptionSelected = selectContextValue.selectedItem === itemProps.item;
  }
  return (
    <div
      {...selectContextValue.getItemProps({
        ...itemProps,
        onClick() {
          if (isOptionSelected && selectContextValue.multiple) {
            selectContextValue.removeSelectedItem(itemProps.item);
          }
        },
      })}
    >
      {selectContextValue.horizontal ? (
        <Badge
          variant={isOptionSelected ? 'default' : 'outline'}
          className={cn('cursor-pointer border hover:bg-primary/10', {
            'bg-primary/10': selectContextValue.highlightedIndex === index && !isOptionSelected,
            'bg-primary/70 text-white':
              selectContextValue.highlightedIndex === index && isOptionSelected,
            'text-white hover:bg-primary/70': isOptionSelected,
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
              [tw`bg-accent text-primary`]: isOptionSelected,
              [tw`bg-input/40`]: selectContextValue.highlightedIndex === index,
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
