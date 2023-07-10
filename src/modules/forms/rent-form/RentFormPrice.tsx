import { FC } from 'react';
import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form';
import { RentFormFields } from './RentForm';
import FormControl from '@/src/modules/forms/components/FormControl';
import Heading from '@/src/modules/common/Heading';

type RentFormPriceProps = {
  register?: UseFormRegister<RentFormFields>;
  errors?: FieldErrors<RentFormFields>;
};

export const RentFormPrice: FC<RentFormPriceProps> = ({ register, errors }) => {
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

export default RentFormPrice;
