import { useSearchParams } from 'next/navigation';
import useCountries from './useCountries';

export const useListingSearchParams = () => {
  const params = useSearchParams();
  const { getByValue } = useCountries();
  let location = undefined;
  let startDate = undefined;
  let endDate = undefined;
  const locationValue = params?.get('locationValue');
  const startDateParam = params?.get('startDate');
  if (startDateParam != null) {
    startDate = new Date(startDateParam);
  }
  const endDateParam = params?.get('endDate');
  if (endDateParam != null) {
    endDate = new Date(endDateParam);
  }
  const guestCount = Number(params?.get('guestCount')) || 1;
  const bathroomCount = Number(params?.get('bathroomCount')) || 1;
  const roomCount = Number(params?.get('roomCount')) || 1;

  if (locationValue != null) {
    location = getByValue(locationValue as string);
  }

  return { startDate, endDate, guestCount, bathroomCount, roomCount, location };
};

// http://localhost:3000/?bathroomCount=2&endDate=2023-07-20T00%3A00%3A00-04%3A00&guestCount=2&locationValue=AO&roomCount=2&startDate=2023-07-11T00%3A00%3A00-04%3A00
