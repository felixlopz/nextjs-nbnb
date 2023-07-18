export const getListingShortLocationName = (placeName: string) => {
  const location = placeName.split(',');

  if (location.length <= 1) {
    return location;
  }

  const shortLocation = `${location[0]}, ${location[location.length - 1]}`;
  return shortLocation;
};
