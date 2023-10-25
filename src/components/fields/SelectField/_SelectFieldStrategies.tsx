import { useCombobox, useSelect } from 'downshift';
import { FieldValues } from 'react-hook-form';

import { Select } from '_components/ui/Inputs/DownshiftSelect';

type SelectFieldStrategyProps<T extends FieldValues> = Omit<
  React.ComponentProps<typeof Select<T>>,
  'useStrategy' | 'autocomplete'
>;

export function SimpleAutocompleteSelectFieldItem<T extends FieldValues = FieldValues>(
  props: SelectFieldStrategyProps<T>
) {
  return <Select {...props} autocomplete useStrategy={useCombobox} />;
}

export function SimpleSelectFieldItem<T extends FieldValues = FieldValues>(
  props: SelectFieldStrategyProps<T>
) {
  return <Select {...props} autocomplete={false} useStrategy={useSelect} />;
}
