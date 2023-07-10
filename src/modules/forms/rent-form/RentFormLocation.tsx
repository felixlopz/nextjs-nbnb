'use client';

import { FC, useMemo } from 'react';
import Heading from '@/src/modules/common/Heading';
import CountrySelect, {
  Location,
} from '@/src/modules/common/inputs/CountrySelect';
import dynamic from 'next/dynamic';

interface RentFormLocationProps {
  location: Location | null;
  setCustomValue: (id: string, value: any) => void;
}

export const RentFormLocation: FC<RentFormLocationProps> = ({
  location,
  setCustomValue,
}) => {
  const Map = useMemo(
    () => dynamic(() => import('@/src/modules/common/Map'), { ssr: false }),
    [location]
  );
  return (
    <div className="flex flex-col gap-8">
      <Heading
        title="Where is your place located?"
        subtitle="Help guests find you!"
      />
      <CountrySelect
        value={location}
        onChange={(value) => setCustomValue('location', value)}
      />
      <Map center={location?.latlng} />
    </div>
  );
};

export default RentFormLocation;
