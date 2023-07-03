import { create } from 'zustand';
import { ModalStore } from '../ModalTypes';

type SearchModalStore = ModalStore & {};

const useSearchModal = create<SearchModalStore>((set) => ({
  isOpen: false,
  isLoading: false,
  setIsLoading: (isLoading) => set({ isLoading }),
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useSearchModal;
