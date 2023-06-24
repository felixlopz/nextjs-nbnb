import { FC, useEffect, useState } from 'react';
import Heading from '@/src/modules/common/Heading';
import { SubmitHandler, useForm } from 'react-hook-form';
import FormInputWithFloatingLabel from './components/FormInputWithFloatingLabel';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import useLoginModal from '../modal/login/useLoginModal';
import { toast } from 'react-hot-toast';
import Button from '../common/Button';

export type LoginFormFields = {
  email: string;
  password: string;
};

interface LoginFormProps {}

const LoginForm: FC<LoginFormProps> = ({}) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const loginModal = useLoginModal();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<LoginFormFields>({
    defaultValues: { email: '', password: '' },
  });

  useEffect(() => {
    return () => {
      reset();
    };
  }, []);

  const onSubmit = handleSubmit((data) => {
    setIsLoading(true);
    signIn('credentials', { ...data, redirect: false }).then((callback) => {
      setIsLoading(false);
      if (callback?.ok) {
        toast.success('Logged In');
        reset();
        router.refresh();
        loginModal.onClose();
      }
      if (callback?.error) {
        toast.error(callback.error);
      }
    });
  });

  return (
    <form className="flex flex-col gap-4" onSubmit={onSubmit}>
      <Heading title="Welcome back" subtitle="Login to your account" />
      <FormInputWithFloatingLabel<LoginFormFields>
        id="login-email"
        name="email"
        label="Email"
        type="email"
        disabled={isLoading}
        register={register}
        rules={{
          minLength: {
            value: 5,
            message: 'Too short, 5 characters minimum',
          },
        }}
        errors={errors}
      />
      <FormInputWithFloatingLabel<LoginFormFields>
        id="login-password"
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
      <Button type="submit" className="w-full" size="lg">
        Log in
      </Button>
    </form>
  );
};

export default LoginForm;
