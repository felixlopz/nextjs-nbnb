'use client';

import { FC, useEffect, useState } from 'react';
import {
  FieldErrors,
  SubmitErrorHandler,
  SubmitHandler,
  useForm,
} from 'react-hook-form';
import ListingLocation from '@/modules/forms/listing-form-sections/ListingLocation';
import ListingCapacities from '@/modules/forms/listing-form-sections/ListingCapacities';
import { SubmitFormProps } from '../types';
import MultiStepForm, {
  convertEnumToNumberArray,
} from '@/modules/forms/components/MultiStepForm';
import { InferType, object, string, number, array, date } from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import toast from 'react-hot-toast';
import { getFormErrors } from '@/modules/forms/utils';
import { useRouter, useSearchParams } from 'next/navigation';
import { formatISO } from 'date-fns';
import qs from 'query-string';
import { useListingSearchParams } from '@/hooks/useListingSearchParams';
import ListingDateRange from '@/modules/forms/listing-form-sections/ListingDateRange';
import { DateRange } from 'react-day-picker';

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
    .optional()
    .required('Select a location.'),
  guestCount: number().positive().required(),
  roomCount: number().positive().required(),
  bathroomCount: number().positive().required(),
  startDate: date().optional().required('Select a start date.'),
  endDate: date().optional().required('Select an end date.'),
});

export type SearchFormFields = InferType<
  typeof searchFormFieldsValidationSchema
>;

type SearchFormProps = SubmitFormProps & {};

export const SearchForm: FC<SearchFormProps> = ({
  onSubmitStarted = () => {},
  onSubmitSuccess = () => {},
  onSubmitFail = (error) => {},
}) => {
  const [currentFormStep, setCurrentFormStep] = useState<SearchModalFormSteps>(
    SearchModalFormSteps.Location
  );
  const params = useSearchParams();
  const router = useRouter();
  const listingSearchParams = useListingSearchParams();

  const {
    handleSubmit,
    formState: { isSubmitting },
    reset,
    setValue,
    watch,
  } = useForm<SearchFormFields>({
    defaultValues: {
      bathroomCount: listingSearchParams.bathroomCount,
      guestCount: listingSearchParams.guestCount,
      roomCount: listingSearchParams.roomCount,
      startDate: listingSearchParams.startDate,
      endDate: listingSearchParams.endDate,
      location: listingSearchParams.location,
    },

    resolver: yupResolver(searchFormFieldsValidationSchema),
  });

  useEffect(() => {
    return () => {
      setCurrentFormStep(SearchModalFormSteps.Location);
    };
  }, [reset]);

  const location = watch('location');
  const guestCount = watch('guestCount');
  const roomCount = watch('roomCount');
  const bathroomCount = watch('bathroomCount');
  const startDate = watch('startDate');
  const endDate = watch('endDate');

  const updateStartDateAndEndDate = (range?: DateRange) => {
    if (range == null) {
      // @ts-expect-error
      setValue('startDate', undefined);
      // @ts-expect-error
      setValue('endDate', undefined);
      return;
    }
    if (range.from != null) {
      setValue('startDate', range.from);
    }
    if (range.to != null) {
      setValue('endDate', range.to);
    }
  };

  const setCustomValue = (id: any, value: any) => {
    setValue(id, value, {
      shouldDirty: true,
      shouldValidate: true,
      shouldTouch: true,
    });
  };

  const onSubmit: SubmitHandler<SearchFormFields> = async () => {
    onSubmitStarted();

    let currentQuery = {};

    if (params) {
      currentQuery = qs.parse(params.toString());
    }

    const updatedQuery: any = {
      ...currentQuery,
      locationValue: location?.value,
      guestCount,
      roomCount,
      bathroomCount,
    };

    if (startDate) {
      updatedQuery.startDate = formatISO(startDate);
    }

    if (endDate) {
      updatedQuery.endDate = formatISO(endDate);
    }

    const url = qs.stringifyUrl(
      {
        url: '/',
        query: updatedQuery,
      },
      { skipNull: true }
    );

    router.push(url);
    onSubmitSuccess();
  };

  const onInvalid: SubmitErrorHandler<SearchFormFields> = (
    errors: FieldErrors<SearchFormFields>
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

      {currentFormStep === SearchModalFormSteps.Date ? (
        <ListingDateRange
          range={{ from: startDate, to: endDate }}
          onChangeDate={updateStartDateAndEndDate}
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

export default SearchForm;
