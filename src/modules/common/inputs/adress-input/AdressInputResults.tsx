import { GeocoderFeature } from '@/types/geocoder';
import { FC } from 'react';
import Button from '../../Button';
import { FiMapPin } from 'react-icons/fi';

interface AdressInputResultsProps {
  places: GeocoderFeature[];
  onSelectPlace: (place: GeocoderFeature) => void;
}

export const AdressInputResults: FC<AdressInputResultsProps> = ({
  places,
  onSelectPlace,
}) => {
  if (places.length <= 0) {
    return null;
  }

  return (
    <ul className="relative z-50 mt-2 flex flex-col rounded-lg bg-white py-2 shadow-md">
      {places.map((place) => (
        <Button
          onClick={() => {
            onSelectPlace(place);
          }}
          key={place.id}
          variant={'ghost'}
          className="h-fit w-full justify-start rounded-none px-4 py-3 text-left text-base font-light 
          "
        >
          <span className="mr-4 flex rounded-md bg-neutral-200 p-2">
            <FiMapPin size={18} />
          </span>
          {place.place_name}
        </Button>
      ))}
    </ul>
  );
};

export default AdressInputResults;
