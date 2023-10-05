import { useMemo } from 'react';

import { Derivable } from '@floating-ui/core';
import { UseFloatingOptions } from '@floating-ui/react';
import { FlipOptions, autoUpdate, flip, offset, shift, useFloating } from '@floating-ui/react-dom';

import FloatingPopoverContext from './_FloatingPopoverContext.ts';

interface FloatingPopoverProviderProps
  extends Pick<UseFloatingOptions, 'open' | 'middleware' | 'placement'> {
  flipOptions?: FlipOptions | Derivable<FlipOptions>;
  modal?: boolean;
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
