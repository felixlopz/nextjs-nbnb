import { create } from 'zustand';
import { ModalStore } from '../ModalTypes';

type RentModalStore = ModalStore & {};

const useRentModal = create<RentModalStore>((set) => ({
  isOpen: false,
  disabled: false,
  setDisabled: (disabled) => set({ disabled }),
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useRentModal;
