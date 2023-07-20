'use client';

import useGeocoder from '@/hooks/useGeocoder';
import { ChangeEvent, FC, useEffect, useState } from 'react';
import Input from '../Input';
import { GeocoderFeature } from '@/types/geocoder';
import AdressInputResults from './AdressInputResults';
import { useDebounce } from 'use-debounce';
import { getAddressFromGeocoderFeature } from '@/libs/geocoder';
import { Address } from '@prisma/client';
import { Loader2 } from 'lucide-react';

interface AddressInputProps {
  placeName?: string;
  placeholder?: string;
  onPlaceChange: (address: Address | null) => void;
}

export const AddressInput: FC<AddressInputProps> = ({
  placeName = '',
  placeholder = 'Search an address',
  onPlaceChange,
}) => {
  const [selectedPlace, setSelectedPlace] = useState<Address | null>(null);
  const [inputValue, setInputValue] = useState(placeName);
  const [query] = useDebounce(inputValue, 1000);
  const [places, setPlaces] = useState<GeocoderFeature[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const shouldUpdateGeocoderQuery = () => {
    return inputValue != '' && selectedPlace == null;
  };

  const handleResults = (results: any) => {
    setIsLoading(false);
    const places: GeocoderFeature[] | undefined = results.features;
    if (places != null && places.length > 0) {
      setPlaces(places);
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === '') {
      setSelectedPlace(null);
      onPlaceChange(null);
      setIsLoading(false);
    }

    setInputValue(e.target.value);
    setPlaces([]);
    setIsLoading(true);
  };

  const handleSelectedPlace = (feature: GeocoderFeature) => {
    const address = getAddressFromGeocoderFeature(feature);
    setSelectedPlace(address);
    setPlaces([]);
    setInputValue(address.placeName);
    onPlaceChange(address);
  };

  const { geocoderRef, onUpdateQuery } = useGeocoder({
    accessToken: process.env.NEXT_PUBLIC_MAPBOX_TOKEN as string,
    onResults: handleResults,
  });

  useEffect(() => {
    if (shouldUpdateGeocoderQuery()) {
      onUpdateQuery(inputValue);
    }
  }, [query]);

  return (
    <div className="relative flex flex-col">
      {isLoading && (
        <Loader2 className="absolute right-4 top-[1rem] h-6 w-6 animate-spin bg-gray-100 text-primary" />
      )}
      <div ref={geocoderRef} />
      <Input
        value={inputValue}
        placeholder={placeholder}
        autoComplete="off"
        id="id"
        label="my label"
        name="something"
        onChange={handleInputChange}
      />
      <AdressInputResults places={places} onSelectPlace={handleSelectedPlace} />
    </div>
  );
};

export default AddressInput;
