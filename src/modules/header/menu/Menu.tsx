'use client';

import Avatar from '@/modules/common/Avatar';
import { FC, useCallback, useState } from 'react';
import { AiOutlineMenu } from 'react-icons/ai';
import AuthorizedMenu from '@/modules/header/menu/AuthorizedMenu';
import UnAuthorizedMenu from '@/modules/header/menu/UnAuthorizedMenu';
import { useOnClickOutside } from '@/hooks/useOnClickOutside';
import { SafeUser } from '@/types';

interface MenuProps {
  currentUser: SafeUser | null;
}

const Menu: FC<MenuProps> = ({ currentUser }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const ref = useOnClickOutside(() => {
    setIsMenuOpen(false);
  });

  const toggleMenuOpen = useCallback(async () => {
    setIsMenuOpen((value) => !value);
  }, []);

  return (
    <div
      className="relative hidden md:block"
      ref={ref as React.RefObject<HTMLDivElement>}
    >
      <button
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
      </button>
      {isMenuOpen && (
        <div
          onClick={toggleMenuOpen}
          className="absolute right-0 top-full z-50 mt-2.5 w-48 overflow-hidden rounded-xl bg-white text-sm shadow-md"
        >
          {currentUser == null ? <UnAuthorizedMenu /> : <AuthorizedMenu />}
        </div>
      )}
    </div>
  );
};

export default Menu;
