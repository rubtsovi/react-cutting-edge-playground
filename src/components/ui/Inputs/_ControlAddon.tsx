import { forwardRef } from 'react';

import { cn } from '_utils';

function ControlAddonInner(
  { className, ...props }: React.HTMLAttributes<HTMLDivElement>,
  ref: React.ForwardedRef<HTMLDivElement>
) {
  return (
    <div
      ref={ref}
      className={cn(
        `absolute left-auto right-3 top-2 m-auto 
        flex items-center space-x-1 rounded-full bg-background`,
        className
      )}
      {...props}
    />
  );
}

const ControlAddon = forwardRef(ControlAddonInner);

export default ControlAddon;
