import { FC } from 'react';
import categories from '@/src/modules/category/categories';
import Heading from '@/src/modules/common/Heading';
import CategoryInput from '@/src/modules/category/CategoryInput';

interface RentFormCategorySelectorProps {
  category: string;
  setCustomValue: (id: string, value: any) => void;
}

export const RentFormCategorySelector: FC<RentFormCategorySelectorProps> = ({
  category,
  setCustomValue,
}) => {
  return (
    <div className="flex flex-col gap-8">
      <Heading
        title="Which of these best describes your place?"
        subtitle="Pick a category"
      />
      <div
        className="
          grid 
          max-h-[50vh] 
          grid-cols-1 
          gap-3
          overflow-y-auto
          p-4
          md:grid-cols-2
        "
      >
        {categories.map((item) => (
          <div key={item.label} className="col-span-1">
            <CategoryInput
              onClick={(category) => {
                setCustomValue('category', category);
              }}
              selected={category === item.label}
              label={item.label}
              icon={item.icon}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default RentFormCategorySelector;
