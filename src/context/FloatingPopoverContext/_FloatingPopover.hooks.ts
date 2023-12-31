import { useContext } from 'react';

import { assert } from '_utils';

import floatingPopoverContext from './_FloatingPopover.context.ts';

function useFloatingPopoverContext() {
  return (
    useContext(floatingPopoverContext) ??
    assert('Floating popover components must be wrapped in <FloatingPopover />')
  );
}

export default useFloatingPopoverContext;
