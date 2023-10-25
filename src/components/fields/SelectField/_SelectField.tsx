import { useCallback, useState } from 'react';

import { UseComboboxStateChange } from 'downshift';
import { FieldPath, FieldValues, UseControllerProps } from 'react-hook-form';

import { CommonFieldProps, SelectFieldsCommonProps } from '_components/fields/models.ts';
import {
  ClearFieldButton,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '_components/ui/Form';
import {
  SelectContent,
  SelectLabel,
  SelectOption,
  SelectTrigger,
} from '_components/ui/Inputs/DownshiftSelect';
import { floatingLabelVariants, invalidInputVariants } from '_components/ui/Inputs/_variants.ts';
import Typography from '_components/ui/Typography';
import { cn } from '_utils';

import {
  SimpleAutocompleteSelectFieldItem,
  SimpleSelectFieldItem,
} from './_SelectFieldStrategies.tsx';

const SelectFieldStrategy = {
  SIMPLE: SimpleSelectFieldItem,
  SIMPLE_AUTOCOMPLETE: SimpleAutocompleteSelectFieldItem,
} as const;

type SelectFieldProps<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
  TOption extends FieldValues,
> = {
  strategy?: keyof typeof SelectFieldStrategy;
  onInputValueChange?: (changes: UseComboboxStateChange<TOption>) => void;
} & SelectFieldsCommonProps<TOption> &
  UseControllerProps<TFieldValues, TName> &
  CommonFieldProps;

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
  nullable,
  control,
  horizontal,
  onInputValueChange,
  strategy = 'SIMPLE',
  ...props
}: SelectFieldProps<TFieldValues, TName, TOption>) {
  const [filteredItems, setFilteredItems] = useState(options);
  const defaultAutocompleteFilter = useCallback(
    (changes: UseComboboxStateChange<TOption>) => {
      if (!changes.isOpen) {
        return;
      }

      setFilteredItems(
        options.filter(x =>
          (x[labelProperty] as string)
            .toLowerCase()
            .includes(changes.inputValue?.trim().toLowerCase() ?? '')
        )
      );
    },
    [labelProperty, options]
  );
  return (
    <FormField
      control={control}
      render={({ field: { value, onChange, name }, fieldState: { invalid } }) => {
        const onFieldChange = (changeValue: TOption | null) => {
          onChange(changeValue ? changeValue[valueProperty] : null);
        };
        const selectedValue = options.find(v => v[valueProperty] === value);
        const SelectFieldItem = SelectFieldStrategy[strategy];
        return (
          <FormItem className={cn(className, 'relative')}>
            <SelectFieldItem
              onChange={onFieldChange}
              selected={selectedValue}
              items={filteredItems}
              labelGetter={item => (item ? String(item[labelProperty]) : '')}
              onBeforeMenuOpen={() => {
                setFilteredItems(options);
              }}
              horizontal={horizontal}
              onInputValueChange={onInputValueChange ?? defaultAutocompleteFilter}
            >
              {({ isOpen, selected, context: { selectItem } }) => (
                <div className='relative'>
                  <FormControl>
                    <SelectTrigger
                      additionalControls={
                        nullable ? <ClearFieldButton onClick={() => selectItem(null)} /> : null
                      }
                      className={cn({ [`${invalidInputVariants()}`]: invalid })}
                    />
                  </FormControl>
                  {label && (
                    <SelectLabel
                      {...labelProps}
                      as={FormLabel}
                      className={cn(
                        floatingLabelVariants({
                          state:
                            selected ?? (strategy?.includes('AUTOCOMPLETE') && isOpen)
                              ? 'floated'
                              : 'idle',
                        })
                      )}
                    >
                      {label}
                    </SelectLabel>
                  )}
                  <FormMessage className='px-6'>{helperText}</FormMessage>
                  <SelectContent>
                    {filteredItems.length > 0 ? (
                      filteredItems.map((item, index) => (
                        <SelectOption
                          key={`${name}-option-${item[valueProperty]}`}
                          item={item}
                          index={index}
                          isSelected={
                            selectedValue && selectedValue[valueProperty] === item[valueProperty]
                          }
                        />
                      ))
                    ) : (
                      <Typography className='py-6 text-center'>No results</Typography>
                    )}
                  </SelectContent>
                </div>
              )}
            </SelectFieldItem>
          </FormItem>
        );
      }}
      {...props}
    />
  );
}

export default SelectField;
