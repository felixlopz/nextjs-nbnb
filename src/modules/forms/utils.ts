import { DeepMap, FieldError, FieldValues } from 'react-hook-form';

export const getFormErrors = (
  name: string,
  errors?: Partial<DeepMap<FieldValues, FieldError>>
) => {
  const error = errors && errors[name];
  const hasError = error != null;
  const errorMessage = error?.message;
  return { hasError, errorMessage };
};
