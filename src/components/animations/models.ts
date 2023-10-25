import { TransitionRootProps } from '@headlessui/react';

export type CommonAnimationProps = Omit<
  TransitionRootProps<'div'>,
  KeysByPrefix<TransitionRootProps<'div'>, 'enter' | 'leave'> | 'as'
> & {
  asChild?: boolean;
};
