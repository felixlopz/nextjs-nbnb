'use client';

import { FC, useEffect, useState } from 'react';
import {
  FieldErrors,
  SubmitErrorHandler,
  SubmitHandler,
  useForm,
} from 'react-hook-form';
import axios from 'axios';
import { InferType } from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import toast from 'react-hot-toast';

import { getFormErrors } from '@/modules/forms/utils';
import { ModalStore } from '@/modules/modal/ModalTypes';
import MultiStepForm, {
  convertEnumToNumberArray,
} from '@/modules/forms/components/MultiStepForm';
import { SubmitFormProps } from '@/modules/forms/types';
import Heading from '@/modules/common/Heading';
import AddressInput from '@/modules/common/inputs/adress-input/AddressInput';
import { rentFormFieldsValidationSchema } from '../validations';
import {
  ListingCapacities,
  ListingCategorySelector,
  ListingImageUpload,
  ListingPrice,
  ListingTitleAndDescription,
} from '@/modules/forms/listing-form-sections';

export enum RentModalFormSteps {
  Category = 0,
  Location = 1,
  Info = 2,
  Images = 3,
  Description = 4,
  Price = 5,
}

export type RentFormFields = InferType<typeof rentFormFieldsValidationSchema>;

type RentFormProps = SubmitFormProps & {
  usingModal?: ModalStore;
};

export const RentForm: FC<RentFormProps> = ({
  usingModal,
  onSubmitStarted = () => {},
  onSubmitSuccess = () => {},
  onSubmitFail = (error) => {},
}) => {
  const [currentFormStep, setCurrentFormStep] = useState<RentModalFormSteps>(
    RentModalFormSteps.Category
  );
  const [lockSteps, setLockSteps] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
    reset,
    setValue,
    watch,
  } = useForm<RentFormFields>({
    defaultValues: {
      category: '',
      bathroomCount: 1,
      guestCount: 1,
      roomCount: 1,
      imageSrc: '',
      price: 5,
      title: '',
      description: '',
      address: {
        placeName: '',
      },
    },
    resolver: yupResolver(rentFormFieldsValidationSchema),
  });

  useEffect(() => {
    return () => {
      reset();
      setCurrentFormStep(RentModalFormSteps.Category);
    };
  }, [reset]);

  const category = watch('category');
  const address = watch('address');
  const guestCount = watch('guestCount');
  const roomCount = watch('roomCount');
  const bathroomCount = watch('bathroomCount');
  const imageSrc = watch('imageSrc');

  const setCustomValue = (id: any, value: any) => {
    setValue(id, value, {
      shouldDirty: true,
      shouldValidate: true,
      shouldTouch: true,
    });
  };

  const onSubmit: SubmitHandler<RentFormFields> = async (data) => {
    onSubmitStarted();
    try {
      await axios.post('/api/listings', data);
      onSubmitSuccess();
    } catch (error: any) {
      onSubmitFail(error.message);
    }
  };

  const onInvalid: SubmitErrorHandler<RentFormFields> = (
    errors: FieldErrors<RentFormFields>
  ) => {
    const firstErrorKey = Object.keys(errors)[0];

    if (firstErrorKey != null) {
      if (firstErrorKey === 'address') {
        toast.error('Select an address');
      } else {
        const { errorMessage } = getFormErrors(firstErrorKey, errors);
        toast.error(errorMessage);
      }
    }
  };

  return (
    <MultiStepForm
      step={currentFormStep}
      totalSteps={convertEnumToNumberArray(RentModalFormSteps)}
      updateStep={(step) => {
        setCurrentFormStep(step);
      }}
      onSubmit={handleSubmit(onSubmit, onInvalid)}
      isSubmitting={isSubmitting}
      actionLabel="Create"
      lockSteps={lockSteps}
    >
      {currentFormStep === RentModalFormSteps.Category ? (
        <ListingCategorySelector
          category={category}
          setCustomValue={setCustomValue}
        />
      ) : null}

      {currentFormStep === RentModalFormSteps.Location ? (
        <div className="flex flex-col gap-8">
          <Heading
            title="Where is your place located?"
            subtitle="Help guests find you!"
          />
          <AddressInput
            placeholder="Select an address"
            placeName={address.placeName}
            onPlaceChange={(address) => {
              if (address == null) {
                // @ts-expect-error
                setValue('address', { placeName: '' });
              } else {
                setValue('address', address);
              }
            }}
          />
        </div>
      ) : null}

      {currentFormStep === RentModalFormSteps.Info ? (
        <ListingCapacities
          title="Share some basics about your place"
          subtitle="What amenitis do you have?"
          roomTitle="How many rooms do you have?"
          bathroomTitle="How many bathrooms do you have?"
          guestTitle="How many guests do you allow?"
          bathroomCount={bathroomCount}
          guestCount={guestCount}
          roomCount={roomCount}
          setCustomValue={setCustomValue}
        />
      ) : null}

      {currentFormStep === RentModalFormSteps.Images ? (
        <ListingImageUpload
          imageSrc={imageSrc}
          onUploadSuccess={(url) => {
            setValue('imageSrc', url);
          }}
          onUploadStart={() => {
            usingModal?.setDisabled(true);
            setLockSteps(true);
          }}
          onUploadEnd={() => {
            usingModal?.setDisabled(false);
            setLockSteps(false);
          }}
        />
      ) : null}

      {currentFormStep === RentModalFormSteps.Description ? (
        <ListingTitleAndDescription register={register} />
      ) : null}

      {currentFormStep === RentModalFormSteps.Price ? (
        <ListingPrice register={register} />
      ) : null}
    </MultiStepForm>
  );
};

export default RentForm;
