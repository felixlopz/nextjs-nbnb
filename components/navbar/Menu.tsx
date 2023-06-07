'use client';

import { AiOutlineMenu } from 'react-icons/ai';
import Avatar from '../Avatar';
import { useCallback, useState } from 'react';
import MenutItem from './MenutItem';
import useRegisterModal from '@/hooks/useRegisterModal';
import useLoginModal from '@/hooks/useLoginModal';
import { User } from '@prisma/client';
import { signOut } from 'next-auth/react';
import useRentModal from '@/hooks/useRentModal';

interface MenuProps {
  currentUser?: User | null;
}

export const Menu: React.FC<MenuProps> = (props) => {
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const rentModal = useRentModal();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { currentUser } = props;

  const toggleMenuOpen = useCallback(async () => {
    setIsMenuOpen((value) => !value);
  }, []);

  const onRent = useCallback(() => {
    if (currentUser == null) {
      return loginModal.onOpen();
    }

    rentModal.onOpen();
  }, [currentUser, loginModal]);

  return (
    <div className="relative">
      <div className="flex flex-row items-center gap-3">
        <div
          onClick={onRent}
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
          Nextbnb your home
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
            <Avatar src={currentUser?.image} />
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
                <MenutItem
                  onClick={() => {
                    rentModal.onOpen();
                  }}
                  label="Nextbnb my home"
                />
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
