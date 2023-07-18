'use client';

import useSearchModal from '@/modules/modal/search/useSearchModal';
import Modal from '@/modules/modal/Modal';
import SearchForm from '@/modules/forms/search-form/SearchForm';

const SearchModal = () => {
  const searchModal = useSearchModal();

  const onSubmitStarted = () => {
    searchModal.setDisabled(true);
  };

  const onSubmitSuccess = () => {
    searchModal.setDisabled(false);
    searchModal.onClose();
  };

  const onSubmitFail = (error?: string) => {
    searchModal.setDisabled(false);
  };

  return (
    <Modal
      isOpen={searchModal.isOpen}
      onClose={searchModal.onClose}
      body={
        <SearchForm
          onSubmitStarted={onSubmitStarted}
          onSubmitSuccess={onSubmitSuccess}
          onSubmitFail={(error) => {
            onSubmitFail(error);
          }}
        />
      }
    />
  );
};

export default SearchModal;
