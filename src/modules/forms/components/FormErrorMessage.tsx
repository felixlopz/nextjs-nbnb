import { cn } from '@/src/libs/utils';
import classNames from 'classnames';
import { FC } from 'react';

interface FormErrorMessageProps {
  children: React.ReactNode;
  className?: string;
}

const FormErrorMessage: FC<FormErrorMessageProps> = ({ children }) => {
  return (
    <p
      className={cn(['mt-1 block text-left text-sm text-red-500', classNames])}
    >
      {children}
    </p>
  );
};

export default FormErrorMessage;
