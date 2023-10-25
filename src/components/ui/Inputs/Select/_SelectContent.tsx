import { forwardRef, useState, useTransition } from 'react';

import { FloatingPortal } from '@floating-ui/react';
import { Listbox, ListboxOptionsProps } from '@headlessui/react';
import { Loader2Icon } from 'lucide-react';

import AnimationDropdown from '_components/animations/AnimationDropdown';
import Scrollable from '_components/ui/Scrollable';
import { useFloatingPopoverContext } from '_context/FloatingPopoverContext';
import { useOnMount } from '_src/lib/hooks.ts';
import { cn } from '_utils';

import { useSelectContext } from './_selectContext.ts';

function SelectContentInner(
  { className, children, ...props }: Omit<ListboxOptionsProps<'div'>, 'static' | 'unmount'>,
  ref: React.ForwardedRef<React.ElementRef<typeof Listbox.Options>>
) {
  const mounted = useOnMount();
  const { refs, floatingStyles, open } = useFloatingPopoverContext();
  const [menuOpen, setMenuOpen] = useState(open);
  const [, startTransition] = useTransition();
  const { horizontal } = useSelectContext();

  if (!mounted) {
    return null;
  }

  return (
    <FloatingPortal>
      <div
        ref={refs.setFloating}
        className={cn('relative z-50 flex flex-col')}
        style={floatingStyles}
      >
        <AnimationDropdown
          show={open}
          beforeEnter={() =>
            startTransition(() => {
              setMenuOpen(true);
            })
          }
          afterLeave={() => setMenuOpen(false)}
          asChild
        >
          <Listbox.Options
            ref={ref}
            static
            as='div'
            className={cn(
              `form-input relative flex min-h-0 flex-grow-0 flex-col overflow-hidden rounded-xl
               border border-input bg-popover p-0 shadow-sm
               focus:border-input focus:ring-0 focus:ring-input`
            )}
            {...props}
          >
            {bag => {
              const renderedChildren = typeof children === 'function' ? children(bag) : children;
              return (
                <Scrollable>
                  <div
                    className={cn(
                      'flex flex-col flex-wrap p-2 text-popover-foreground',
                      {
                        'flex-col gap-1': !horizontal,
                        'flex-row gap-2': horizontal,
                      },
                      className
                    )}
                  >
                    {menuOpen ? (
                      renderedChildren
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
              );
            }}
          </Listbox.Options>
        </AnimationDropdown>
      </div>
    </FloatingPortal>
  );
}

const SelectContent = forwardRef(SelectContentInner);

export default SelectContent;
