'use client';

import { useRouter } from 'next/navigation';
import useSearchModal from '@/src/modules/modal/search/useSearchModal';
import Modal from '@/src/modules/modal/Modal';
import SearchForm from '@/src/modules/forms/search-form/SearchForm';

const SearchModal = () => {
  const router = useRouter();
  const searchModal = useSearchModal();

  const onSubmitStarted = () => {
    searchModal.setIsLoading(true);
  };

  const onSubmitSuccess = () => {
    searchModal.setIsLoading(false);
    router.refresh();
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
