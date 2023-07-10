import { FC, useEffect } from 'react';
import Heading from '@/src/modules/common/Heading';
import { useForm } from 'react-hook-form';
import FormControl from '@/src/modules/forms/components/FormControl';
import Button from '@/src/modules/common/Button';
import axios from 'axios';
import { SubmitFormProps } from './FormTypes';

export type RegisterFormFields = {
  email: string;
  name: string;
  password: string;
};

type RegisterFormProps = SubmitFormProps & {};

const RegisterForm: FC<RegisterFormProps> = ({
  onSubmitStarted = () => {},
  onSubmitFail = () => {},
  onSubmitSuccess = () => {},
}) => {
  useEffect(() => {
    return () => {
      reset();
    };
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<RegisterFormFields>({
    defaultValues: { email: '', name: '', password: '' },
  });

  const onSubmit = handleSubmit(async (data) => {
    onSubmitStarted();
    try {
      await axios.post('/api/auth/register', data);
      onSubmitSuccess();
    } catch (error: any) {
      onSubmitFail(error.message);
    }
  });

  return (
    <form className="flex flex-col gap-4" onSubmit={onSubmit}>
      <Heading title="Welcome to Nextbnb" subtitle="Create an account!" />
      <FormControl<RegisterFormFields>
        id="register-email"
        name="email"
        label="Email"
        type="email"
        disabled={isSubmitting}
        register={register}
        rules={{
          required: 'Email is required.',
          minLength: {
            value: 5,
            message: 'Too short, 5 characters minimum',
          },
        }}
        errors={errors}
      />
      <FormControl<RegisterFormFields>
        id="register-name"
        name="name"
        label="Name"
        disabled={isSubmitting}
        register={register}
        rules={{
          required: 'Name is required.',
        }}
        errors={errors}
      />
      <FormControl<RegisterFormFields>
        id="register-password"
        name="password"
        label="Password"
        type="password"
        disabled={isSubmitting}
        register={register}
        rules={{
          required: 'Password is required',
          minLength: {
            value: 5,
            message: 'Too short, 5 characters minimum',
          },
        }}
        errors={errors}
      />
      <Button
        type="submit"
        className="w-full"
        size="lg"
        isLoading={isSubmitting}
      >
        Register
      </Button>
    </form>
  );
};

export default RegisterForm;
