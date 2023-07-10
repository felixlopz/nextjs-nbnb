import { FC } from 'react';
import RentModal from './rent/RentModal';
import LoginModal from './login/LoginModal';
import RegisterModal from './register/RegisterModal';
import SearchModal from './search/SearchModal';

interface ModalManagerProps {}

const ModalManager: FC<ModalManagerProps> = () => {
  return (
    <>
      <LoginModal />
      <RegisterModal />
      <RentModal />
      <SearchModal />
    </>
  );
};

export default ModalManager;
