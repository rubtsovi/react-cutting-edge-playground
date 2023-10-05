import { useMemo } from 'react';

import { Controller, ControllerProps, FieldPath, FieldValues } from 'react-hook-form';

import { FormFieldContext } from './_contexts.ts';

function FormField<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({ ...props }: ControllerProps<TFieldValues, TName>) {
  const formFieldContextValues = useMemo<
    React.ComponentProps<typeof FormFieldContext.Provider>['value']
  >(() => {
    return { name: props.name };
  }, [props.name]);
  return (
    <FormFieldContext.Provider value={formFieldContextValues}>
      <Controller {...props} />
    </FormFieldContext.Provider>
  );
}

export default FormField;
