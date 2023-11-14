import { forwardRef } from 'react';

import { GetItemPropsOptions } from 'downshift';
import { FieldValues } from 'react-hook-form';

import { cn, tw } from '_utils';

import { useSelectContext } from './_Select.context.ts';
import { useCommonItemPropsGetter } from './_Select.hooks.ts';

type SelectOptionProps<TOption extends FieldValues> = Omit<
  GetItemPropsOptions<TOption>,
  'isSelected' | 'ref'
>;

function SelectOptionInner<T extends FieldValues = FieldValues>(
  { index, item, ...props }: SelectOptionProps<T>,
  ref: React.ForwardedRef<HTMLDivElement>
) {
  const { labelGetter, highlightedIndex } = useSelectContext<T>();
  const label = labelGetter?.(item);
  const { isOptionSelected, getCommonItemProps } = useCommonItemPropsGetter(item);

  return (
    <div {...getCommonItemProps(props)} ref={ref}>
      <div className='flex items-center justify-center'>
        <div
          className={cn(
            tw`relative w-full cursor-pointer select-none whitespace-nowrap transition`,
            tw`flex items-center rounded-md px-4 py-3 text-base font-bold text-foreground outline-none`,
            {
              [tw`bg-accent text-primary`]: isOptionSelected,
              [tw`bg-input/40`]: highlightedIndex === index,
            }
          )}
        >
          {label}
        </div>
      </div>
    </div>
  );
}

const SelectOption = forwardRef(SelectOptionInner);

export default SelectOption;
