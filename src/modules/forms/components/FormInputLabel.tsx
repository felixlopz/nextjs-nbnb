import { cn } from '@/src/libs/utils';
import { FC } from 'react';

interface FormInputLabelProps {
  children: React.ReactNode;
  className?: string;
}

export const FormInputLabel: FC<FormInputLabelProps> = ({
  children,
  className,
}) => {
  return (
    <label
      className={cn([
        `text-md 
  absolute
  left-4
  top-5 
  z-10 
  origin-[0] 
  -translate-y-3 
  transform 
  text-zinc-400 
  duration-150 
  peer-placeholder-shown:translate-y-0 
  peer-placeholder-shown:scale-100
  peer-focus:-translate-y-4
  peer-focus:scale-75
   `,
        className,
      ])}
    >
      {children}
    </label>
  );
};

export default FormInputLabel;
