import { create } from 'zustand';
import { ModalStore } from '../ModalTypes';

type RegisterModalStore = ModalStore & {};

const useRegisterModal = create<RegisterModalStore>((set) => ({
  isOpen: false,
  disabled: false,
  setDisabled: (disabled) => set({ disabled }),
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useRegisterModal;
