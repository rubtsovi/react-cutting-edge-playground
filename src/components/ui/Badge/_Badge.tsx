import { forwardRef } from 'react';

import { VariantProps } from 'class-variance-authority';
import { XIcon } from 'lucide-react';

import Button from '_components/ui/Button';
import { cn } from '_utils';

import badgeVariants from './_Badge.variants.ts';

interface BadgeProps
  extends VariantProps<typeof badgeVariants>,
    React.HTMLAttributes<HTMLDivElement> {
  onRemoveClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

function BadgeInner(
  { className, onRemoveClick, children, variant, size, ...props }: BadgeProps,
  ref: React.ForwardedRef<HTMLDivElement>
) {
  return (
    <div ref={ref} className={cn(badgeVariants({ variant, size }), className)} {...props}>
      {children}
      {onRemoveClick && !size?.startsWith('icon') && (
        <Button
          variant='ghost'
          size='icon-sm'
          className={cn(
            {
              '-mr-5 ml-1 h-5 w-5': !size || size === 'default',
              '-mr-2.5 ml-1 h-5 w-5': size === 'sm',
              'hover:bg-destructive/10 hover:text-inherit': variant === 'outline-destructive',
              'hover:bg-secondary/10 hover:text-inherit': variant === 'outline-secondary',
            },
            'rounded-full text-inherit'
          )}
          tabIndex={-1}
          onClick={e => {
            e.stopPropagation();
            onRemoveClick(e);
          }}
          type='button'
        >
          <XIcon size={12} />
        </Button>
      )}
    </div>
  );
}

const Badge = forwardRef(BadgeInner);

export default Badge;
