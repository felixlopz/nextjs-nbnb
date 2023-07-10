import { FC } from 'react';
import Heading from '@/src/modules/common/Heading';
import FormControl from '@/src/modules/forms/components/FormControl';
import { RentFormFields } from '@/src/modules/forms/rent-form/RentForm';
import { FieldErrors, UseFormRegister } from 'react-hook-form';

interface RentFormDescriptionProps {
  register?: UseFormRegister<RentFormFields>;
  errors?: FieldErrors<RentFormFields>;
}

export const RentFormDescription: FC<RentFormDescriptionProps> = ({
  register,
  errors,
}) => {
  return (
    <div className="flex flex-col gap-8">
      <Heading
        title="How would you describe your place?"
        subtitle="Short and sweet works best!"
      />
      <FormControl<RentFormFields>
        id="rent-title"
        name="title"
        label="Title"
        register={register}
        rules={{
          required: 'Title is required',
          minLength: {
            value: 5,
            message: 'Too short, 5 characters minimum',
          },
        }}
        errors={errors}
      />
      <hr />
      <FormControl<RentFormFields>
        id="rent-description"
        name="description"
        label="Description"
        register={register}
        rules={{
          required: 'Description is required',
        }}
        errors={errors}
      />
    </div>
  );
};

export default RentFormDescription;
