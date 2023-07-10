import { cn } from '@/src/libs/utils';
import { FC } from 'react';

interface FormErrorMessageProps {
  children: React.ReactNode;
  className?: string;
}

const FormErrorMessage: FC<FormErrorMessageProps> = ({
  children,
  className,
}) => {
  return (
    <p className={cn(['mt-1 block text-left text-sm text-red-500', className])}>
      {children}
    </p>
  );
};

export default FormErrorMessage;
