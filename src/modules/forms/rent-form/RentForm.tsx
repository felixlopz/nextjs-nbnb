'use client';

import { FC, useEffect, useState } from 'react';
import {
  FieldErrors,
  SubmitErrorHandler,
  SubmitHandler,
  useForm,
} from 'react-hook-form';
import ListingCategorySelector from '@/src/modules/forms/listing-form-sections/ListingCategorySelector';
import ListingLocation from '@/src/modules/forms/listing-form-sections/ListingLocation';
import ListingCapacities from '@/src/modules/forms/listing-form-sections/ListingCapacities';
import ListingImage from '@/src/modules/forms/listing-form-sections/ListingImage';
import ListingTitleAndDescription from '@/src/modules/forms/listing-form-sections/ListingTitleAndDescription';
import ListingPrice from '@/src/modules/forms/listing-form-sections/ListingPrice';
import axios from 'axios';
import { SubmitFormProps } from '../types';
import MultiStepForm, {
  convertEnumToNumberArray,
} from '../components/MultiStepForm';
import { InferType, object, string, number, array } from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import toast from 'react-hot-toast';
import { getFormErrors } from '@/src/modules/forms/utils';

export enum RentModalFormSteps {
  Category = 0,
  Location = 1,
  Info = 2,
  Images = 3,
  Description = 4,
  Price = 5,
}

const rentFormFieldsValidationSchema = object({
  category: string().required('Select a category.'),
  location: object()
    .shape({
      flag: string().required('Select a location'),
      label: string().required('Select a location'),
      latlng: array().of(number().required()).required('select a location'),
      region: string().required('Select a location'),
      value: string().required('Select a location'),
    })
    .nullable()
    .required('Select a location.'),
  guestCount: number().positive().required(),
  roomCount: number().positive().required(),
  bathroomCount: number().positive().required(),
  imageSrc: string().url('Image url not valid').required('Upload an image'),
  title: string().required('Add a title to property'),
  description: string().required('Add a descrption to property.'),
  price: number()
    .min(5, 'Minimum of 5$ per night.')
    .required('Put a price to your listing.'),
});

export type RentFormFields = InferType<typeof rentFormFieldsValidationSchema>;

type RentFormProps = SubmitFormProps & {};

export const RentForm: FC<RentFormProps> = ({
  onSubmitStarted = () => {},
  onSubmitSuccess = () => {},
  onSubmitFail = (error) => {},
}) => {
  const [currentFormStep, setCurrentFormStep] = useState<RentModalFormSteps>(
    RentModalFormSteps.Category
  );

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
  const location = watch('location');
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
      if (firstErrorKey === 'location') {
        toast.error('Select a location');
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
    >
      {currentFormStep === RentModalFormSteps.Category ? (
        <ListingCategorySelector
          category={category}
          setCustomValue={setCustomValue}
        />
      ) : null}

      {currentFormStep === RentModalFormSteps.Location ? (
        <ListingLocation
          title="Where is your place located?"
          subtitle="Help guests find you!"
          location={location}
          setCustomValue={setCustomValue}
        />
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
        <ListingImage imageSrc={imageSrc} setCustomValue={setCustomValue} />
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
