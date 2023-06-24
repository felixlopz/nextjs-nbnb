'use client';

import React, { useMemo, useState } from 'react';
import Modal from '@/src/modules/modal/Modal';
import useRentModal from '@/src/modules/modal/rent/useRentModal';
import Heading from '@/src/modules/common/Heading';
import categories from '@/src/modules/category/categories';
import CategoryInput from '@/src/modules/category/CategoryInput';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import CountrySelect from '@/src/modules/common/inputs/CountrySelect';
import dynamic from 'next/dynamic';
import Counter from '@/src/modules/common/inputs/Counter';
import ImageUpload from '@/src/modules/common/inputs/ImageUpload';
import Input from '@/src/modules/common/inputs/Input';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

export enum RentModalFormSteps {
  Category = 0,
  Location = 1,
  Info = 2,
  Images = 3,
  Description = 4,
  Price = 5,
}

const RentModal = () => {
  const rentModal = useRentModal();
  const [currentFormStep, setCurrentFormStep] = useState<RentModalFormSteps>(
    RentModalFormSteps.Category
  );
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      category: '',
      location: null,
      guestCount: 1,
      roomCount: 1,
      bathroomCount: 1,
      imageSrc: '',
      price: 1,
      title: '',
      description: '',
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    if (currentFormStep !== RentModalFormSteps.Price) {
      return onNextFormStep();
    }

    setIsLoading(true);

    axios
      .post('/api/listings', data)
      .then(() => {
        toast.success('Listing created!');
        router.refresh();
        reset();
        setCurrentFormStep(RentModalFormSteps.Category);
        rentModal.onClose();
      })
      .catch((error) => {
        console.log(error);
        toast.error('Something went wrong.');
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const category = watch('category');
  const location = watch('location');
  const guestCount = watch('guestCount');
  const roomCount = watch('roomCount');
  const bathroomCount = watch('bathroomCount');
  const imageSrc = watch('imageSrc');

  const Map = useMemo(
    () => dynamic(() => import('@/src/modules/common/Map'), { ssr: false }),
    [location]
  );

  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldDirty: true,
      shouldValidate: true,
      shouldTouch: true,
    });
  };

  const onNextFormStep = () => {
    if (currentFormStep === RentModalFormSteps.Price) {
      return;
    }
    setCurrentFormStep((value) => value + 1);
  };

  const onPreviousFormStep = () => {
    if (currentFormStep === RentModalFormSteps.Category) {
      return;
    }
    setCurrentFormStep((value) => value - 1);
  };

  const getSecondaryAction = useMemo(() => {
    return currentFormStep === RentModalFormSteps.Category
      ? undefined
      : onPreviousFormStep;
  }, [currentFormStep]);

  const actionLabel = useMemo(() => {
    if (currentFormStep === RentModalFormSteps.Price) {
      return 'Create';
    }

    return 'Next';
  }, [currentFormStep]);

  const secondaryActionLabel = useMemo(() => {
    if (currentFormStep === RentModalFormSteps.Category) {
      return undefined;
    }

    return 'Back';
  }, [currentFormStep]);

  let bodyContent = (
    <div className="flex flex-col gap-8">
      <Heading
        title="Which of these best describes your place?"
        subtitle="Pick a category"
      />
      <div
        className="
          grid 
          max-h-[50vh] 
          grid-cols-1 
          gap-3
          overflow-y-auto
          md:grid-cols-2
        "
      >
        {categories.map((item) => (
          <div key={item.label} className="col-span-1">
            <CategoryInput
              onClick={(category) => {
                setCustomValue('category', category);
              }}
              selected={category === item.label}
              label={item.label}
              icon={item.icon}
            />
          </div>
        ))}
      </div>
    </div>
  );

  if (currentFormStep === RentModalFormSteps.Location) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Where is your place located?"
          subtitle="Help guests find you!"
        />
        <CountrySelect
          value={location}
          onChange={(value) => setCustomValue('location', value)}
        />
        <Map center={location?.latlng} />
      </div>
    );
  }

  if (currentFormStep === RentModalFormSteps.Info) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Share some basics about your place"
          subtitle="What amenitis do you have?"
        />
        <Counter
          title="Guests"
          subtitle="How many guests do you allow?"
          value={guestCount}
          onChange={(value) => setCustomValue('guestCount', value)}
        />
        <hr />
        <Counter
          onChange={(value) => setCustomValue('roomCount', value)}
          value={roomCount}
          title="Rooms"
          subtitle="How many rooms do you have?"
        />
        <hr />
        <Counter
          onChange={(value) => setCustomValue('bathroomCount', value)}
          value={bathroomCount}
          title="Bathrooms"
          subtitle="How many bathrooms do you have?"
        />
      </div>
    );
  }

  if (currentFormStep === RentModalFormSteps.Images) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Add a photo of your place"
          subtitle="Show guests what your place looks like!"
        />
        <ImageUpload
          onChange={(value) => setCustomValue('imageSrc', value)}
          value={imageSrc}
        />
      </div>
    );
  }

  if (currentFormStep === RentModalFormSteps.Description) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="How would you describe your place?"
          subtitle="Short and sweet works best!"
        />
        <Input
          id="title"
          label="Title"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
        <hr />
        <Input
          id="description"
          label="Description"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
      </div>
    );
  }

  if (currentFormStep === RentModalFormSteps.Price) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Now, set your price"
          subtitle="How much do you charge per night?"
        />
        <Input
          id="price"
          label="Price"
          formatPrice
          type="number"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
      </div>
    );
  }

  return (
    <Modal
      title="Nextbnb your home!"
      isOpen={rentModal.isOpen}
      onClose={rentModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      actionLabel={actionLabel}
      secondaryActionLabel={secondaryActionLabel}
      secondaryAction={getSecondaryAction}
      body={bodyContent}
    />
  );
};

export default RentModal;
