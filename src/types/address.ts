export interface Address {
  placeName: string;
  countryCode: string;
  country: string;
  region?: string;
  place?: string;
  district?: string;
  postcode?: string;
  locality?: string;
  neighborhood?: string;
  location: Location;
  mapboxId: string;
}

export interface Location {
  coordinates: number[];
  isExactLocation: boolean;
}
