import { cn } from '@/src/libs/utils';
import { FormInputProps } from './FormInput';
import { FieldValues } from 'react-hook-form';
import useFormErrors from '../useFormErrors';
import FormInputLabel from './FormInputLabel';
import NewInput from '@/src/modules/common/inputs/NewInput';
import FormErrorMessage from './FormErrorMessage';

type FormInputWithFloatingLabelProps<TFormValue extends FieldValues> = Omit<
  FormInputProps<TFormValue>,
  'placeholder'
> & {};

const FormInputWithFloatingLabel = <TFormValues extends FieldValues>({
  name,
  label,
  className,
  register,
  rules,
  errors,
  ...props
}: FormInputWithFloatingLabelProps<TFormValues>): JSX.Element => {
  const { hasError, errorMessage } = useFormErrors(name, errors);

  return (
    <div className={cn(['', className])} aria-live="polite">
      <div className="relative">
        <NewInput
          label={label}
          name={name}
          placeholder=" "
          aria-invalid={hasError}
          className={cn([
            hasError &&
              'border-red-500 hover:border-red-500 focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50',
            'peer pt-6',
          ])}
          {...props}
          {...(register && register(name, rules))}
        />
        <FormInputLabel className={cn([hasError && 'text-rose-500'])}>
          {label}
        </FormInputLabel>
      </div>
      <FormErrorMessage>{errorMessage}</FormErrorMessage>
    </div>
  );
};

export default FormInputWithFloatingLabel;