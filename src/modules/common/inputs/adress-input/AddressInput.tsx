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
  const [results, setResults] = useState<GeocoderFeature[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const shouldUpdateGeocoderQuery = () => {
    return inputValue !== '' && selectedPlace == null;
  };

  const handleResults = (queryResults: any) => {
    setIsLoading(false);
    const results: GeocoderFeature[] | undefined = queryResults.features;
    if (results != null && results.length > 0) {
      setResults(results);
    }
  };

  const handlePlaceUpdate = (address: Address | null) => {
    setSelectedPlace(address);
    onPlaceChange(address);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    handlePlaceUpdate(null);
    if (e.target.value === '') {
      setResults([]);
      setIsLoading(false);
    } else {
      setIsLoading(true);
    }
  };

  const handleSelectedPlace = (feature: GeocoderFeature) => {
    const address = getAddressFromGeocoderFeature(feature);
    handlePlaceUpdate(address);
    setInputValue(address.placeName);
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
        <Loader2 className="absolute right-4 top-[1rem] h-6 w-6 animate-spin text-primary" />
      )}
      <div ref={geocoderRef} />
      <Input
        value={inputValue}
        placeholder={placeholder}
        autoComplete="off"
        id="geocoder-input"
        label="geocoder-label"
        name="geocoder-name"
        onChange={handleInputChange}
      />
      <AdressInputResults
        results={results}
        selectedPlace={selectedPlace}
        onSelectPlace={handleSelectedPlace}
      />
    </div>
  );
};

export default AddressInput;
