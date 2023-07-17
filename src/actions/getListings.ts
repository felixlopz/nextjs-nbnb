import prisma from '@/libs/prismadb';
import { SafeListing } from '@/types';
import { Listing } from '@prisma/client';

export interface ListingsParams {
  lat?: string;
  lng?: string;
  radius?: string;
  category?: string;
  userId?: string;
  startDate?: string;
  endDate?: string;
  guestCount?: number;
  roomCount?: number;
  bathroomCount?: number;
}

const LISTING_INDEX_SEARCH_NAME = 'listingsLocationSearch';

export default async function getListings(params: ListingsParams) {
  try {
    const {
      lat,
      lng,
      radius,
      category,
      userId,
      guestCount,
      roomCount,
      bathroomCount,
      startDate,
      endDate,
    } = params;

    const aggregations = [
      buildLocationAggregation({
        lat: Number(lat),
        lng: Number(lng),
        radius: Number(radius),
      }),
      buildCategoryAggregation(category),
      buildUserIdAggregation(userId),
      buildCapacitiesAggregation({
        guestCount: Number(guestCount),
        roomCount: Number(roomCount),
        bathroomCount: Number(bathroomCount),
      }),
      buildReservationAggregation(startDate, endDate),
      buildExcludeDocumentsWithReservationsAggregation(
        startDate != null && endDate != null
      ),
      {
        $sort: {
          createdAt: -1,
        },
      },
      {
        $unset: ['reservations', 'userId'],
      },
    ].filter((agg) => agg != null);

    const result = await prisma.listing.aggregateRaw({
      // @ts-expect-error
      pipeline: aggregations,
    });

    const listings = JSON.parse(JSON.stringify(result)) as Array<
      Omit<Listing, 'createdAt'> & {
        _id: { $oid: string };
        createdAt: { $date: string };
      }
    >;

    const safeListings: SafeListing[] = listings.map((listing) => ({
      ...listing,
      id: listing._id.$oid,
      createdAt: listing.createdAt.$date,
    }));

    return safeListings;
  } catch (error: any) {
    throw new Error(error);
  }
}

export const buildCategoryAggregation = (category?: string) =>
  category != null
    ? {
        $match: {
          category,
        },
      }
    : undefined;

type BuildCapacitiesAggregationProps = {
  guestCount?: number;
  roomCount?: number;
  bathroomCount?: number;
};

export const buildCapacitiesAggregation = ({
  roomCount,
  guestCount,
  bathroomCount,
}: BuildCapacitiesAggregationProps) => {
  if (guestCount != null && roomCount != null) {
    return {
      $match: {
        roomCount: { $gte: roomCount || 1 },
        guestCount: { $gte: guestCount || 1 },
        bathroomCount: { $gte: bathroomCount || 1 },
      },
    };
  }

  return undefined;
};

export const buildUserIdAggregation = (userId?: string) =>
  userId != null
    ? {
        $match: {
          userId: { $oid: userId },
        },
      }
    : undefined;

type BuildLocationAggregationProps = {
  lat?: number;
  lng?: number;
  radius?: number;
};

export const buildLocationAggregation = ({
  lat,
  lng,
  radius = 10000,
}: BuildLocationAggregationProps) => {
  if (lat != null && lng != null && !Number.isNaN(lat) && !Number.isNaN(lng)) {
    return {
      $search: {
        index: LISTING_INDEX_SEARCH_NAME,
        geoWithin: {
          circle: {
            center: {
              type: 'Point',
              coordinates: [lng, lat],
            },
            radius: radius,
          },
          path: 'address.location',
        },
      },
    };
  }
  return undefined;
};

export const buildReservationAggregation = (
  startDate?: string,
  endDate?: string
) => {
  if (startDate != null && endDate != null) {
    return {
      $lookup: {
        from: 'Reservation',
        let: { listingId: '$_id' },
        pipeline: [
          {
            $match: {
              $expr: {
                $and: [
                  { $eq: ['$listingId', '$$listingId'] },
                  {
                    $or: [
                      {
                        $and: [
                          {
                            $lte: [
                              '$startDate',
                              { $dateFromString: { dateString: startDate } },
                            ],
                          },
                          {
                            $gte: [
                              '$endDate',
                              { $dateFromString: { dateString: startDate } },
                            ],
                          },
                        ],
                      },
                      {
                        $and: [
                          {
                            $lte: [
                              '$startDate',
                              { $dateFromString: { dateString: endDate } },
                            ],
                          },
                          {
                            $gte: [
                              '$endDate',
                              { $dateFromString: { dateString: endDate } },
                            ],
                          },
                        ],
                      },
                      {
                        $and: [
                          {
                            $gte: [
                              '$startDate',
                              { $dateFromString: { dateString: startDate } },
                            ],
                          },
                          {
                            $lte: [
                              '$startDate',
                              { $dateFromString: { dateString: endDate } },
                            ],
                          },
                          {
                            $gte: [
                              '$endDate',
                              { $dateFromString: { dateString: startDate } },
                            ],
                          },
                          {
                            $lte: [
                              '$endDate',
                              { $dateFromString: { dateString: endDate } },
                            ],
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
            },
          },
        ],
        as: 'reservations',
      },
    };
  }

  return undefined;
};

export const buildExcludeDocumentsWithReservationsAggregation = (
  reservationAggregationValid?: boolean
) => {
  if (reservationAggregationValid) {
    return {
      $match: { reservations: { $size: 0 } },
    };
  }
  return undefined;
};
