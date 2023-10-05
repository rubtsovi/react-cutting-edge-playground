import { useContext } from 'react';

import { useFormContext } from 'react-hook-form';

import { assert } from '_utils';

import { FormFieldContext, FormItemContext } from './_contexts.ts';

export const useFormFieldContext = () =>
  useContext(FormFieldContext) ?? assert('useFormFieldContext should be used withing <FormField>');

export const useFormItemContext = () =>
  useContext(FormItemContext) ?? assert('useFormItemContext should be used within <FormItem>');

export function useFormField() {
  const { name } = useFormFieldContext();
  const { id } = useFormItemContext();
  const { getFieldState, formState } = useFormContext();

  const fieldState = getFieldState(name, formState);

  return {
    id,
    name,
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formMessageId: `${id}-form-item-message`,
    ...fieldState,
  };
}
