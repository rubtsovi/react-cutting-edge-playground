import * as AccessibleIconPrimitive from '@radix-ui/react-accessible-icon';
import { ChevronDown } from 'lucide-react';

import { buttonVariants } from '_components/ui/Button';
import { cn } from '_utils';

function SelectOpenIndicator({ open = false }: { open?: boolean }) {
  return (
    <div
      className={cn(
        buttonVariants({
          variant: 'ghost',
          size: 'icon-sm',
          className: 'rounded-full',
        })
      )}
    >
      <AccessibleIconPrimitive.Root label='Open'>
        <ChevronDown
          size={16}
          className={cn('group-data-open:rotate-180 origin-center transition-transform', {
            'rotate-180': open,
          })}
        />
      </AccessibleIconPrimitive.Root>
    </div>
  );
}

export default SelectOpenIndicator;
