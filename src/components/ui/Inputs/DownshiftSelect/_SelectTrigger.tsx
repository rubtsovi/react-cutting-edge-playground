import { TextInput } from '_components/ui/Inputs';
import ControlAddon from '_components/ui/Inputs/_ControlAddon.tsx';
import SelectOpenIndicator from '_components/ui/Inputs/_SelectOpenIndicator.tsx';
import { commonInputVariants } from '_components/ui/Inputs/_variants.ts';
import { useFloatingPopoverContext } from '_context/FloatingPopoverContext';
import { cn } from '_utils';

import { useSelectContext } from './_SelectContext.ts';

interface SelectTriggerProps {
  additionalControls?: React.ReactNode;
  className?: string;
}

function SelectTrigger({ additionalControls, className }: SelectTriggerProps) {
  const selectContextValue = useSelectContext();
  const { refs } = useFloatingPopoverContext();

  const { selectedItem, isOpen, getToggleButtonProps, labelGetter, closeMenu } = selectContextValue;

  return (
    <div ref={refs.setReference}>
      {selectContextValue.autocomplete ? (
        <TextInput
          {...selectContextValue.getInputProps({
            className,
            onKeyDown(event) {
              if (event.key === 'Escape') {
                // it's a known issue for Downshift: https://github.com/downshift-js/downshift/issues/734
                // eslint-disable-next-line @typescript-eslint/no-explicit-any,@typescript-eslint/no-unsafe-member-access
                (event.nativeEvent as any).preventDownshiftDefault = true;
                closeMenu();
                selectContextValue.setInputValue(labelGetter(selectedItem));
              }
            },
          })}
        />
      ) : (
        <div
          {...getToggleButtonProps({
            className: cn(
              commonInputVariants({ className: 'cursor-pointer form-input' }),
              className
            ),
          })}
        >
          {labelGetter?.(selectedItem) ?? ''}
        </div>
      )}
      <ControlAddon className='right-2'>
        {additionalControls}
        <SelectOpenIndicator
          open={isOpen}
          {...selectContextValue.getToggleButtonProps({
            className: 'cursor-pointer',
          })}
        />
      </ControlAddon>
    </div>
  );
}

export default SelectTrigger;
