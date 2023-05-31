'use client';

import { AiOutlineMenu } from 'react-icons/ai';
import Avatar from '../Avatar';
import { useCallback, useState } from 'react';
import MenutItem from './MenutItem';
import useRegisterModal from '@/hooks/useRegisterModal';
import useLoginModal from '@/hooks/useLoginModal';
import { User } from '@prisma/client';
import { signOut } from 'next-auth/react';
import { getCurrentUser } from '@/actions/getCurrentUser';
import useCurrentUser from '@/hooks/useCurrentUser';

interface UserProps {
  currentUser?: User | null;
}

export const Menu = () => {
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const currentUser = useCurrentUser();

  const toggleMenuOpen = useCallback(() => {
    setIsMenuOpen((value) => !value);
  }, []);

  return (
    <div className="relative">
      <div className="flex flex-row items-center gap-3">
        <div
          className="
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
        "
        >
          Airbnb your home
        </div>
        <div
          onClick={toggleMenuOpen}
          className="
          flex
          cursor-pointer
          flex-row
          items-center 
          gap-3 
          rounded-full 
          border-[1px] 
          border-neutral-200 
          p-4 
          transition 
          hover:shadow-md 
          md:px-2 
          md:py-1
          "
        >
          <AiOutlineMenu />
          <div className="hidden md:block">
            <Avatar />
          </div>
        </div>
      </div>
      {isMenuOpen && (
        <div
          className="absolute 
            right-0 
            top-12
            w-[40vw]
            overflow-hidden 
            rounded-xl 
            bg-white 
            text-sm 
            shadow-md 
            md:w-3/4"
        >
          <div>
            {currentUser != null ? (
              <>
                <MenutItem onClick={() => {}} label="My trips" />
                <MenutItem onClick={() => {}} label="My favorites" />
                <MenutItem onClick={() => {}} label="My reservations" />
                <MenutItem onClick={() => {}} label="My properties" />
                <MenutItem onClick={() => {}} label="Airbnb my home" />
                <hr></hr>
                <MenutItem
                  onClick={() => {
                    signOut();
                  }}
                  label="Logout"
                />
              </>
            ) : (
              <>
                <MenutItem
                  onClick={() => {
                    loginModal.onOpen();
                  }}
                  label="Login"
                />
                <MenutItem
                  onClick={() => {
                    registerModal.onOpen();
                  }}
                  label="Sign up"
                />
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Menu;
