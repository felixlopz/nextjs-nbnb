import { create } from 'zustand';
import { ModalStore } from '../ModalTypes';

type LoginModalStore = ModalStore & {};

const useLoginModal = create<LoginModalStore>((set) => ({
  isOpen: false,
  isLoading: false,
  setIsLoading: (isLoading) => set({ isLoading }),
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useLoginModal;
