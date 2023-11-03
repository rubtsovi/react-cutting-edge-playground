import { useState, useTransition } from 'react';

import { FloatingPortal } from '@floating-ui/react';
import { Loader2Icon } from 'lucide-react';

import AnimationDropdown from '_components/animations/AnimationDropdown';
import Scrollable from '_components/ui/Scrollable';
import { useFloatingPopoverContext } from '_context/FloatingPopoverContext';
import { cn } from '_utils';

import { useSelectContext } from './_SelectContext.ts';

function SelectContent({
  className,
  children,
  ...props
}: React.PropsWithChildren<React.HTMLAttributes<HTMLDivElement>>) {
  const { isOpen, getMenuProps, horizontal } = useSelectContext();
  const { refs, floatingStyles } = useFloatingPopoverContext();
  const [menuOpen, setMenuOpen] = useState(isOpen);
  const [, startTransition] = useTransition();

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
            <Scrollable>
              <div
                className={cn(
                  'flex flex-col flex-wrap gap-1 p-2',
                  {
                    'flex-col gap-1': !horizontal,
                    'flex-row gap-2': horizontal,
                  },
                  className
                )}
                {...props}
              >
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
            </Scrollable>
          </div>
        </AnimationDropdown>
      </div>
    </FloatingPortal>
  );
}

export default SelectContent;
