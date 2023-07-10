'use client';

import { FC, useEffect, useState } from 'react';
import {
  FieldErrors,
  SubmitErrorHandler,
  SubmitHandler,
  useForm,
} from 'react-hook-form';
import ListingLocation from '@/src/modules/forms/listing-form-sections/ListingLocation';
import ListingCapacities from '@/src/modules/forms/listing-form-sections/ListingCapacities';
import axios from 'axios';
import { SubmitFormProps } from '../types';
import MultiStepForm, {
  convertEnumToNumberArray,
} from '../components/MultiStepForm';
import { InferType, object, string, number, array } from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import toast from 'react-hot-toast';
import { getFormErrors } from '@/src/modules/forms/utils';

export enum SearchModalFormSteps {
  Location = 0,
  Date = 1,
  Info = 2,
}

const searchFormFieldsValidationSchema = object({
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
});

export type RentFormFields = InferType<typeof searchFormFieldsValidationSchema>;

type RentFormProps = SubmitFormProps & {};

export const RentForm: FC<RentFormProps> = ({
  onSubmitStarted = () => {},
  onSubmitSuccess = () => {},
  onSubmitFail = (error) => {},
}) => {
  const [currentFormStep, setCurrentFormStep] = useState<SearchModalFormSteps>(
    SearchModalFormSteps.Location
  );

  const {
    handleSubmit,
    formState: { isSubmitting },
    reset,
    setValue,
    watch,
  } = useForm<RentFormFields>({
    defaultValues: {
      bathroomCount: 1,
      guestCount: 1,
      roomCount: 1,
    },
    resolver: yupResolver(searchFormFieldsValidationSchema),
  });

  useEffect(() => {
    return () => {
      reset();
      setCurrentFormStep(SearchModalFormSteps.Location);
    };
  }, [reset]);

  const location = watch('location');
  const guestCount = watch('guestCount');
  const roomCount = watch('roomCount');
  const bathroomCount = watch('bathroomCount');

  const setCustomValue = (id: any, value: any) => {
    setValue(id, value, {
      shouldDirty: true,
      shouldValidate: true,
      shouldTouch: true,
    });
  };

  // const onSubmit = useCallback(async () => {
  //   let currentQuery = {};

  //   if (params) {
  //     currentQuery = qs.parse(params.toString());
  //   }

  //   const updatedQuery: any = {
  //     ...currentQuery,
  //     locationValue: location?.value,
  //     guestCount,
  //     roomCount,
  //     bathroomCount,
  //   };

  //   if (dateRange.startDate) {
  //     updatedQuery.startDate = formatISO(dateRange.startDate);
  //   }

  //   if (dateRange.endDate) {
  //     updatedQuery.endDate = formatISO(dateRange.endDate);
  //   }

  //   const url = qs.stringifyUrl(
  //     {
  //       url: '/',
  //       query: updatedQuery,
  //     },
  //     { skipNull: true }
  //   );

  //   setStep(STEPS.LOCATION);
  //   searchModal.onClose();
  //   router.push(url);
  // }, [
  //   step,
  //   searchModal,
  //   location,
  //   router,
  //   guestCount,
  //   roomCount,
  //   dateRange,
  //   bathroomCount,
  //   params,
  // ]);

  const onSubmit: SubmitHandler<RentFormFields> = async (data) => {};

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
      totalSteps={convertEnumToNumberArray(SearchModalFormSteps)}
      updateStep={(step) => {
        setCurrentFormStep(step);
      }}
      onSubmit={handleSubmit(onSubmit, onInvalid)}
      isSubmitting={isSubmitting}
      actionLabel="Search"
    >
      {currentFormStep === SearchModalFormSteps.Location ? (
        <ListingLocation
          title="Where do you wanna go?"
          subtitle="Find the perfect location!"
          location={location}
          setCustomValue={setCustomValue}
        />
      ) : null}

      {currentFormStep === SearchModalFormSteps.Info ? (
        <ListingCapacities
          title="More information"
          subtitle="Find your perfect place!"
          roomTitle="How many rooms do you need?"
          bathroomTitle="How many bathrooms do you need?"
          guestTitle="How many guests are coming?"
          bathroomCount={bathroomCount}
          guestCount={guestCount}
          roomCount={roomCount}
          setCustomValue={setCustomValue}
        />
      ) : null}
    </MultiStepForm>
  );
};

export default RentForm;
