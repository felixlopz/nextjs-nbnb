import { create } from 'zustand';
import { ModalStore } from '../ModalTypes';

type RentModalStore = ModalStore & {};

const useRentModal = create<RentModalStore>((set) => ({
  isOpen: false,
  isLoading: false,
  setIsLoading: (isLoading) => set({ isLoading }),
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useRentModal;
