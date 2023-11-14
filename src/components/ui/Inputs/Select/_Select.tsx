import { size } from '@floating-ui/react-dom';
import {
  UseComboboxActions,
  UseComboboxReturnValue,
  UseComboboxStateChange,
  UseMultipleSelectionReturnValue,
  UseSelectActions,
  UseSelectReturnValue,
} from 'downshift';
import { FieldValues } from 'react-hook-form';

import { FloatingPopover } from '_context/FloatingPopoverContext';

import { selectContext as SelectContext } from './_Select.context.ts';

type RenderSelectChildrenFn<T extends FieldValues> = (bag: {
  isOpen: boolean;
  hasValue: boolean;
  actions: UseSelectActions<T> & Partial<Pick<UseComboboxActions<T>, 'setInputValue'>>;
}) => React.ReactNode;

interface SelectProps<TOption extends FieldValues, IsMultiple extends boolean | undefined> {
  // TODO: consider to do something with next 5 props
  items: TOption[];
  onInputValueChange?: (changes: UseComboboxStateChange<TOption>) => void;
  onBeforeMenuOpen?: () => void;
  onBeforeMenuClosed?: () => void;
  onChange?: (item: TOption[] | TOption | null) => void;
  // generally these props above aren't used in current component
  labelGetter: (item: TOption | null) => string;
  valueGetter: (item: TOption | null) => string | number | null;
  autocomplete?: boolean;
  children: React.ReactNode | RenderSelectChildrenFn<TOption>;
  multiple?: IsMultiple;
  multipleData?: IsMultiple extends true ? UseMultipleSelectionReturnValue<TOption> : never;
  selected?: IsMultiple extends true ? TOption[] : TOption | null;
  selectData: UseComboboxReturnValue<TOption> | UseSelectReturnValue<TOption>;
}

function Select<T extends FieldValues = FieldValues, U extends boolean | undefined = undefined>({
  labelGetter,
  valueGetter,
  children,
  autocomplete,
  multiple,
  multipleData,
  selectData,
  items,
}: SelectProps<T, U>) {
  return (
    <SelectContext.Provider
      // @ts-expect-error: Types of property `autocomplete` are incompatible; it's rather TS limitation: https://github.com/microsoft/TypeScript/issues/19360#issuecomment-338834658
      value={{
        ...selectData,
        ...(multiple ? { multiple, ...multipleData } : {}),
        labelGetter,
        valueGetter,
        autocomplete,
        items,
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
              hasValue: Boolean(selectData.selectedItem ?? multipleData?.selectedItems?.length),
              isOpen: selectData.isOpen,
              actions: selectData,
            })
          : children}
      </FloatingPopover>
    </SelectContext.Provider>
  );
}

export default Select;
