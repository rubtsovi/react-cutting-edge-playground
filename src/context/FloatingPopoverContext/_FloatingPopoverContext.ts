import { createContext } from 'react';

import { useFloatingPopover } from '_src/lib/hooks.ts';

const floatingPopoverContext = createContext<ReturnType<typeof useFloatingPopover> | null>(null);

export default floatingPopoverContext;
