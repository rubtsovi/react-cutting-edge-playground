import { XIcon } from 'lucide-react';
import { useFormContext } from 'react-hook-form';

import Button from '_components/ui/Button';
import { cn } from '_utils';

import { useFormField } from './_hooks.ts';

function ClearFieldButton({
  className,
  onClick,
  ...props
}: Omit<React.ComponentProps<typeof Button>, 'size' | 'children'>) {
  const { name } = useFormField();
  const { resetField, watch } = useFormContext();

  const onClearClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (onClick) {
      onClick(e);
      return;
    }
    resetField(name);
  };

  const value = watch(name) as string | unknown[];

  if (!value || (Array.isArray(value) && value.length === 0)) {
    return null;
  }

  return (
    <Button
      variant='ghost'
      type='button'
      className={cn('rounded-full hover:bg-destructive/10 hover:text-destructive', className)}
      {...props}
      size='icon-sm'
      tabIndex={-1}
      onClick={onClearClick}
    >
      <XIcon size={16} />
    </Button>
  );
}

export default ClearFieldButton;
