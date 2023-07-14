import { useEffect, useRef, RefObject } from 'react';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';

type GeocoderRef = RefObject<HTMLDivElement>;

type UseGeocoderProps = {
  accessToken: string;
  onResult?: (event: any) => void;
  onResults?: (event: any) => void;
  onClear?: (event: any) => void;
  onLoading?: (event: any) => void;
  onError?: (event: any) => void;
};

type UseGeocoderReturn = {
  geocoderRef: GeocoderRef;
  onUpdateQuery: (query: string) => void;
};

const useGeocoder = ({
  accessToken,
  onResult = () => {},
  onResults = () => {},
  onClear = () => {},
  onLoading = () => {},
  onError = () => {},
}: UseGeocoderProps): UseGeocoderReturn => {
  const geocoderRef = useRef<HTMLDivElement>(null);

  const geocoder = new MapboxGeocoder({
    accessToken,
    types: 'country,region,place,postcode,locality,neighborhood',
  });
  useEffect(() => {
    geocoder.on('result', onResult!);
    geocoder.on('results', onResults!);
    geocoder.on('loding', onLoading!);
    geocoder.on('clear', onClear!);
    geocoder.on('error', onError!);

    if (geocoderRef.current) {
      geocoder.addTo(geocoderRef.current);
    }

    return () => {
      geocoder.onRemove();
    };
  }, [accessToken, onResult]);

  const onUpdateQuery = (query: string) => {
    geocoder.query(query);
  };

  return { geocoderRef, onUpdateQuery };
};

export default useGeocoder;
