import { FC, useEffect, useState } from 'react';
import Heading from '@/src/modules/common/Heading';
import { useForm } from 'react-hook-form';
import FormInputWithFloatingLabel from '@/src/modules/forms/components/FormInputWithFloatingLabel';
import { toast } from 'react-hot-toast';
import Button from '@/src/modules/common/Button';
import axios from 'axios';
import useRegisterModal from '@/src/modules/modal/register/useRegisterModal';

export type RegisterFormFields = {
  email: string;
  name: string;
  password: string;
};

interface RegisterFormProps {
  submitWithModal?: boolean;
}

const RegisterForm: FC<RegisterFormProps> = ({ submitWithModal }) => {
  const [isLoading, setIsLoading] = useState(false);
  const registerModal = useRegisterModal();

  useEffect(() => {
    return () => {
      reset();
    };
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<RegisterFormFields>({
    defaultValues: { email: '', name: '', password: '' },
  });

  const handleLoading = (loading: boolean) => {
    setIsLoading(loading);
    if (submitWithModal === true) {
      registerModal.setIsLoading(loading);
    }
  };

  const onSubmit = handleSubmit((data) => {
    handleLoading(true);
    axios
      .post('/api/auth/register', data)
      .then((res) => {
        toast.success('Successful registration');
        registerModal.onClose();
      })
      .catch((error) => {
        toast.error('Something went wrong :(');
      })
      .finally(() => {
        handleLoading(false);
        reset();
      });
  });

  return (
    <form className="flex flex-col gap-4" onSubmit={onSubmit}>
      <Heading title="Welcome to Nextbnb" subtitle="Create an account!" />
      <FormInputWithFloatingLabel<RegisterFormFields>
        id="register-email"
        name="email"
        label="Email"
        type="email"
        disabled={isLoading}
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
      <FormInputWithFloatingLabel<RegisterFormFields>
        id="register-name"
        name="name"
        label="Name"
        disabled={isLoading}
        register={register}
        rules={{
          required: 'Name is required.',
        }}
        errors={errors}
      />
      <FormInputWithFloatingLabel<RegisterFormFields>
        id="register-password"
        name="password"
        label="Password"
        type="password"
        disabled={isLoading}
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
      <Button type="submit" className="w-full" size="lg" isLoading={isLoading}>
        Register
      </Button>
    </form>
  );
};

export default RegisterForm;
