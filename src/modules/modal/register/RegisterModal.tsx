'use client';

import axios from 'axios';
import { useState } from 'react';

import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';

import useRegisterModal from '@/src/modules/modal/register/useRegisterModal';
import Modal from '@/src/modules/modal/Modal';
import Heading from '@/src/modules/common/Heading';
import Input from '@/src/modules/common/inputs/Input';
import { toast } from 'react-hot-toast';
import AuthProviders from '@/src/modules/common/AuthProviders';
import useLoginModal from '@/src/modules/modal/login/useLoginModal';

const RegisterModal = () => {
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FieldValues>({
    defaultValues: { name: '', email: '', password: '' },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);
    axios
      .post('/api/auth/register', data)
      .then((res) => {
        registerModal.onClose();
      })
      .catch((error) => {
        toast.error('Something went wrong :(');
      })
      .finally(() => {
        setIsLoading(false);
        reset();
      });
  };

  const openLoginModal = () => {
    registerModal.onClose();
    loginModal.onOpen();
  };

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading title="Welcome to Nextbnb" subtitle="Create an account!" />
      <Input
        id="email"
        label="Email"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="name"
        label="Name"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="password"
        label="Password"
        type="password"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
    </div>
  );

  const footerContent = (
    <div className="mt-3 flex flex-col gap-4">
      <hr />
      <AuthProviders />
      <div className="mt-4 text-center font-light text-neutral-500">
        <div className="flex flex-row items-center justify-center gap-2">
          <div>Already have an account?</div>
          <div
            onClick={openLoginModal}
            className="cursor-pointer text-neutral-800 hover:underline"
          >
            Log in
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <Modal
      title="Register"
      actionLabel="Continue"
      disabled={isLoading}
      isOpen={registerModal.isOpen}
      onClose={registerModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  );
};

export default RegisterModal;
