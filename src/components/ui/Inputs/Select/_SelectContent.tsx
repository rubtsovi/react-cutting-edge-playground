import { useRef, useState, useTransition } from 'react';

import { FloatingPortal } from '@floating-ui/react';
import { ScrollAreaViewportElement } from '@radix-ui/react-scroll-area';
import { Loader2Icon } from 'lucide-react';

import AnimationDropdown from '_components/animations/AnimationDropdown';
import Scrollable from '_components/ui/Scrollable';
import { useFloatingPopoverContext } from '_context/FloatingPopoverContext';
import { cn } from '_utils';

import { useSelectContext } from './_Select.context.ts';
import {
  VirtualizedSelectContentChildren,
  VirtualizedSelectContentInner,
} from './_SelectContent.strategies.tsx';

type SelectContentProps = Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> &
  (
    | {
        virtualized: true;
        children: VirtualizedSelectContentChildren;
      }
    | {
        virtualized?: false;
        children: React.ReactNode;
      }
  );

function SelectContent({ virtualized, children, ...props }: SelectContentProps) {
  const { isOpen, getMenuProps } = useSelectContext();
  const { refs, floatingStyles } = useFloatingPopoverContext();
  const [menuOpen, setMenuOpen] = useState(isOpen);
  const [, startTransition] = useTransition();

  const scrollableRef = useRef<ScrollAreaViewportElement>(null);

  return (
    <FloatingPortal>
      <div
        {...getMenuProps(
          {
            ref: refs.setFloating,
            style: floatingStyles,
            className: 'relative z-50 flex flex-col',
          },
          { suppressRefError: true }
        )}
      >
        <AnimationDropdown
          show={isOpen}
          beforeEnter={() => {
            startTransition(() => {
              setMenuOpen(true);
            });
          }}
          afterLeave={() => {
            setMenuOpen(false);
          }}
          asChild
        >
          <div
            className={`flex min-h-0 flex-grow-0 flex-col overflow-hidden rounded-xl 
            border border-input bg-popover p-0 text-popover-foreground shadow-sm`}
          >
            <Scrollable ref={scrollableRef}>
              {virtualized ? (
                <VirtualizedSelectContentInner
                  {...props}
                  childrenRender={children}
                  scrollableRef={scrollableRef}
                />
              ) : (
                <div {...props} className={cn('p-2', props.className)}>
                  {menuOpen ? (
                    children
                  ) : (
                    <div
                      className='grid w-full place-content-center'
                      style={{ height: `${window.innerHeight * 0.3333}px` }}
                    >
                      <Loader2Icon size={24} className='animate-spin text-primary' />
                    </div>
                  )}
                </div>
              )}
            </Scrollable>
          </div>
        </AnimationDropdown>
      </div>
    </FloatingPortal>
  );
}

export default SelectContent;
