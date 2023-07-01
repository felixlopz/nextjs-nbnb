'use client';

import useLoginModal from '@/src/modules/modal/login/useLoginModal';
import Modal from '@/src/modules/modal/Modal';
import AuthProviders from '@/src/modules/common/AuthProviders';
import useRegisterModal from '@/src/modules/modal/register/useRegisterModal';

import LoginForm from '@/src/modules/forms/LoginForm';

const LoginModal = () => {
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

  return (
    <Modal
      title="Login"
      disabled={loginModal.isLoading}
      isOpen={loginModal.isOpen}
      onClose={loginModal.onClose}
      body={<LoginForm submitWithModal={true} />}
      footer={footerContent}
    />
  );
};

export default LoginModal;
