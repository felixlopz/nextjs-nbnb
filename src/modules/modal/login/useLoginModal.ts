import { create } from 'zustand';

interface LoginModalStore {
  isOpen: boolean;
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
  onOpen: () => void;
  onClose: () => void;
}

const useLoginModal = create<LoginModalStore>((set) => ({
  isOpen: false,
  isLoading: false,
  setIsLoading: (isLoading) => set({ isLoading }),
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useLoginModal;
