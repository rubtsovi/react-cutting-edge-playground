import { FieldPath, FieldValues, UseControllerProps } from 'react-hook-form';

import { CommonFieldProps, SelectFieldsCommonProps } from '_components/fields/models.ts';
import {
  ClearFieldButton,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '_components/ui/Form';
import {
  Select,
  SelectContent,
  SelectLabel,
  SelectOption,
  SelectTrigger,
} from '_components/ui/Inputs/Select';
import ControlAddon from '_components/ui/Inputs/_ControlAddon.tsx';
import { invalidInputVariants } from '_components/ui/Inputs/_variants.ts';
import { cn } from '_utils';

type SelectFieldProps<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
  TOption extends FieldValues,
> = SelectFieldsCommonProps<TOption> & UseControllerProps<TFieldValues, TName> & CommonFieldProps;

function SelectField<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  TOption extends FieldValues = FieldValues,
>({
  label,
  labelProps,
  options,
  labelProperty,
  valueProperty,
  helperText,
  className,
  clearable,
  control,
  horizontal,
  selectContentProps,
  ...props
}: SelectFieldProps<TFieldValues, TName, TOption>) {
  //
  return (
    <FormField
      control={control}
      render={({ field: { value, onChange, name }, fieldState: { invalid } }) => {
        const onFieldChange = (v: TOption) => {
          onChange(v[valueProperty]);
        };
        const selectedValue = options.find(v => v[valueProperty] === value);
        return (
          <FormItem className={cn(className, 'relative')}>
            <Select
              onChange={onFieldChange}
              value={selectedValue ?? null}
              name={name}
              horizontal={horizontal}
            >
              <div className='relative'>
                <FormControl>
                  <SelectTrigger className={cn(invalid && invalidInputVariants())}>
                    {selectedValue ? selectedValue[labelProperty] : ' '}
                  </SelectTrigger>
                </FormControl>
                {label && <SelectLabel {...labelProps}>{label}</SelectLabel>}
                {clearable && (
                  <ControlAddon className='right-11'>
                    <ClearFieldButton />
                  </ControlAddon>
                )}
                <FormMessage className='px-6'>{helperText}</FormMessage>
                <SelectContent
                  {...selectContentProps}
                  className={cn(
                    { 'flex-col': !horizontal, 'flex-row flex-wrap': horizontal },
                    selectContentProps?.className
                  )}
                >
                  {options.map(option => (
                    <SelectOption key={`${name}-option-${option[valueProperty]}`} value={option}>
                      {option[labelProperty]}
                    </SelectOption>
                  ))}
                </SelectContent>
              </div>
            </Select>
          </FormItem>
        );
      }}
      {...props}
    />
  );
}

export default SelectField;
