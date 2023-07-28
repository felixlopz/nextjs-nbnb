'use client';

import axios from 'axios';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { differenceInDays, eachDayOfInterval } from 'date-fns';

import useLoginModal from '@/modules/modal/login/useLoginModal';
import { SafeListing, SafeReservation, SafeUser } from '@/types';

import Container from '@/modules/common/Container';
import { categories } from '@/modules/category/categories';
import ListingHead from '@/modules/listing/ListingHead';
import ListingInfo from '@/modules/listing/ListingInfo';
import ListingReservation from '@/modules/listing/ListingReservation';
import { DateRange } from 'react-day-picker';

const initialDateRange: DateRange = {
  from: undefined,
  to: undefined,
};

interface ListingClientProps {
  reservations?: SafeReservation[];
  listing: SafeListing & {
    user: SafeUser;
  };
  currentUser?: SafeUser | null;
}

const ListingClient: React.FC<ListingClientProps> = ({
  listing,
  reservations = [],
  currentUser,
}) => {
  const loginModal = useLoginModal();
  const router = useRouter();

  const disabledDates = useMemo(() => {
    let dates: Date[] = [];

    reservations.forEach((reservation: any) => {
      const range = eachDayOfInterval({
        start: new Date(reservation.startDate),
        end: new Date(reservation.endDate),
      });

      dates = [...dates, ...range];
    });

    return dates;
  }, [reservations]);

  const category = useMemo(() => {
    return categories.find((items) => items.label === listing.category);
  }, [listing.category]);

  const [isLoading, setIsLoading] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const [dateRange, setDateRange] = useState<DateRange | undefined>(
    initialDateRange
  );

  const onCreateReservation = useCallback(() => {
    if (!currentUser) {
      return loginModal.onOpen();
    }
    setIsLoading(true);

    axios
      .post('/api/reservations', {
        totalPrice,
        startDate: dateRange?.from,
        endDate: dateRange?.to,
        listingId: listing?.id,
      })
      .then(() => {
        toast.success('Listing reserved!');
        setDateRange(initialDateRange);
        router.push('/trips');
      })
      .catch((error) => {
        toast.error('Something went wrong.');
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [totalPrice, dateRange, listing?.id, router, currentUser, loginModal]);

  useEffect(() => {
    if (dateRange?.from && dateRange.to) {
      const dayCount = differenceInDays(dateRange.to, dateRange.from);

      if (dayCount && listing.price) {
        setTotalPrice(dayCount * listing.price);
      } else {
        setTotalPrice(listing.price);
      }
    }

    if (dateRange?.from == null || dateRange.to == null) {
      setTotalPrice(0);
    }
  }, [dateRange, listing.price]);

  const [lng, lat] = listing.address.location.coordinates;

  return (
    <Container className="py-12">
      <div
        className="
          mx-auto 
          max-w-screen-lg
        "
      >
        <div className="flex flex-col gap-6">
          <ListingHead
            title={listing.title}
            imageSrc={listing.imageSrc}
            id={listing.id}
            currentUser={currentUser}
            address={listing.address}
          />
          <div
            className="
              mt-6 
              grid 
              grid-cols-1 
              md:grid-cols-8 
              md:gap-10
            "
          >
            <div className="col-span-4 mt-6 flex flex-col gap-8 md:mt-0 lg:col-span-5">
              <ListingInfo
                user={listing.user}
                category={category}
                description={listing.description}
                roomCount={listing.roomCount}
                guestCount={listing.guestCount}
                bathroomCount={listing.bathroomCount}
                lat={lat}
                lng={lng}
                isExactLocation={
                  listing.address.location.isExactLocation ?? false
                }
              />
            </div>
            <div
              className="
                order-first 
                md:order-last 
                md:col-span-4
                lg:col-span-3
              "
            >
              <ListingReservation
                price={listing.price}
                totalPrice={totalPrice}
                onChangeDate={(value) => setDateRange(value)}
                dateRange={dateRange}
                onSubmit={onCreateReservation}
                disabled={isLoading}
                disabledDates={disabledDates}
              />
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default ListingClient;
