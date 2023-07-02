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
import Button from '../../common/Button';
import axios from 'axios';
import toast from 'react-hot-toast';
import { SubmitFormProps } from '../FormTypes';

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
    if (currentFormStep !== RentModalFormSteps.Price) {
      return onNextFormStep();
    }

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

  const submitLabel = useMemo(() => {
    if (currentFormStep === RentModalFormSteps.Price) {
      return 'Create';
    }

    return 'Next';
  }, [currentFormStep]);

  return (
    <div>
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
      <div className="mt-12 flex items-center gap-x-4">
        <Button
          disabled={
            currentFormStep === RentModalFormSteps.Category || isSubmitting
          }
          className="w-full"
          size="lg"
          variant="outline"
          onClick={onPreviousFormStep}
        >
          Back
        </Button>
        <Button
          className="w-full"
          size="lg"
          onClick={handleSubmit(onSubmit)}
          isLoading={isSubmitting}
        >
          {submitLabel}
        </Button>
      </div>
    </div>
  );
};

export default RentForm;
