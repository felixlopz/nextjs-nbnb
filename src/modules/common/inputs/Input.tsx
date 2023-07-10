'use client';

import { cn } from '@/src/libs/utils';
import { forwardRef } from 'react';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string;
  name: string;
  label: string;
  className?: string;
  children?: React.ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      id,
      name,
      label,
      type = 'text',
      className,
      placeholder,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <input
        id={id}
        ref={ref}
        name={name}
        type={type}
        aria-label={label}
        placeholder={placeholder}
        className={cn([
          'disable:opacity-70 disable:curser-not-allowed w-full rounded-md border-2 border-neutral-300 bg-white p-4 font-light outline-none transition focus:border-black',
          className,
        ])}
        {...props}
      />
    );
  }
);

Input.displayName = 'Input';

export default Input;
