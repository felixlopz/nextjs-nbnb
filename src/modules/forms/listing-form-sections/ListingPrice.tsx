'use client';

import { FC } from 'react';
import { FieldErrors, UseFormRegister } from 'react-hook-form';
import { RentFormFields } from '../rent-form/RentForm';
import FormControl from '@/modules/forms/components/FormControl';
import Heading from '@/modules/common/Heading';

type ListingPriceProps = {
  register?: UseFormRegister<RentFormFields>;
  errors?: FieldErrors<RentFormFields>;
};

export const ListingPrice: FC<ListingPriceProps> = ({ register, errors }) => {
  return (
    <div className="flex flex-col gap-8">
      <Heading
        title="Now, set your price"
        subtitle="How much do you charge per night?"
      />
      <FormControl<RentFormFields>
        id="price"
        name="price"
        label="Price $"
        type="number"
        register={register}
        rules={{ required: 'Price is required.' }}
        errors={errors}
      />
    </div>
  );
};

export default ListingPrice;
