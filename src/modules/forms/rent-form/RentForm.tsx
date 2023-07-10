'use client';

import { FC, useEffect, useState } from 'react';
import {
  FieldErrors,
  SubmitErrorHandler,
  SubmitHandler,
  useForm,
} from 'react-hook-form';
import RentFormCategorySelector from '@/src/modules/forms/rent-form/RentFormCategorySelector';
import RentFormLocation from '@/src/modules/forms/rent-form/RentFormLocation';
import RentFormInfo from './RentFormInfo';
import RentFormImage from './RentFormImage';
import RentFormDescription from './RentFormDescription';
import RentFormPrice from './RentFormPrice';
import axios from 'axios';
import { SubmitFormProps } from '../FormTypes';
import MultiStepForm, {
  convertEnumToNumberArray,
} from '../components/MultiStepForm';
import { InferType, object, string, number, array } from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { watch } from 'fs';
import toast from 'react-hot-toast';
import useFormErrors from '../useFormErrors';

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

  useEffect(() => {
    return () => {
      reset();
      setCurrentFormStep(RentModalFormSteps.Category);
    };
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
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
        const { errorMessage } = useFormErrors(firstErrorKey, errors);
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
    >
      {currentFormStep === RentModalFormSteps.Category ? (
        <RentFormCategorySelector
          category={category}
          setCustomValue={setCustomValue}
        />
      ) : null}

      {currentFormStep === RentModalFormSteps.Location ? (
        <RentFormLocation location={location} setCustomValue={setCustomValue} />
      ) : null}

      {currentFormStep === RentModalFormSteps.Info ? (
        <RentFormInfo
          bathroomCount={bathroomCount}
          guestCount={guestCount}
          roomCount={roomCount}
          setCustomValue={setCustomValue}
        />
      ) : null}

      {currentFormStep === RentModalFormSteps.Images ? (
        <RentFormImage imageSrc={imageSrc} setCustomValue={setCustomValue} />
      ) : null}

      {currentFormStep === RentModalFormSteps.Description ? (
        <RentFormDescription register={register} />
      ) : null}

      {currentFormStep === RentModalFormSteps.Price ? (
        <RentFormPrice register={register} />
      ) : null}
    </MultiStepForm>
  );
};

export default RentForm;
