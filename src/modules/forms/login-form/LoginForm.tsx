'use client';

import { FC, useEffect } from 'react';
import Heading from '@/modules/common/Heading';
import { useForm } from 'react-hook-form';
import FormControl from '@/modules/forms/components/FormControl';
import { signIn } from 'next-auth/react';
import Button from '@/modules/common/Button';
import { SubmitFormProps } from '../types';

export type LoginFormFields = {
  email: string;
  password: string;
};

type LoginFormProps = SubmitFormProps & {};

const LoginForm: FC<LoginFormProps> = ({
  onSubmitStarted = () => {},
  onSubmitFail = () => {},
  onSubmitSuccess = () => {},
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<LoginFormFields>({
    defaultValues: { email: '', password: '' },
  });

  useEffect(() => {
    return () => {
      reset();
    };
  }, [reset]);

  const onSubmit = handleSubmit(async (data) => {
    onSubmitStarted();
    try {
      const response = await signIn('credentials', {
        ...data,
        redirect: false,
      });

      if (response == null) {
        throw new Error('Something went wrong');
      }
      const { error } = response;
      if (error != null) {
        throw new Error(error);
      }
      onSubmitSuccess();
    } catch (error: any) {
      onSubmitFail(error.message);
    }
  });

  return (
    <form className="flex flex-col gap-4" onSubmit={onSubmit}>
      <Heading title="Welcome back" subtitle="Login to your account" />
      <FormControl<LoginFormFields>
        id="login-email"
        name="email"
        label="Email"
        type="email"
        disabled={isSubmitting}
        register={register}
        rules={{
          required: 'Email is required',
        }}
        errors={errors}
      />
      <FormControl<LoginFormFields>
        id="login-password"
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
        Log in
      </Button>
    </form>
  );
};

export default LoginForm;
