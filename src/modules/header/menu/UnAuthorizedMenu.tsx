'use client';

import useLoginModal from '@/modules/modal/login/useLoginModal';
import MenuButton from './MenuButton';
import useRegisterModal from '@/modules/modal/register/useRegisterModal';

const UnAuthorizedMenu = () => {
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();
  return (
    <ul className="flex flex-col">
      <MenuButton
        onClick={() => {
          loginModal.onOpen();
        }}
        label="Login"
      />
      <MenuButton
        onClick={() => {
          registerModal.onOpen();
        }}
        label="Sign up"
      />
    </ul>
  );
};

export default UnAuthorizedMenu;
