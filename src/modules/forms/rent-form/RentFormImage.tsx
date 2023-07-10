import { FC } from 'react';
import Heading from '@/src/modules/common/Heading';
import ImageUpload from '@/src/modules/common/inputs/ImageUpload';

interface RentFormImageProps {
  imageSrc: string;
  setCustomValue: (id: string, value: any) => void;
}

export const RentFormImage: FC<RentFormImageProps> = ({
  imageSrc,
  setCustomValue,
}) => {
  return (
    <div className="flex flex-col gap-8">
      <Heading
        title="Add a photo of your place"
        subtitle="Show guests what your place looks like!"
      />
      <ImageUpload
        onChange={(value) => setCustomValue('imageSrc', value)}
        value={imageSrc}
      />
    </div>
  );
};

export default RentFormImage;
