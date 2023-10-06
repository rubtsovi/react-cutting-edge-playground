import { createContext, useContext } from 'react';

import { assert } from '_utils';

interface SelectContextValue {
  horizontal: boolean;
  hasValue: boolean;
}

export const SelectContext = createContext<SelectContextValue | null>(null);

export function useSelectContext() {
  return (
    useContext(SelectContext) ?? assert("Select control's components must be wrapped in <Select />")
  );
}
