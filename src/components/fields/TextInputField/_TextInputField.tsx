import { HTMLInputTypeAttribute, useState } from 'react';

import { EyeIcon, EyeOffIcon } from 'lucide-react';
import { FieldPath, FieldValues, UseControllerProps } from 'react-hook-form';

import { CommonFieldProps } from '_components/fields/models.ts';
import Button from '_components/ui/Button';
import {
  ClearFieldButton,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '_components/ui/Form';
import { TextInput } from '_components/ui/Inputs';
import { Textarea } from '_components/ui/Inputs';
import ControlAddon from '_components/ui/Inputs/_ControlAddon.tsx';
import {
  floatingLabelVariants,
  invalidInputVariants,
} from '_components/ui/Inputs/_Inputs.variants.ts';
import { cn, tw } from '_utils';

type TextInputFieldProps<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
> = (
  | {
      textarea?: false;
      inputProps?: React.ComponentProps<typeof TextInput>;
    }
  | {
      textarea: true;
      inputProps?: React.ComponentProps<typeof Textarea>;
    }
) &
  CommonFieldProps &
  UseControllerProps<TFieldValues, TName>;

function TextInputField<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  className,
  textarea,
  label,
  inputProps,
  helperText,
  labelProps,
  nullable,
  ...props
}: TextInputFieldProps<TFieldValues, TName>) {
  const [computedType, setComputedType] = useState<HTMLInputTypeAttribute>(
    textarea ? 'text' : inputProps?.type ?? 'text'
  );

  const onShowPasswordClick = () => {
    if (textarea ?? !inputProps) {
      return;
    }

    setComputedType(currentType => {
      if (inputProps.type !== 'password') {
        return currentType;
      }

      return currentType === 'password' ? 'text' : 'password';
    });
  };

  return (
    <FormField
      render={({ field, fieldState }) => {
        let inputClassName = tw`peer placeholder:text-transparent`;
        if (fieldState.error) {
          inputClassName = cn(inputClassName, invalidInputVariants());
        }
        return (
          <FormItem className={className}>
            <div className='relative'>
              <FormControl>
                {textarea ? (
                  <Textarea
                    placeholder={label}
                    {...field}
                    {...inputProps}
                    className={cn(inputProps?.className, inputClassName)}
                  />
                ) : (
                  <TextInput
                    placeholder={label}
                    {...field}
                    {...inputProps}
                    type={computedType}
                    value={field.value || ''}
                    className={cn(inputProps?.className, inputClassName)}
                  />
                )}
              </FormControl>
              {label && (
                <FormLabel
                  {...labelProps}
                  className={cn(
                    floatingLabelVariants({ state: field.value ? 'floated' : 'idle' }),
                    labelProps?.className
                  )}
                >
                  {label}
                </FormLabel>
              )}
              {!textarea && (
                <ControlAddon className='right-2'>
                  {nullable && <ClearFieldButton />}
                  {inputProps?.type === 'password' && (
                    <Button
                      variant='ghost'
                      size='icon-sm'
                      tabIndex={-1}
                      type='button'
                      className='rounded-full'
                      onClick={onShowPasswordClick}
                    >
                      {computedType === 'password' ? (
                        <EyeIcon size={16} />
                      ) : (
                        <EyeOffIcon size={16} />
                      )}
                    </Button>
                  )}
                </ControlAddon>
              )}
            </div>
            <FormMessage className='px-6'>{helperText}</FormMessage>
          </FormItem>
        );
      }}
      {...props}
    />
  );
}

export default TextInputField;
