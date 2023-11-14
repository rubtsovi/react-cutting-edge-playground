import { VirtualItem, useVirtualizer } from '@tanstack/react-virtual';

import { useSelectContext } from './_Select.context.ts';

export type VirtualizedSelectContentChildren = (items: VirtualItem[]) => React.ReactNode;

interface VirtualizedSelectContentInnerProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> {
  childrenRender: VirtualizedSelectContentChildren;
  scrollableRef: React.RefObject<HTMLDivElement>;
}

export function VirtualizedSelectContentInner({
  scrollableRef,
  childrenRender,
  ...props
}: VirtualizedSelectContentInnerProps) {
  const { items } = useSelectContext();
  const virtualizer = useVirtualizer({
    count: items.length,
    getScrollElement: () => scrollableRef.current,
    estimateSize: () => 48,
  });

  return (
    <div className='p-2'>
      <div
        {...props}
        style={{
          ...props.style,
          height: `${virtualizer.getTotalSize()}px`,
          width: '100%',
          position: 'relative',
        }}
      >
        {childrenRender(virtualizer.getVirtualItems())}
      </div>
    </div>
  );
}
