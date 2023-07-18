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
import { InferType } from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import toast from 'react-hot-toast';
import { getFormErrors } from '@/modules/forms/utils';
import { useRouter, useSearchParams } from 'next/navigation';
import { formatISO } from 'date-fns';
import qs from 'query-string';
import { useListingSearchParams } from '@/hooks/useListingSearchParams';
import ListingDateRange from '@/modules/forms/listing-form-sections/ListingDateRange';
import { DateRange } from 'react-day-picker';
import { searchFormFieldsValidationSchema } from '../validations';
import Heading from '@/modules/common/Heading';
import AddressInput from '@/modules/common/inputs/adress-input/AddressInput';

export enum SearchModalFormSteps {
  Location = 0,
  Date = 1,
  Info = 2,
}

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
      // bathroomCount: listingSearchParams.bathroomCount,
      // guestCount: listingSearchParams.guestCount,
      // roomCount: listingSearchParams.roomCount,
      // startDate: listingSearchParams.startDate,
      // endDate: listingSearchParams.endDate,
      // location: listingSearchParams.location,
      bathroomCount: 1,
      guestCount: 1,
      roomCount: 1,
      address: {
        placeName: '',
      },
    },

    resolver: yupResolver(searchFormFieldsValidationSchema),
  });

  useEffect(() => {
    return () => {
      setCurrentFormStep(SearchModalFormSteps.Location);
    };
  }, [reset]);

  const address = watch('address');
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

    const [lng, lat] = address.location.coordinates;

    const updatedQuery: any = {
      ...currentQuery,
      lat,
      lng,
      radius: 50000,
      guestCount,
      roomCount,
      bathroomCount,
    };

    if (startDate) {
      updatedQuery.startDate = startDate.toISOString();
    }

    if (endDate) {
      updatedQuery.endDate = endDate.toISOString();
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
      totalSteps={convertEnumToNumberArray(SearchModalFormSteps)}
      updateStep={(step) => {
        setCurrentFormStep(step);
      }}
      onSubmit={handleSubmit(onSubmit, onInvalid)}
      isSubmitting={isSubmitting}
      actionLabel="Search"
    >
      {currentFormStep === SearchModalFormSteps.Location ? (
        <div className="flex flex-col gap-8">
          <Heading
            title="Where do you wanna go?"
            subtitle="Find the perfect location!"
          />
          <AddressInput
            placeholder="Search for a place"
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
