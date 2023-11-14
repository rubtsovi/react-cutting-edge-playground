import React, { forwardRef } from 'react';

import * as ScrollablePrimitive from '@radix-ui/react-scroll-area';

import { cn } from '_utils';

interface ScrollableProps extends Omit<ScrollablePrimitive.ScrollAreaProps, 'asChild'> {
  scrollbarForceMount?: true;
  axis?: 'x' | 'y' | 'both';
}

function ScrollableInner(
  { className, children, scrollbarForceMount, axis = 'y', ...props }: ScrollableProps,
  ref: React.ForwardedRef<ScrollablePrimitive.ScrollAreaViewportElement>
) {
  return (
    <ScrollablePrimitive.Root
      className={cn('flex min-h-0 flex-grow-0 flex-col', className)}
      {...props}
    >
      <ScrollablePrimitive.Viewport ref={ref}>{children}</ScrollablePrimitive.Viewport>
      {(axis === 'y' || axis === 'both') && (
        <ScrollablePrimitive.Scrollbar
          orientation='vertical'
          forceMount={scrollbarForceMount}
          className={`flex w-3 origin-right scale-x-50 touch-none select-none bg-muted/20 
                    px-0.5 py-2 transition duration-100 ease-out
                    hover:scale-x-100 hover:bg-muted/50`}
        >
          <ScrollablePrimitive.Thumb className='flex-1 rounded-full bg-primary' />
        </ScrollablePrimitive.Scrollbar>
      )}
      {(axis === 'x' || axis === 'both') && (
        <ScrollablePrimitive.Scrollbar
          orientation='horizontal'
          forceMount={scrollbarForceMount}
          className={`flex h-3 origin-bottom scale-y-50 touch-none select-none flex-col bg-muted/20 
                    px-2 py-0.5 transition duration-100 ease-out
                    hover:scale-y-100 hover:bg-muted/50`}
        >
          <ScrollablePrimitive.Thumb className='flex-1 rounded-full bg-primary' />
        </ScrollablePrimitive.Scrollbar>
      )}
    </ScrollablePrimitive.Root>
  );
}

const Scrollable = forwardRef(ScrollableInner);

export default Scrollable;
