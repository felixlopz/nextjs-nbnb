import { NextRequest, NextResponse } from 'next/server';

import prisma from '@/libs/prismadb';
import getCurrentUser from '@/actions/getCurrentUser';
import { Address } from '@prisma/client';
import getListings from '@/actions/getListings';
import { ListingSearchParams } from '@/types';

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
  const { searchParams } = req.nextUrl;

  const listingSearchParams = {
    lat: searchParams.get('lat') || undefined,
    lng: searchParams.get('lng') || undefined,
    radius: searchParams.get('radius') || undefined,
    userId: searchParams.get('userId'),
    category: searchParams.get('category'),
    guestCount: searchParams.get('guestCount') || undefined,
    roomCount: searchParams.get('roomCount') || undefined,
    bathroomCount: searchParams.get('bathroomCount') || undefined,
    startDate: searchParams.get('startDate'),
    endDate: searchParams.get('endDate'),
    limit: searchParams.get('limit'),
    page: searchParams.get('page'),
  } as ListingSearchParams;

  const listings = await getListings(listingSearchParams);

  return NextResponse.json(listings);
}
