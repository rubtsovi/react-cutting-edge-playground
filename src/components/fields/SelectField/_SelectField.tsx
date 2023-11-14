import { useCallback, useState } from 'react';

import { VirtualItem } from '@tanstack/react-virtual';
import { UseComboboxStateChange } from 'downshift';
import { FieldPath, FieldValues, UseControllerProps } from 'react-hook-form';
import {
  SelectContent,
  SelectLabel,
  SelectOption,
  SelectTrigger,
} from 'src/components/ui/Inputs/Select';

import { CommonFieldProps } from '_components/fields/models.ts';
import {
  ClearFieldButton,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '_components/ui/Form';
import {
  floatingLabelVariants,
  invalidInputVariants,
} from '_components/ui/Inputs/_Inputs.variants.ts';
import Typography from '_components/ui/Typography';
import { cn } from '_utils';

import {
  AutocompleteSingleSelectFieldItem,
  BasicSingleSelectFieldItem,
  MultipleAutocompleteSelectFieldItem,
  MultipleSelectFieldItem,
} from './_SelectField.strategies.tsx';

const SelectFieldStrategy = {
  BASIC: BasicSingleSelectFieldItem,
  BASIC_AUTOCOMPLETE: AutocompleteSingleSelectFieldItem,
  MULTI: MultipleSelectFieldItem,
  MULTI_AUTOCOMPLETE: MultipleAutocompleteSelectFieldItem,
} as const;

type SelectFieldProps<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
  TOption extends FieldValues,
> = {
  strategy?: keyof typeof SelectFieldStrategy;
  onInputValueChange?: (changes: UseComboboxStateChange<TOption>) => void;
  options: TOption[];
  valueProperty: keyof TOption;
  labelProperty: keyof TOption;
  selectContentProps?: Omit<React.ComponentPropsWithRef<typeof SelectContent>, 'children'>;
  renderOption?: (item: TOption, index: number) => React.ReactNode;
} & UseControllerProps<TFieldValues, TName> &
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
  onInputValueChange,
  strategy = 'BASIC',
  selectContentProps,
  renderOption,
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
      render={({ fieldState: { invalid } }) => {
        const SelectFieldItem = SelectFieldStrategy[strategy];
        return (
          <FormItem className={cn(className, 'relative')}>
            <SelectFieldItem
              options={options}
              valueGetter={item => (item ? (item[valueProperty] as string | number) : null)}
              items={filteredItems}
              labelGetter={item => (item ? String(item[labelProperty]) : '')}
              onBeforeMenuOpen={() => {
                setFilteredItems(options);
              }}
              onInputValueChange={onInputValueChange ?? defaultAutocompleteFilter}
            >
              {({ isOpen, actions, hasValue }) => (
                <div className='relative'>
                  <FormControl>
                    <SelectTrigger
                      additionalControls={
                        nullable ? <ClearFieldButton onClick={() => actions.reset()} /> : null
                      }
                      className={cn({ [`${invalidInputVariants()}`]: invalid, 'pr-20': nullable })}
                    />
                  </FormControl>
                  {label && (
                    <SelectLabel
                      {...labelProps}
                      as={FormLabel}
                      className={cn(
                        floatingLabelVariants({
                          state:
                            hasValue || (strategy?.includes('AUTOCOMPLETE') && isOpen)
                              ? 'floated'
                              : 'idle',
                        })
                      )}
                    >
                      {label}
                    </SelectLabel>
                  )}
                  <FormMessage className='px-6'>{helperText}</FormMessage>
                  {!renderOption ? (
                    <SelectContent {...selectContentProps} virtualized>
                      {(virtualItems: VirtualItem[]) =>
                        virtualItems.length > 0 ? (
                          virtualItems.map(({ key, index, size, start }) => (
                            <SelectOption
                              item={filteredItems[index]}
                              index={index}
                              key={key}
                              style={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                width: '100%',
                                height: `${size}px`,
                                transform: `translateY(${start}px)`,
                              }}
                            />
                          ))
                        ) : (
                          <Typography className='py-6 text-center'>No results</Typography>
                        )
                      }
                    </SelectContent>
                  ) : (
                    <SelectContent {...selectContentProps} virtualized={false}>
                      {filteredItems.length === 0 ? (
                        <Typography className='py-6 text-center'>No results</Typography>
                      ) : (
                        filteredItems.map(renderOption)
                      )}
                    </SelectContent>
                  )}
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
