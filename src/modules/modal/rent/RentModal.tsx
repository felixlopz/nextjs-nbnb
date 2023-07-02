'use client';

import React from 'react';
import Modal from '@/src/modules/modal/Modal';
import useRentModal from '@/src/modules/modal/rent/useRentModal';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import RentForm from '@/src/modules/forms/rent-form/RentForm';

const RentModal = () => {
  const rentModal = useRentModal();
  const router = useRouter();

  const onSubmitStarted = () => {
    rentModal.setIsLoading(true);
  };

  const onSubmitSuccess = () => {
    rentModal.setIsLoading(false);
    toast.success('Listing created');
    router.refresh();
    rentModal.onClose();
  };

  const onSubmitFail = (error?: string) => {
    rentModal.setIsLoading(false);
    toast.error(error || 'Something went wrong!');
  };

  return (
    <Modal
      title="Nextbnb your home!"
      isOpen={rentModal.isOpen}
      onClose={rentModal.onClose}
      body={
        <RentForm
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

export default RentModal;
