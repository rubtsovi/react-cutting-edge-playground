// noinspection RequiredAttributes
import {
  UseComboboxProps,
  UseSelectProps,
  UseSelectState,
  useCombobox,
  useMultipleSelection,
  useSelect,
} from 'downshift';
import { FieldValues, useController } from 'react-hook-form';
import { Select } from 'src/components/ui/Inputs/Select';

import { useFormFieldContext } from '_components/ui/Form';

type SelectFieldStrategyProps<
  T extends FieldValues,
  IsMultiple extends boolean | undefined = undefined,
> = Omit<
  React.ComponentProps<typeof Select<T, IsMultiple>>,
  'autocomplete' | 'multiple' | 'selected' | 'selectData'
> & {
  options: T[];
};

/**  COMPONENTS  **/

export function AutocompleteSingleSelectFieldItem<T extends FieldValues>(
  props: SelectFieldStrategyProps<T, false>
) {
  const onSelectedItemChange = useSingleSelectFieldChange(props);
  const selectedItem = useSingleSelected(props);
  const selectData = useCombobox({
    ...getAutocompleteSelectProps(props),
    selectedItem,
    onSelectedItemChange,
  });

  return <Select {...props} selected={selectedItem} autocomplete selectData={selectData} />;
}

export function BasicSingleSelectFieldItem<T extends FieldValues>(
  props: SelectFieldStrategyProps<T, false>
) {
  const onSelectedItemChange = useSingleSelectFieldChange(props);
  const selectedItem = useSingleSelected(props);
  const selectData = useSelect({
    ...getBasicSelectConfig(props),
    selectedItem,
    onSelectedItemChange,
  });

  return (
    <Select
      {...props}
      selected={useSingleSelected(props)}
      autocomplete={false}
      selectData={selectData}
    />
  );
}

export function MultipleAutocompleteSelectFieldItem<T extends FieldValues>(
  props: SelectFieldStrategyProps<T, true>
) {
  const selected = useMultipleSelected(props);
  const onSelectedItemChange = useMultipleSelectFieldChange(props);
  const selectData = useCombobox({
    selectedItem: null,
    ...getAutocompleteSelectProps(props),
    onSelectedItemChange,
    stateReducer(_state, { type, changes }) {
      switch (type) {
        case useCombobox.stateChangeTypes.InputKeyDownEnter:
        case useCombobox.stateChangeTypes.ItemClick:
        case useCombobox.stateChangeTypes.InputBlur:
          return {
            ...changes,
            ...(changes.selectedItem && { isOpen: true, highlightedIndex: 0, inputValue: '' }),
          };
        default:
          return changes;
      }
    },
  });
  const multipleProps = useMultipleProps(props, selected);

  return (
    <Select
      {...props}
      autocomplete
      selected={selected}
      multiple
      multipleData={multipleProps}
      selectData={selectData}
    />
  );
}

export function MultipleSelectFieldItem<T extends FieldValues>(
  props: SelectFieldStrategyProps<T, true>
) {
  const selected = useMultipleSelected(props);
  const onSelectedItemChange = useMultipleSelectFieldChange(props);
  const selectData = useSelect({
    selectedItem: null,
    ...getBasicSelectConfig(props),
    onSelectedItemChange,
  });
  const multipleProps = useMultipleProps(props, selected);

  return (
    <Select
      {...props}
      autocomplete={false}
      selected={selected}
      multiple
      multipleData={multipleProps}
      selectData={selectData}
    />
  );
}

/**  UTILITIES  **/

function getBasicSelectConfig<T extends FieldValues, M extends boolean>(
  props: SelectFieldStrategyProps<T, M>
) {
  return {
    items: props.items,
    itemToString: props.labelGetter,
    onIsOpenChange(changes: { isOpen?: boolean }) {
      if (changes.isOpen) {
        props.onBeforeMenuOpen?.();
        return;
      }

      props.onBeforeMenuClosed?.();
    },
  } satisfies UseSelectProps<T>;
}

function getAutocompleteSelectProps<T extends FieldValues, M extends boolean>(
  props: SelectFieldStrategyProps<T, M>
) {
  return {
    ...getBasicSelectConfig(props),
    onInputValueChange: props.onInputValueChange,
  } satisfies UseComboboxProps<T>;
}

/**   HOOKS   **/

function useMultipleProps<T extends FieldValues = FieldValues>(
  props: Omit<SelectFieldStrategyProps<T, true>, 'options'>,
  selected: T[]
) {
  const { name } = useFormFieldContext();
  const {
    field: { onChange },
  } = useController<Record<string, unknown[]>>({ name });

  return useMultipleSelection({
    selectedItems: selected,
    onStateChange({ selectedItems, type }) {
      switch (type) {
        case useMultipleSelection.stateChangeTypes.SelectedItemKeyDownBackspace:
        case useMultipleSelection.stateChangeTypes.SelectedItemKeyDownDelete:
        case useMultipleSelection.stateChangeTypes.FunctionRemoveSelectedItem:
          onChange(selectedItems?.map(props.valueGetter) ?? []);
          break;
        default:
          break;
      }
    },
  });
}

function useMultipleSelectFieldChange<T extends FieldValues>({
  valueGetter,
}: SelectFieldStrategyProps<T, true>) {
  const { name } = useFormFieldContext();
  const { field } = useController<Record<string, unknown[]>>({ name });
  return ({ selectedItem: newSelectedItem }: Partial<UseSelectState<T>>) => {
    const newValue = valueGetter(newSelectedItem ?? null);
    if (newValue) {
      field.onChange([...(field.value ?? []), newValue]);
    }
  };
}

function useSingleSelectFieldChange<T extends FieldValues>({
  valueGetter,
}: SelectFieldStrategyProps<T, false>) {
  const { name } = useFormFieldContext();
  const { field } = useController<Record<string, string | number>>({ name });
  return ({ selectedItem: newSelectedItem }: Partial<UseSelectState<T>>) => {
    const newValue = valueGetter(newSelectedItem ?? null);
    field.onChange(newValue);
  };
}

function useMultipleSelected<T extends FieldValues>(props: SelectFieldStrategyProps<T, true>) {
  const { name } = useFormFieldContext();
  const { field } = useController<Record<string, unknown[]>>({ name });
  if (!field.value) {
    return [];
  }

  return props.options.filter(x => field.value?.includes(props.valueGetter(x)));
}

function useSingleSelected<T extends FieldValues>(props: SelectFieldStrategyProps<T, false>) {
  const { name } = useFormFieldContext();
  const { field } = useController({ name });
  return props.options.find(x => props.valueGetter(x) === field.value) ?? null;
}
