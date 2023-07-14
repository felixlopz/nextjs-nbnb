'use client';

import useGeocoder from '@/hooks/useGeocoder';
import { ChangeEvent, FC, useEffect, useState } from 'react';
import Input from '../Input';
import { GeocoderFeature } from '@/types/geocoder';
import AdressInputResults from './AdressInputResults';
import { useDebounce } from 'use-debounce';
import { getAddressFromGeocoderFeature } from '@/utils';
import { Address } from '@/types/address';

interface AddressInputProps {
  placeName?: string;
  placeholder?: string;
  onPlaceChange: (address: Address) => void;
}

export const AddressInput: FC<AddressInputProps> = ({
  placeName = '',
  placeholder = 'Search an address',
  onPlaceChange,
}) => {
  const [selectedPlace, setSelectedPlace] = useState<Address | null>(null);
  const [inputValue, setInputValue] = useState('');
  const [query] = useDebounce(inputValue, 1000);
  const [places, setPlaces] = useState<GeocoderFeature[]>([]);

  const shouldUpdateGeocoderQuery = () => {
    return inputValue != '' && selectedPlace == null;
  };

  const handleResults = (results: any) => {
    const places: GeocoderFeature[] | undefined = results.features;
    if (places != null && places.length > 0) {
      setPlaces(places);
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    setPlaces([]);
  };

  const handleSelectedPlace = (feature: GeocoderFeature) => {
    const address = getAddressFromGeocoderFeature(feature);
    setSelectedPlace(address);
    setPlaces([]);
    setInputValue(address.placeName);
    onPlaceChange(address);
  };

  const { geocoderRef, onUpdateQuery } = useGeocoder({
    accessToken: process.env.MAPBOX_TOKEN as string,
    onResults: handleResults,
  });

  useEffect(() => {
    if (shouldUpdateGeocoderQuery()) {
      onUpdateQuery(inputValue);
    }
  }, [query]);

  return (
    <div className="flex flex-col">
      <div ref={geocoderRef} />
      <Input
        value={inputValue}
        placeholder="Search a destination"
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
