'use client';

import { ListingSearchParams, SafeListing, SafeUser } from '@/types';
import { FC, useEffect, useRef } from 'react';
import { useIntersection } from '@mantine/hooks';
import ListingCard from './ListingCard';
import { useInfiniteQuery } from '@tanstack/react-query';
import axios from 'axios';
import { DEFAULT_LISTING_LIMIT } from './constans';
import { objectToQueryString } from '@/libs/utils';

interface ListingListProps {
  searchParams: ListingSearchParams;
  initialListings: SafeListing[];
  areSearchParams: boolean;
  currentUser?: SafeUser | null;
}

export const ListingList: FC<ListingListProps> = ({
  initialListings,
  searchParams,
  areSearchParams,
  currentUser,
}) => {
  const lastListingRef = useRef<HTMLElement>(null);
  const { ref, entry } = useIntersection({
    root: lastListingRef.current,
    threshold: 1,
  });

  const { data, fetchNextPage, isFetchingNextPage, refetch } = useInfiniteQuery(
    {
      queryKey: ['listings'],
      queryFn: async ({ pageParam = 1 }) => {
        // at no params returns '?'
        const searchParamsQuery = objectToQueryString(searchParams);
        const query =
          `/api/listings/${searchParamsQuery}` +
          `&limit=${DEFAULT_LISTING_LIMIT}&page=${pageParam}`;
        const { data } = await axios.get(query);

        return data as SafeListing[];
      },
      getNextPageParam: (_, pages) => {
        return pages.length + 1;
      },
      initialData: { pages: [initialListings], pageParams: [0] },
      enabled: false,
    }
  );

  useEffect(() => {
    if (entry?.isIntersecting) {
      fetchNextPage();
    }
  }, [entry, fetchNextPage]);

  useEffect(() => {
    refetch();
  }, [searchParams, refetch]);

  const listings = data?.pages.flatMap((page) => page) ?? initialListings;

  return (
    <>
      {listings.map((listing: SafeListing, index) => {
        if (index === listings.length - 1) {
          return (
            <div key={listing.id} ref={ref}>
              <ListingCard
                key={listing.id}
                data={listing}
                currentUser={currentUser}
                areSearchParams={areSearchParams}
              />
            </div>
          );
        } else
          return (
            <ListingCard
              key={listing.id}
              data={listing}
              currentUser={currentUser}
              areSearchParams={areSearchParams}
            />
          );
      })}
    </>
  );
};

export default ListingList;
