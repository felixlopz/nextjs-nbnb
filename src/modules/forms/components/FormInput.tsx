'use client';

import { Input, InputProps } from '@/modules/common/inputs/Input';
import {
  DeepMap,
  FieldError,
  RegisterOptions,
  UseFormRegister,
  FieldValues,
  Path,
  FieldErrors,
} from 'react-hook-form';
import FormErrorMessage from './FormErrorMessage';
import { cn } from '@/libs/utils';
import { getFormErrors } from '@/modules/forms/utils';

export type FormInputProps<TFormValues extends FieldValues> = {
  name: Path<TFormValues>;
  register?: UseFormRegister<TFormValues>;
  rules?: RegisterOptions;
  errors?: FieldErrors<TFormValues>;
} & Omit<InputProps, 'name'>;

export const FormInput = <TFormValues extends FieldValues>({
  name,
  label,
  className,
  register,
  rules,
  errors,
  ...props
}: FormInputProps<TFormValues>): JSX.Element => {
  const { hasError, errorMessage } = getFormErrors(name, errors);

  return (
    <div className={cn(['', className])} aria-live="polite">
      <Input
        label={label}
        name={name}
        aria-invalid={hasError}
        className={cn([
          hasError &&
            'border-red-500 hover:border-red-500 focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50',
        ])}
        {...props}
        {...(register && register(name, rules))}
      />
      <FormErrorMessage>{errorMessage}</FormErrorMessage>
    </div>
  );
};

export default FormInput;
