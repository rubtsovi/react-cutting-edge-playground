import { createContext, useContext } from 'react';

import {
  UseComboboxReturnValue,
  UseMultipleSelectionReturnValue,
  UseSelectReturnValue,
} from 'downshift';
import { FieldValues } from 'react-hook-form';

import { assert } from '_utils';

type SelectContextValue<
  TOption,
  IsMultiple extends boolean | undefined,
  Autocomplete extends boolean | undefined,
> = {
  labelGetter: (item: TOption | null) => string;
  valueGetter: (item: TOption | null) => string | number | null;
  horizontal?: boolean;
} & (
  | ({
      autocomplete: true;
    } & UseComboboxReturnValue<TOption>)
  | ({
      autocomplete?: false;
    } & UseSelectReturnValue<TOption>)
) &
  (
    | ({
        multiple: true;
      } & UseMultipleSelectionReturnValue<TOption>)
    | {
        multiple?: false;
      }
  ) & {
    multiple: IsMultiple;
    autocomplete: Autocomplete;
  };

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const selectContext = createContext<SelectContextValue<any, any, any> | null>(null);

export function useSelectContext<
  TOption extends FieldValues,
  IsMultiple extends boolean | undefined = boolean | undefined,
  Autocomplete extends boolean | undefined = boolean | undefined,
>() {
  return (
    useContext<SelectContextValue<TOption, IsMultiple, Autocomplete> | null>(selectContext) ??
    assert("Select control's components must be wrapped in <Select />")
  );
}
