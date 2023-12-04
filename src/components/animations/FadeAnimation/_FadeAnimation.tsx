import { Fragment } from 'react';

import { Transition } from '@headlessui/react';

import { CommonAnimationProps } from '../models.ts';

function FadeAnimation({ asChild, ...props }: CommonAnimationProps) {
  return (
    <Transition
      {...props}
      appear
      enter='transition duration-300'
      enterFrom='opacity-0 scale-75'
      enterTo='opacity-100 scale-100'
      leave='transition duration-200'
      leaveFrom='opacity-100 scale-100'
      leaveTo='opacity-0 scale-75'
      as={asChild ? Fragment : 'div'}
    />
  );
}

export default FadeAnimation;
