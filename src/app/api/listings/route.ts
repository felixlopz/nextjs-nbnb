import { NextRequest, NextResponse } from 'next/server';

import prisma from '@/libs/prismadb';
import getCurrentUser from '@/actions/getCurrentUser';
import { Address } from '@prisma/client';
import {
  buildCapacitiesAggregation,
  buildCategoryAggregation,
  buildExcludeDocumentsWithReservationsAggregation,
  buildLocationAggregation,
  buildReservationAggregation,
  buildUserIdAggregation,
} from '@/actions/getListings';

export async function POST(request: Request) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const body = await request.json();
  const {
    title,
    description,
    imageSrc,
    category,
    roomCount,
    bathroomCount,
    guestCount,
    price,
  } = body;

  const address = body.address as Address;

  const listing = await prisma.listing.create({
    data: {
      title,
      description,
      imageSrc,
      category,
      roomCount,
      bathroomCount,
      guestCount,
      address,
      price: parseInt(price, 10),
      userId: currentUser.id,
    },
  });

  return NextResponse.json(listing);
}

export async function GET(req: NextRequest) {
  const usesReservationAggregation = false;

  const aggregations = [
    buildLocationAggregation({
      lng: -80.132812,
      lat: 25.813489,
      radius: 50000,
    }),
    buildCategoryAggregation(),
    buildUserIdAggregation(),
    buildCapacitiesAggregation({}),
    buildReservationAggregation(),
    buildExcludeDocumentsWithReservationsAggregation(
      usesReservationAggregation
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

  console.log(
    aggregations.forEach((agg) => {
      console.log(JSON.stringify(agg, null, 2));
    })
  );

  const result = await prisma.listing.aggregateRaw({
    // @ts-expect-error
    pipeline: aggregations,
  });

  return NextResponse.json(result);
}
