'use client';

import { FC, useMemo } from 'react';
import Heading from '@/modules/common/Heading';
import CountrySelect, { Location } from '@/modules/common/inputs/CountrySelect';
import dynamic from 'next/dynamic';

interface ListingLocationProps {
  title: string;
  subtitle?: string;
  location: Location | null;
  setCustomValue: (id: string, value: any) => void;
}

export const ListingLocation: FC<ListingLocationProps> = ({
  title,
  subtitle,
  location,
  setCustomValue,
}) => {
  const Map = useMemo(
    () => dynamic(() => import('@/modules/common/Map'), { ssr: false }),
    [location]
  );
  return (
    <div className="flex flex-col gap-8">
      <Heading title={title} subtitle={subtitle} />
      <CountrySelect
        value={location}
        onChange={(value) => setCustomValue('location', value)}
      />
      <Map center={location?.latlng} />
    </div>
  );
};

export default ListingLocation;
