import { UseComboboxGetItemPropsOptions } from 'downshift';
import { FieldValues } from 'react-hook-form';

import { useSelectContext } from '_components/ui/Inputs/Select/_Select.context.ts';

export function useCommonItemPropsGetter<T extends FieldValues>(item: T) {
  const selectContextValue = useSelectContext<T>();
  let isOptionSelected = false;
  if (selectContextValue.multiple) {
    isOptionSelected = selectContextValue.selectedItems.includes(item);
  } else {
    isOptionSelected = selectContextValue.selectedItem === item;
  }

  return {
    getCommonItemProps: (props?: Omit<UseComboboxGetItemPropsOptions<T>, 'item'>) => {
      return selectContextValue.getItemProps({
        item,
        ...(props ?? {}),
        onClick(e: React.MouseEvent<HTMLDivElement>) {
          if (isOptionSelected && selectContextValue.multiple) {
            selectContextValue.removeSelectedItem(item);
          }

          props?.onClick?.(e);
        },
      });
    },
    isOptionSelected,
    highlightedIndex: selectContextValue.highlightedIndex,
  };
}
