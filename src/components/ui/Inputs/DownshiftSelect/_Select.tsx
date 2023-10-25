import { size } from '@floating-ui/react-dom';
import {
  UseComboboxInterface,
  UseComboboxReturnValue,
  UseComboboxStateChange,
  UseSelectInterface,
  UseSelectReturnValue,
  useCombobox,
} from 'downshift';
import { FieldValues } from 'react-hook-form';

import { FloatingPopover } from '_context/FloatingPopoverContext';

import { selectContext as SelectContext } from './_SelectContext.ts';

interface SelectProps<TOption extends FieldValues> {
  items: TOption[];
  selected?: TOption | null;
  labelGetter: (item: TOption | null) => string;
  onChange: (item: TOption | null) => void;
  autocomplete?: boolean;
  useStrategy: UseSelectInterface | UseComboboxInterface;
  onInputValueChange?: (changes: UseComboboxStateChange<TOption>) => void;
  onBeforeMenuOpen?: () => void;
  onBeforeMenuClosed?: () => void;
  horizontal?: boolean;
  children:
    | React.ReactNode
    | ((bag: {
        isOpen: boolean;
        selected: TOption | null;
        context: UseSelectReturnValue<TOption> | UseComboboxReturnValue<TOption>;
      }) => React.ReactNode);
}

function Select<T extends FieldValues = FieldValues>({
  items,
  labelGetter,
  onChange,
  useStrategy,
  children,
  autocomplete,
  onInputValueChange,
  onBeforeMenuOpen,
  onBeforeMenuClosed,
  horizontal,
  selected,
}: SelectProps<T>) {
  const selectData = useStrategy({
    items,
    itemToString: labelGetter,
    selectedItem: selected,
    onSelectedItemChange(changes) {
      onChange(changes.selectedItem ?? null);
    },
    onStateChange(changes) {
      switch (changes.type) {
        case useCombobox.stateChangeTypes.InputBlur:
          (selectData as UseComboboxReturnValue<T>).setInputValue(
            labelGetter(selectData.selectedItem)
          );
          break;
      }
    },
    onIsOpenChange(changes) {
      if (changes.isOpen) {
        onBeforeMenuOpen?.();
      } else {
        onBeforeMenuClosed?.();
      }
    },
    onInputValueChange,
  });

  return (
    <SelectContext.Provider
      value={{
        ...selectData,
        labelGetter,
        // @ts-expect-error: it's rather TS limitation: https://github.com/microsoft/TypeScript/issues/19360#issuecomment-338834658
        autocomplete,
        horizontal,
      }}
    >
      <FloatingPopover
        open={selectData.isOpen ?? false}
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
        {typeof children === 'function'
          ? children({
              selected: selectData.selectedItem,
              isOpen: selectData.isOpen,
              context: selectData,
            })
          : children}
      </FloatingPopover>
    </SelectContext.Provider>
  );
}

export default Select;
