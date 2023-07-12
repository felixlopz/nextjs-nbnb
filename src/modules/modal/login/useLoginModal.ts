import { create } from 'zustand';
import { ModalStore } from '../ModalTypes';

type LoginModalStore = ModalStore & {};

const useLoginModal = create<LoginModalStore>((set) => ({
  isOpen: false,
  disabled: false,
  setDisabled: (disabled) => set({ disabled }),
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useLoginModal;
