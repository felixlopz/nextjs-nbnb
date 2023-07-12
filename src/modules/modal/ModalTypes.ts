export interface ModalStore {
  isOpen: boolean;
  disabled: boolean;
  setDisabled: (isLoading: boolean) => void;
  onOpen: () => void;
  onClose: () => void;
}
