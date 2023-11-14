import { FormLabel } from '_components/ui/Form';
import ControlAddon from '_components/ui/Inputs/_ControlAddon.tsx';

export interface CommonFieldProps {
  label?: string;
  labelProps?: React.ComponentProps<typeof FormLabel>;
  helperText?: string;
  className?: string;
  nullable?: boolean;
  after?: React.ReactElement<Omit<React.ComponentProps<typeof ControlAddon>, 'position'>>;
}
