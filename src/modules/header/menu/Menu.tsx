'use client';

import Avatar from '@/src/modules/common/Avatar';
import { FC, useCallback, useState } from 'react';
import { AiOutlineMenu } from 'react-icons/ai';
import AuthorizedMenu from './AuthorizedMenu';
import UnAuthorizedMenu from './UnAuthorizedMenu';
import { useClickAway } from '@/src/hooks/useClickAway';
import { SafeUser } from '@/src/types';

interface MenuProps {
  currentUser: SafeUser | null;
}

const Menu: FC<MenuProps> = ({ currentUser }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const ref = useClickAway(() => {
    setIsMenuOpen(false);
  });

  const toggleMenuOpen = useCallback(async () => {
    setIsMenuOpen((value) => !value);
  }, []);

  return (
    <div className="relative hidden md:block" ref={ref}>
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
      {isMenuOpen && (
        <div
          onClick={toggleMenuOpen}
          className="absolute right-0 top-full mt-2.5 w-48 overflow-hidden rounded-xl bg-white text-sm shadow-md"
        >
          {currentUser != null ? <AuthorizedMenu /> : <UnAuthorizedMenu />}
        </div>
      )}
    </div>
  );
};

export default Menu;
