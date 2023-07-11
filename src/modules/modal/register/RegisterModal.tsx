'use client';

import useRegisterModal from '@/src/modules/modal/register/useRegisterModal';
import Modal from '@/src/modules/modal/Modal';
import AuthProviders from '@/src/modules/common/AuthProviders';
import useLoginModal from '@/src/modules/modal/login/useLoginModal';
import RegisterForm from '@/src/modules/forms/register-form/RegisterForm';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

const RegisterModal = () => {
  const router = useRouter();
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();

  const openLoginModal = () => {
    registerModal.onClose();
    loginModal.onOpen();
  };

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

  const onSubmitStarted = () => {
    registerModal.setIsLoading(true);
  };

  const onSubmitSuccess = () => {
    registerModal.setIsLoading(false);
    toast.success('Register completed, log in!');
    router.refresh();
    registerModal.onClose();
  };

  const onSubmitFail = (error?: string) => {
    registerModal.setIsLoading(false);
    toast.error(error || 'Something went wrong!');
  };

  return (
    <Modal
      title="Register"
      disabled={registerModal.isLoading}
      isOpen={registerModal.isOpen}
      onClose={registerModal.onClose}
      body={
        <RegisterForm
          onSubmitStarted={onSubmitStarted}
          onSubmitSuccess={onSubmitSuccess}
          onSubmitFail={(error) => onSubmitFail(error)}
        />
      }
      footer={footerContent}
    />
  );
};

export default RegisterModal;
