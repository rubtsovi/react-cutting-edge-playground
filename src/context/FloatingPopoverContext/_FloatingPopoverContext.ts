import { createContext } from 'react';

import { UseFloatingReturn } from '@floating-ui/react';

interface FloatingPopoverContextValue extends UseFloatingReturn {
  modal?: boolean;
  open: boolean;
}

const floatingPopoverContext = createContext<FloatingPopoverContextValue | null>(null);

export default floatingPopoverContext;
