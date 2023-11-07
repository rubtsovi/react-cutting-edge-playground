import Label from '_components/ui/Label';

import { useSelectContext } from './_Select.context.ts';

interface SelectLabelProps extends React.ComponentPropsWithRef<typeof Label> {
  as?: React.ForwardRefExoticComponent<React.RefAttributes<HTMLLabelElement>>;
}

function SelectLabel({
  as,
  children,
  onClick,
  ...props
}: React.PropsWithChildren<SelectLabelProps>) {
  const { getLabelProps, openMenu, autocomplete } = useSelectContext();
  const Component = as ?? Label;
  return (
    <Component
      {...getLabelProps({
        ...props,
        onClick(e: React.MouseEvent<HTMLLabelElement>) {
          if (!autocomplete) {
            openMenu();
          }
          onClick?.(e);
        },
      })}
    >
      {children}
    </Component>
  );
}

export default SelectLabel;
