import { FieldValues } from 'react-hook-form';

import Badge from '_components/ui/Badge';
import { TextInput } from '_components/ui/Inputs';
import { commonInputVariants } from '_components/ui/Inputs/_variants.ts';
import { cn } from '_utils';

import { useSelectContext } from './_SelectContext.ts';

interface SelectTriggerStrategyProps {
  className?: string;
}

export function BasicSingleSelectTrigger<T extends FieldValues>({
  className,
}: SelectTriggerStrategyProps) {
  const { getToggleButtonProps, labelGetter, selectedItem } = useSelectContext<T>();

  return (
    <div
      {...getToggleButtonProps({
        className: cn(commonInputVariants({ className: 'cursor-pointer form-input' }), className),
      })}
    >
      {labelGetter(selectedItem)}
    </div>
  );
}

export function AutocompleteSingleSelectTrigger<T extends FieldValues>({
  className,
}: SelectTriggerStrategyProps) {
  const { labelGetter, getInputProps, setInputValue, closeMenu, selectedItem } = useSelectContext<
    T,
    false,
    true
  >();
  return (
    <TextInput
      {...getInputProps({
        className: cn('text-foreground', className),
        onKeyDown(event) {
          if (event.key === 'Escape') {
            // it's a known issue for Downshift: https://github.com/downshift-js/downshift/issues/734
            // eslint-disable-next-line @typescript-eslint/no-explicit-any,@typescript-eslint/no-unsafe-member-access
            (event.nativeEvent as any).preventDownshiftDefault = true;
            closeMenu();
            setInputValue(labelGetter(selectedItem));
          }
        },
        onBlur() {
          setInputValue(labelGetter(selectedItem));
        },
      })}
    />
  );
}

export function BasicMultipleSelectTrigger<T extends FieldValues>({
  className,
}: SelectTriggerStrategyProps) {
  const { getToggleButtonProps, getDropdownProps } = useSelectContext<T, true>();
  return (
    <div
      {...getToggleButtonProps({
        ...getDropdownProps(),
        className: cn(commonInputVariants({ className: 'cursor-pointer form-input' }), className),
      })}
    >
      <SelectedItemsList />
    </div>
  );
}

export function AutocompleteMultipleSelectTrigger<T extends FieldValues>({
  className,
}: SelectTriggerStrategyProps) {
  const { getInputProps, getDropdownProps, setInputValue } = useSelectContext<T, true, true>();
  return (
    <div
      className={cn(
        commonInputVariants({ className: 'form-input cursor-pointer py-2 pl-2 pr-12' }),
        className
      )}
    >
      <SelectedItemsList>
        <input
          {...getInputProps({
            type: 'text',
            ...getDropdownProps(),
            className:
              'p-0 min-w-0 pl-3 text-foreground border-none leading-none focus:ring-0 text-base h-7 flex-1',
            onBlur() {
              setInputValue('');
            },
          })}
        />
      </SelectedItemsList>
    </div>
  );
}

function SelectedItemsList<T extends FieldValues>({ children }: React.PropsWithChildren) {
  const {
    getSelectedItemProps,
    openMenu,
    selectedItems,
    labelGetter,
    valueGetter,
    removeSelectedItem,
  } = useSelectContext<T, true>();
  return (
    <div className='flex flex-1 flex-wrap gap-1'>
      {selectedItems.length === 0
        ? null
        : selectedItems.map((item, index) => (
            <Badge
              key={valueGetter(item)}
              {...getSelectedItemProps({ selectedItem: item, index, onClick: openMenu })}
              variant='outline'
              onRemoveClick={() => removeSelectedItem(item)}
              className='h-auto border py-1 pl-4'
            >
              {labelGetter(item)}
            </Badge>
          ))}
      {children}
    </div>
  );
}
