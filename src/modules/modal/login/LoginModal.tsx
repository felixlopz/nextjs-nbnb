'use client';

import useLoginModal from '@/modules/modal/login/useLoginModal';
import Modal from '@/modules/modal/Modal';
import AuthProviders from '@/modules/common/AuthProviders';
import useRegisterModal from '@/modules/modal/register/useRegisterModal';

import LoginForm from '@/modules/forms/login-form/LoginForm';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

const LoginModal = () => {
  const router = useRouter();
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();

  const openRegisterModal = () => {
    registerModal.onOpen();
    loginModal.onClose();
  };

  const footerContent = (
    <div className="mt-3 flex flex-col gap-4">
      <hr />
      <AuthProviders />
      <div className="mt-4 text-center font-light text-neutral-500">
        <div className="flex flex-row items-center justify-center gap-2">
          <div>Don&apos;t have an account?</div>
          <div
            onClick={openRegisterModal}
            className="cursor-pointer text-neutral-800 hover:underline"
          >
            Register
          </div>
        </div>
      </div>
    </div>
  );

  const onSubmitStarted = () => {
    loginModal.setDisabled(true);
  };

  const onSubmitSuccess = () => {
    loginModal.setDisabled(false);
    toast.success('Logged In!');
    router.refresh();
    loginModal.onClose();
  };

  const onSubmitFail = (error?: string) => {
    loginModal.setDisabled(false);
    toast.error(error || 'Something went wrong!');
  };

  return (
    <Modal
      title="Login"
      disabled={loginModal.disabled}
      isOpen={loginModal.isOpen}
      onClose={loginModal.onClose}
      body={
        <LoginForm
          onSubmitStarted={onSubmitStarted}
          onSubmitSuccess={onSubmitSuccess}
          onSubmitFail={(error?: string) => onSubmitFail(error)}
        />
      }
      footer={footerContent}
    />
  );
};

export default LoginModal;
