import { forwardRef } from 'react';

import * as LabelPrimitive from '@radix-ui/react-label';

function LabelInner(
  { ...props }: React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root>,
  ref: React.ForwardedRef<React.ElementRef<typeof LabelPrimitive.Root>>
) {
  return <LabelPrimitive.Root ref={ref} {...props} />;
}

const Label = forwardRef(LabelInner);

export default Label;
