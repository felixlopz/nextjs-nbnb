'use client';

import { FC } from 'react';
import Heading from '@/src/modules/common/Heading';
import Counter from '@/src/modules/common/inputs/Counter';

interface ListingCapacitiesProps {
  title: string;
  subtitle?: string;
  guestTitle: string;
  roomTitle: string;
  bathroomTitle: string;
  guestCount: number;
  roomCount: number;
  bathroomCount: number;
  setCustomValue: (id: string, value: any) => void;
}

export const ListingCapacities: FC<ListingCapacitiesProps> = ({
  title,
  subtitle,
  guestTitle,
  roomTitle,
  bathroomTitle,
  guestCount,
  roomCount,
  bathroomCount,
  setCustomValue,
}) => {
  return (
    <div className="flex flex-col gap-8">
      <Heading title={title} subtitle={subtitle} />
      <Counter
        title="Guests"
        subtitle={guestTitle}
        value={guestCount}
        onChange={(value) => setCustomValue('guestCount', value)}
      />
      <hr />
      <Counter
        onChange={(value) => setCustomValue('roomCount', value)}
        value={roomCount}
        title="Rooms"
        subtitle={roomTitle}
      />
      <hr />
      <Counter
        onChange={(value) => setCustomValue('bathroomCount', value)}
        value={bathroomCount}
        title="Bathrooms"
        subtitle={bathroomTitle}
      />
    </div>
  );
};

export default ListingCapacities;
