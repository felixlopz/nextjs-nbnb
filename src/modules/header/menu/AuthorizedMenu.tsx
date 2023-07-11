'use client';

import React from 'react';
import useRentModal from '@/modules/modal/rent/useRentModal';
import { signOut } from 'next-auth/react';
import MenuButton from '@/modules/header/menu/MenuButton';
import MenuLink from '@/modules/header/menu/MenuLink';

interface AuthorizedMenuProps {}

const AuthorizedMenu: React.FC<AuthorizedMenuProps> = ({}) => {
  const rentModal = useRentModal();

  return (
    <ul className="flex flex-col">
      <MenuLink href="/trips" label="My trips" />
      <MenuLink href="/favorites" label="My favorites" />
      <MenuLink href="/reservations" label="My reservations" />
      <MenuLink href="/properties" label="My properties" />
      <MenuButton
        onClick={() => {
          rentModal.onOpen();
        }}
        label="Nextbnb my home"
      />
      <hr></hr>
      <MenuButton
        onClick={() => {
          signOut();
        }}
        label="Logout"
      />
    </ul>
  );
};

export default AuthorizedMenu;
