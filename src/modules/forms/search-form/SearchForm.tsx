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
import { SubmitFormProps } from '../types';
import MultiStepForm, {
  convertEnumToNumberArray,
} from '@/src/modules/forms/components/MultiStepForm';
import { InferType, object, string, number, array, date } from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import toast from 'react-hot-toast';
import { getFormErrors } from '@/src/modules/forms/utils';
import DateRangePicker from '@/src/modules/common/inputs/DateRangePicker';
import Heading from '@/src/modules/common/Heading';
import { useRouter, useSearchParams } from 'next/navigation';
import { formatISO } from 'date-fns';
import qs from 'query-string';
import { useListingSearchParams } from '@/src/hooks/useListingSearchParams';

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
  startDate: date().nullable().required('Select a start date.'),
  endDate: date().nullable().required('Select an end date.'),
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

  const updateStartDateAndEndDate = (startDate?: Date, endDate?: Date) => {
    if (startDate != null) {
      setValue('startDate', startDate);
    }
    if (endDate != null) {
      setValue('endDate', endDate);
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
        <div className="flex flex-col gap-8">
          <Heading
            title="When do you plan to go?"
            subtitle="Make sure everyone is free!"
          />
          <div className="flex min-h-[425px] justify-center">
            <DateRangePicker
              defaultRange={{ from: startDate, to: endDate }}
              updateStartDateAndEndDate={updateStartDateAndEndDate}
            />
          </div>
        </div>
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
