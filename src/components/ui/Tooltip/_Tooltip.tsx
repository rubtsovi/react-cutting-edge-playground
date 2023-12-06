import { useState } from 'react';

import * as TooltipPrimitive from '@radix-ui/react-tooltip';

import FadeAnimation from '_components/animations/FadeAnimation';
import { cn, tw } from '_utils';

interface TooltipProps
  extends Omit<TooltipPrimitive.TooltipContentProps, 'asChild' | 'children' | 'forceMount'> {
  tooltipContent: React.ReactNode;
  tooltipConfig?: Omit<TooltipPrimitive.TooltipProps, 'children' | 'open'>;
}

function Tooltip({
  tooltipContent,
  children,
  tooltipConfig,
  className,
  ...contentProps
}: React.PropsWithChildren<TooltipProps>) {
  const [open, setOpen] = useState(tooltipConfig?.defaultOpen ?? false);
  return (
    <TooltipPrimitive.Root
      {...tooltipConfig}
      open={open}
      onOpenChange={newState => {
        setOpen(newState);
        tooltipConfig?.onOpenChange?.(newState);
      }}
    >
      <TooltipPrimitive.Trigger asChild>{children}</TooltipPrimitive.Trigger>
      <TooltipPrimitive.Portal forceMount>
        <FadeAnimation show={open} asChild>
          <TooltipPrimitive.Content
            side='top'
            align='center'
            className={cn(
              tw`z-50 rounded-md border border-input bg-background px-3 py-2`,
              tw`max-w-xs`,
              tw`text-sm text-popover-foreground shadow-sm`,
              className
            )}
            sideOffset={8}
            {...contentProps}
            forceMount
          >
            {tooltipContent}
            <TooltipPrimitive.Arrow
              strokeDasharray='0 30 15'
              className='fill-background stroke-input stroke-2'
            />
          </TooltipPrimitive.Content>
        </FadeAnimation>
      </TooltipPrimitive.Portal>
    </TooltipPrimitive.Root>
  );
}

export default Tooltip;
