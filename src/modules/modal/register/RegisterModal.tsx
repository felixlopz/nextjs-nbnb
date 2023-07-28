'use client';

import useRegisterModal from '@/modules/modal/register/useRegisterModal';
import Modal from '@/modules/modal/Modal';
import AuthButtons from '@/modules/common/AuthButtons';
import useLoginModal from '@/modules/modal/login/useLoginModal';
import RegisterForm from '@/modules/forms/register-form/RegisterForm';
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
      <AuthButtons />
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
    registerModal.setDisabled(true);
  };

  const onSubmitSuccess = () => {
    registerModal.setDisabled(false);
    toast.success('Register completed, log in!');
    router.refresh();
    registerModal.onClose();
  };

  const onSubmitFail = (error?: string) => {
    registerModal.setDisabled(false);
    toast.error(error || 'Something went wrong!');
  };

  return (
    <Modal
      title="Register"
      disabled={registerModal.disabled}
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
