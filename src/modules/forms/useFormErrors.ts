import { DeepMap, FieldError, FieldErrors, FieldValues } from 'react-hook-form';

const useFormErrors = (
  name: string,
  errors?: Partial<DeepMap<FieldValues, FieldError>>
) => {
  const error = errors && errors[name];
  const hasError = error != null;
  const errorMessage = error?.message;
  return { hasError, errorMessage };
};

export default useFormErrors;
