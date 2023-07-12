import { create } from 'zustand';
import { ModalStore } from '../ModalTypes';

type SearchModalStore = ModalStore & {};

const useSearchModal = create<SearchModalStore>((set) => ({
  isOpen: false,
  disabled: false,
  setDisabled: (disabled) => set({ disabled }),
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useSearchModal;
