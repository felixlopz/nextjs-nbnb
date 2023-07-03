'use client';

import { FC, useEffect, useMemo, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import RentFormCategorySelector from '@/src/modules/forms/rent-form/RentFormCategorySelector';
import RentFormLocation from '@/src/modules/forms/rent-form/RentFormLocation';
import { Location } from '@/src/modules/common/inputs/CountrySelect';
import RentFormInfo from './RentFormInfo';
import RentFormImage from './RentFormImage';
import RentFormDescription from './RentFormDescription';
import RentFormPrice from './RentFormPrice';
import axios from 'axios';
import { SubmitFormProps } from '../FormTypes';
import MultiStepForm, {
  convertEnumToNumberArray,
} from '../components/MultiStepForm';

export enum RentModalFormSteps {
  Category = 0,
  Location = 1,
  Info = 2,
  Images = 3,
  Description = 4,
  Price = 5,
}
export type RentFormFields = {
  category: string;
  location: Location;
  guestCount: number;
  roomCount: number;
  bathroomCount: number;
  imageSrc: string;
  price: number;
  title: string;
  description: string;
};

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
    setValue,
    watch,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<RentFormFields>({
    defaultValues: {
      category: '',
      location: {},
      guestCount: 1,
      roomCount: 1,
      bathroomCount: 1,
      imageSrc: '',
      price: 1,
      title: '',
      description: '',
    },
  });

  const category = watch('category');
  const location = watch('location');
  const guestCount = watch('guestCount');
  const roomCount = watch('roomCount');
  const bathroomCount = watch('bathroomCount');
  const imageSrc = watch('imageSrc');

  const onSubmit: SubmitHandler<RentFormFields> = async (data) => {
    onSubmitStarted();
    try {
      await axios.post('/api/listings', data);
      onSubmitSuccess();
    } catch (error: any) {
      onSubmitFail(error.message);
    }
  };

  const setCustomValue = (id: any, value: any) => {
    setValue(id, value, {
      shouldDirty: true,
      shouldValidate: true,
      shouldTouch: true,
    });
  };

  return (
    <MultiStepForm
      step={currentFormStep}
      totalSteps={convertEnumToNumberArray(RentModalFormSteps)}
      updateStep={(step) => {
        setCurrentFormStep(step);
      }}
      onSubmit={() => {
        handleSubmit(onSubmit);
      }}
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
        <RentFormDescription register={register} errors={errors} />
      ) : null}

      {currentFormStep === RentModalFormSteps.Price ? (
        <RentFormPrice register={register} errors={errors} />
      ) : null}
    </MultiStepForm>
  );
};

export default RentForm;
