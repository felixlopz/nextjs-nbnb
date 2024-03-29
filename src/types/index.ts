import { Listing, Reservation, User } from '@prisma/client';

export type SafeListing = Omit<Listing, 'createdAt'> & {
  createdAt: string;
};

export type SafeReservation = Omit<
  Reservation,
  'createdAt' | 'startDate' | 'endDate' | 'listing'
> & {
  createdAt: string;
  startDate: string;
  endDate: string;
  listing: SafeListing;
};

export type SafeUser = Omit<
  User,
  'createdAt' | 'updatedAt' | 'emailVerified'
> & {
  createdAt: string;
  updatedAt: string;
  emailVerified: string | null;
};

export interface ListingSearchParams {
  lat?: string;
  lng?: string;
  radius?: string;
  placeName?: string;
  category?: string;
  userId?: string;
  startDate?: string;
  endDate?: string;
  guestCount?: string;
  roomCount?: string;
  bathroomCount?: string;
  limit?: string;
  page?: string;
}
