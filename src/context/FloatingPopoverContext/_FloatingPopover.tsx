import { useMemo } from 'react';

import { Derivable } from '@floating-ui/core';
import {
  FlipOptions,
  UseFloatingOptions,
  autoUpdate,
  flip,
  offset,
  shift,
  useFloating,
} from '@floating-ui/react';

import FloatingPopoverContext from './_FloatingPopover.context.ts';

interface FloatingPopoverProviderProps
  extends Pick<UseFloatingOptions, 'middleware' | 'placement'> {
  flipOptions?: FlipOptions | Derivable<FlipOptions>;
  modal?: boolean;
  open: boolean;
}

function FloatingPopover({
  children,
  flipOptions,
  middleware,
  modal,
  ...options
}: React.PropsWithChildren<FloatingPopoverProviderProps>) {
  const data = useFloating({
    whileElementsMounted: autoUpdate,
    middleware: [
      offset(8),
      flip({
        crossAxis: options.placement?.includes('-'),
        fallbackAxisSideDirection: 'end',
        padding: 8,
        ...flipOptions,
      }),
      shift({ padding: 16 }),
      ...(middleware ?? []),
    ],
  });

  const providerValue = useMemo(
    () => ({ open: options.open, ...data, modal }),
    [options.open, modal, data]
  );

  return (
    <FloatingPopoverContext.Provider value={providerValue}>
      {children}
    </FloatingPopoverContext.Provider>
  );
}

export default FloatingPopover;
