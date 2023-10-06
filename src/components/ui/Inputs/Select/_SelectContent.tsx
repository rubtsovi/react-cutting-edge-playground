import { Fragment, forwardRef } from 'react';

import { FloatingPortal } from '@floating-ui/react';
import { Listbox, ListboxOptionsProps, Transition } from '@headlessui/react';
import * as ScrollablePrimitive from '@radix-ui/react-scroll-area';

import { useFloatingPopoverContext } from '_context/FloatingPopoverContext';
import { useOnMount } from '_src/lib/hooks.ts';
import { cn } from '_utils';

import { useSelectContext } from './_selectContext.ts';

function SelectContentInner(
  { className, children, ...props }: Omit<ListboxOptionsProps<'div'>, 'static' | 'unmount'>,
  ref: React.ForwardedRef<React.ElementRef<typeof Listbox.Options>>
) {
  const mounted = useOnMount();
  const { refs, floatingStyles, open, placement } = useFloatingPopoverContext();
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
        <Transition
          show={open}
          enter='transition duration-200'
          enterFrom='opacity-0 scale-90'
          enterTo='opacity-100 scale-100'
          leave='transition duration-200'
          leaveFrom='opacity-100 translate-y-0'
          leaveTo={`opacity-0 ${placement.includes('top') ? '-translate-y-6' : 'translate-y-6'}`}
          as={Fragment}
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
            {bag => (
              <ScrollablePrimitive.Root className='flex min-h-0 flex-grow-0 flex-col'>
                <ScrollablePrimitive.Viewport>
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
                    {typeof children === 'function' ? children(bag) : children}
                  </div>
                </ScrollablePrimitive.Viewport>
                <ScrollablePrimitive.Scrollbar
                  orientation='vertical'
                  className={`flex w-3 origin-right scale-x-50 touch-none select-none bg-muted/20 
                  px-0.5 py-2 transition duration-100 ease-out
                  hover:scale-x-100 hover:bg-muted/50`}
                >
                  <ScrollablePrimitive.Thumb className='flex-1 rounded-full bg-primary' />
                </ScrollablePrimitive.Scrollbar>
              </ScrollablePrimitive.Root>
            )}
          </Listbox.Options>
        </Transition>
      </div>
    </FloatingPortal>
  );
}

const SelectContent = forwardRef(SelectContentInner);

export default SelectContent;
