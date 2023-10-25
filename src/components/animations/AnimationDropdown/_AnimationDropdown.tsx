import { Fragment } from 'react';

import { Transition } from '@headlessui/react';

import { useFloatingPopoverContext } from '_context/FloatingPopoverContext';

import { CommonAnimationProps } from '../models.ts';

function AnimationDropdown({ asChild, ...props }: CommonAnimationProps) {
  const { placement } = useFloatingPopoverContext();

  return (
    <Transition
      {...props}
      enter='transition duration-300'
      enterFrom='opacity-0 scale-90'
      enterTo='opacity-100 scale-100'
      leave='transition duration-300'
      leaveFrom='opacity-100 translate-y-0'
      leaveTo={`opacity-0 ${placement.includes('top') ? '-translate-y-6' : 'translate-y-6'}`}
      as={asChild ? Fragment : 'div'}
    />
  );
}

export default AnimationDropdown;
