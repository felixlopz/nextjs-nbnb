'use client';

import { useRouter } from 'next/navigation';
import useSearchModal from '@/modules/modal/search/useSearchModal';
import Modal from '@/modules/modal/Modal';
import SearchForm from '@/modules/forms/search-form/SearchForm';

const SearchModal = () => {
  const router = useRouter();
  const searchModal = useSearchModal();

  const onSubmitStarted = () => {
    searchModal.setIsLoading(true);
  };

  const onSubmitSuccess = () => {
    searchModal.setIsLoading(false);
    searchModal.onClose();
  };

  const onSubmitFail = (error?: string) => {
    searchModal.setIsLoading(false);
  };

  return (
    <Modal
      title="Nextbnb your home!"
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
