import { forwardRef } from 'react';

import * as AccessibleIconPrimitive from '@radix-ui/react-accessible-icon';
import { ChevronDown } from 'lucide-react';

import { buttonVariants } from '_components/ui/Button';
import { cn } from '_utils';

function SelectOpenIndicatorInner(
  { open = false, className, ...props }: React.HTMLAttributes<HTMLDivElement> & { open?: boolean },
  ref: React.ForwardedRef<HTMLDivElement>
) {
  return (
    <div
      ref={ref}
      className={cn(
        buttonVariants({
          variant: 'ghost',
          size: 'icon-sm',
          className: 'rounded-full',
        }),
        className
      )}
      {...props}
    >
      <AccessibleIconPrimitive.Root label='Open'>
        <ChevronDown
          size={16}
          className={cn('origin-center transition-transform group-data-open:rotate-180', {
            'rotate-180': open,
          })}
        />
      </AccessibleIconPrimitive.Root>
    </div>
  );
}

const SelectOpenIndicator = forwardRef(SelectOpenIndicatorInner);

export default SelectOpenIndicator;
