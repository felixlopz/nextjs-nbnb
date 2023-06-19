'use client';

import useLoginModal from '@/src/hooks/useLoginModal';
import MenuButton from './MenuButton';
import MenuItem from './MenuItem';
import useRegisterModal from '@/src/hooks/useRegisterModal';

const UnAuthorizedMenu = () => {
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();
  return (
    <ul className="flex flex-col">
      <MenuButton
        onClick={() => {
          console.log('Enters here');
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
