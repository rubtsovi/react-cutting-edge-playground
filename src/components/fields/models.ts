import { FieldValues } from 'react-hook-form';
import { SelectContent } from 'src/components/ui/Inputs/Select';

import { FormLabel } from '_components/ui/Form';
import ControlAddon from '_components/ui/Inputs/_ControlAddon.tsx';

export interface CommonFieldProps {
  label?: string;
  labelProps?: React.ComponentProps<typeof FormLabel>;
  helperText?: string;
  className?: string;
  nullable?: boolean;
  after?: React.ReactElement<Omit<React.ComponentProps<typeof ControlAddon>, 'position'>>;
}

export interface SelectFieldsCommonProps<TOption extends FieldValues> {
  options: TOption[];
  valueProperty: keyof TOption;
  labelProperty: keyof TOption;
  selectContentProps?: Omit<React.ComponentPropsWithRef<typeof SelectContent>, 'children'>;
  horizontal?: boolean;
}
