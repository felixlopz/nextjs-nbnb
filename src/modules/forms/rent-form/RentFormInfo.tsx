import { FC } from 'react';
import Heading from '@/src/modules/common/Heading';
import Counter from '@/src/modules/common/inputs/Counter';

interface RentFormInfoProps {
  guestCount: number;
  roomCount: number;
  bathroomCount: number;
  setCustomValue: (id: string, value: any) => void;
}

export const RentFormInfo: FC<RentFormInfoProps> = ({
  guestCount,
  roomCount,
  bathroomCount,
  setCustomValue,
}) => {
  return (
    <div className="flex flex-col gap-8">
      <Heading
        title="Share some basics about your place"
        subtitle="What amenitis do you have?"
      />
      <Counter
        title="Guests"
        subtitle="How many guests do you allow?"
        value={guestCount}
        onChange={(value) => setCustomValue('guestCount', value)}
      />
      <hr />
      <Counter
        onChange={(value) => setCustomValue('roomCount', value)}
        value={roomCount}
        title="Rooms"
        subtitle="How many rooms do you have?"
      />
      <hr />
      <Counter
        onChange={(value) => setCustomValue('bathroomCount', value)}
        value={bathroomCount}
        title="Bathrooms"
        subtitle="How many bathrooms do you have?"
      />
    </div>
  );
};

export default RentFormInfo;
