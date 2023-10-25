import { FieldPath, FieldValues, UseControllerProps } from 'react-hook-form';

import { CommonFieldProps, SelectFieldsCommonProps } from '_components/fields/models.ts';
import Badge from '_components/ui/Badge';
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

type MultiSelectFieldProps<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
  TOption extends FieldValues,
> = SelectFieldsCommonProps<TOption> & UseControllerProps<TFieldValues, TName> & CommonFieldProps;

function MultiSelectField<
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
  nullable,
  selectContentProps,
  control,
  horizontal,
  ...props
}: MultiSelectFieldProps<TFieldValues, TName, TOption>) {
  return (
    <FormField
      render={({ field: { value, onChange, name }, fieldState: { invalid } }) => {
        const onFieldChange = (v: TOption[]) => {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-return
          onChange(v.map(x => x[valueProperty]));
        };
        const selectedValues = value
          ? options.filter(x => (value as unknown[]).includes(x[valueProperty]))
          : [];
        return (
          <FormItem className={cn(className, 'relative')}>
            <Select
              onChange={onFieldChange}
              name={name}
              value={selectedValues}
              multiple
              horizontal={horizontal}
            >
              {({ value: selected }) => (
                <div className='relative'>
                  <FormControl>
                    <SelectTrigger
                      className={cn(
                        'flex-wrap items-center gap-x-2 gap-y-1 rounded-3xl py-1 pl-2 pr-20',
                        invalid && invalidInputVariants()
                      )}
                    >
                      {Array.isArray(selected) &&
                        selected?.map((v, _idx, arr) => (
                          <Badge
                            key={v[valueProperty]}
                            variant='outline'
                            className='border'
                            onRemoveClick={() => {
                              onFieldChange(
                                arr?.filter(x => x[valueProperty] !== v[valueProperty])
                              );
                            }}
                          >
                            {v[labelProperty]}
                          </Badge>
                        ))}
                    </SelectTrigger>
                  </FormControl>
                  {label && <SelectLabel {...labelProps}>{label}</SelectLabel>}
                  {nullable && (
                    <ControlAddon className='right-11'>
                      <ClearFieldButton />
                    </ControlAddon>
                  )}
                  <FormMessage className='px-6'>{helperText}</FormMessage>
                  <SelectContent {...selectContentProps}>
                    {options.map(option => (
                      <SelectOption key={`${name}-option-${option[valueProperty]}`} value={option}>
                        {option[labelProperty]}
                      </SelectOption>
                    ))}
                  </SelectContent>
                </div>
              )}
            </Select>
          </FormItem>
        );
      }}
      control={control}
      {...props}
    ></FormField>
  );
}

export default MultiSelectField;
