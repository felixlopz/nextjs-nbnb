import { GeocoderFeature } from '@/types/geocoder';
import { FC } from 'react';
import Button from '../../Button';
import { FiMapPin } from 'react-icons/fi';
import { Address } from '@prisma/client';
import { cn } from '@/libs/utils';

interface AdressInputResultsProps {
  results: GeocoderFeature[];
  selectedPlace: Address | null;
  onSelectPlace: (place: GeocoderFeature) => void;
}

export const AdressInputResults: FC<AdressInputResultsProps> = ({
  results,
  selectedPlace,
  onSelectPlace,
}) => {
  if (results.length <= 0) {
    return null;
  }

  return (
    <ul className="relative z-50 mt-2 flex flex-col overflow-hidden rounded-lg bg-white shadow-md">
      {results.map((place) => {
        const selected = place.id === selectedPlace?.mapboxId;

        return (
          <Button
            onClick={() => {
              onSelectPlace(place);
            }}
            key={place.id}
            variant={'ghost'}
            className={cn([
              'h-fit w-full justify-start rounded-none px-4 py-3 text-left text-base font-light',
              selected
                ? 'hover:bg-violet-black focus:bg-violet-black bg-black text-white'
                : '',
            ])}
          >
            <span
              className={cn([
                'mr-4 flex rounded-md bg-neutral-200 p-2',
                selected ? 'bg-white text-black' : '',
              ])}
            >
              <FiMapPin size={18} />
            </span>
            {place.place_name}
          </Button>
        );
      })}
    </ul>
  );
};

export default AdressInputResults;
