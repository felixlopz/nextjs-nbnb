'use client';

import React from 'react';
import Modal from '@/modules/modal/Modal';
import useRentModal from '@/modules/modal/rent/useRentModal';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import RentForm from '@/modules/forms/rent-form/RentForm';

const RentModal = () => {
  const rentModal = useRentModal();
  const router = useRouter();

  const onSubmitStarted = () => {
    rentModal.setDisabled(true);
  };

  const onSubmitSuccess = () => {
    rentModal.setDisabled(false);
    toast.success('Listing created');
    router.refresh();
    rentModal.onClose();
  };

  const onSubmitFail = (error?: string) => {
    rentModal.setDisabled(false);
    toast.error(error || 'Something went wrong!');
  };

  return (
    <Modal
      title="Nextbnb your home!"
      disabled={rentModal.disabled}
      isOpen={rentModal.isOpen}
      onClose={rentModal.onClose}
      body={
        <RentForm
          onSubmitStarted={onSubmitStarted}
          onSubmitSuccess={onSubmitSuccess}
          onSubmitFail={(error) => {
            onSubmitFail(error);
          }}
          usingModal={rentModal}
        />
      }
    />
  );
};

export default RentModal;
