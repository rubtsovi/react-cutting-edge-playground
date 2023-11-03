import { useMemo } from 'react';

import { FieldValues } from 'react-hook-form';

import ControlAddon from '_components/ui/Inputs/_ControlAddon.tsx';
import SelectOpenIndicator from '_components/ui/Inputs/_SelectOpenIndicator.tsx';
import { useFloatingPopoverContext } from '_context/FloatingPopoverContext';

import { useSelectContext } from './_SelectContext.ts';
import {
  AutocompleteMultipleSelectTrigger,
  AutocompleteSingleSelectTrigger,
  BasicMultipleSelectTrigger,
  BasicSingleSelectTrigger,
} from './_SelectTriggerStrategies.tsx';

interface SelectTriggerProps {
  additionalControls?: React.ReactNode;
  className?: string;
}

function SelectTrigger<T extends FieldValues>({
  additionalControls,
  className,
}: SelectTriggerProps) {
  const { isOpen, autocomplete, multiple, getToggleButtonProps } = useSelectContext<
    T,
    boolean | undefined,
    boolean | undefined
  >();
  const { refs } = useFloatingPopoverContext();

  const TriggerInner = useMemo(() => {
    return (
      strategies.find(
        x => x.autocomplete === Boolean(autocomplete) && x.multiple === Boolean(multiple)
      )?.triggerInner ?? (() => null)
    );
  }, [autocomplete, multiple]);

  return (
    <div ref={refs.setReference}>
      <TriggerInner className={className} />
      <ControlAddon className='right-2'>
        {additionalControls}
        <SelectOpenIndicator
          open={isOpen}
          {...getToggleButtonProps({
            className: 'cursor-pointer',
          })}
        />
      </ControlAddon>
    </div>
  );
}

const strategies = [
  {
    autocomplete: false,
    multiple: false,
    triggerInner: BasicSingleSelectTrigger,
  },
  {
    autocomplete: true,
    multiple: false,
    triggerInner: AutocompleteSingleSelectTrigger,
  },
  {
    autocomplete: false,
    multiple: true,
    triggerInner: BasicMultipleSelectTrigger,
  },
  {
    autocomplete: true,
    multiple: true,
    triggerInner: AutocompleteMultipleSelectTrigger,
  },
] as const;

export default SelectTrigger;
