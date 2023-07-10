'use client';

import useLoginModal from '@/src/modules/modal/login/useLoginModal';
import useRentModal from '@/src/modules/modal/rent/useRentModal';
import { SafeUser } from '@/src/types';
import { useCallback, useEffect, useState } from 'react';

interface NavbarButtonProps {
  currentUser: SafeUser | null;
}

const NavbarButton: React.FC<NavbarButtonProps> = ({ currentUser }) => {
  const rentModal = useRentModal();
  const loginModal = useLoginModal();

  const onClick = useCallback(() => {
    if (currentUser == null) {
      loginModal.onOpen();
      return;
    }

    rentModal.onOpen();
  }, [currentUser, loginModal, rentModal]);

  return (
    <button
      onClick={onClick}
      className={`
          hidden
          cursor-pointer
          rounded-full 
          px-4 
          py-3 
          text-sm 
          font-semibold 
          transition 
          hover:bg-neutral-100 
          md:block
        `}
    >
      Nextbnb your home
    </button>
  );
};

export default NavbarButton;
