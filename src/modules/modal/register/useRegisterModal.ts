import { create } from 'zustand';
import { ModalStore } from '../ModalTypes';

type RegisterModalStore = ModalStore & {};

const useRegisterModal = create<RegisterModalStore>((set) => ({
  isOpen: false,
  isLoading: false,
  setIsLoading: (isLoading) => set({ isLoading }),
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useRegisterModal;
