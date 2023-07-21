'use client';

import { Reservation } from '@prisma/client';
import { useRouter } from 'next/navigation';
import { useCallback, useMemo } from 'react';
import { format } from 'date-fns';
import Button from '@/modules/common/Button';
import Image from 'next/image';
import HeartButton from '@/modules/common/HeartButton';
import { SafeListing, SafeUser } from '@/types';
import { getListingShortLocationName } from '@/libs/listing';

interface ListingCardProps {
  data: SafeListing;
  reservation?: Reservation;
  onAction?: (id: string) => void;
  disabled?: boolean;
  actionLabel?: string;
  actionId?: string;
  currentUser?: SafeUser | null;
  areSearchParams?: boolean;
  ref?: boolean;
}

const ListingCard: React.FC<ListingCardProps> = ({
  data,
  reservation,
  onAction,
  disabled,
  actionLabel,
  actionId = '',
  currentUser,
  areSearchParams,
}) => {
  const router = useRouter();

  const handleCancel = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      if (disabled) {
        return;
      }

      if (onAction != null) {
        onAction(actionId);
      }
    },
    [onAction, actionId, disabled]
  );

  const price = useMemo(() => {
    if (reservation) {
      return reservation.totalPrice;
    }

    return data.price;
  }, [reservation, data.price]);

  const reservationDate = useMemo(() => {
    if (reservation == null) {
      return null;
    }

    const start = new Date(reservation.startDate);
    const end = new Date(reservation.endDate);

    return `${format(start, 'PP')} - ${format(end, 'PP')}`;
  }, [reservation]);

  const listingLabel = useMemo(() => {
    return areSearchParams
      ? data.title
      : getListingShortLocationName(data.address.placeName);
  }, [areSearchParams, getListingShortLocationName, data.address.placeName]);

  const listingBebs = useMemo(() => {
    return data.roomCount > 1 ? `${data.roomCount} beds` : `1 bed`;
  }, [data.roomCount]);

  return (
    <div
      onClick={() => router.push(`/listings/${data.id}`)}
      className="group col-span-1 cursor-pointer"
    >
      <div className="flex w-full flex-col gap-1">
        <div
          className="
            relative 
            aspect-square 
            w-full 
            overflow-hidden 
            rounded-xl
          "
        >
          <Image
            // width={480}
            // height={480}
            fill
            className="h-full w-full object-cover"
            // sizes="(max-width: 550px) 480px, 360px" // 75% performance
            sizes="(max-width: 550px) 350px, (max-width: 750px) 230px, (max-width: 750px) 200px, 260px"
            src={data.imageSrc}
            alt={`nextbnb listing: ${data.title.toLowerCase()}`}
          />
          <div
            className="
              absolute
              right-3
              top-3
            "
          >
            <HeartButton listingId={data.id} currentUser={currentUser} />
          </div>
        </div>
        <div className="mt-2 line-clamp-1 text-base font-semibold capitalize leading-none">
          {listingLabel}
        </div>
        <div className="line-clamp-1 text-base font-light leading-none text-neutral-500">
          {data.description}
        </div>
        <div className="text-base font-light leading-none text-neutral-500">
          {reservationDate || `${data.category}, ${listingBebs}`}
        </div>
        <div className="mt-1 flex flex-row items-center gap-1">
          <div className="font-semibold">${price}</div>
          {!reservation && <div className="font-light">night</div>}
        </div>
        {onAction && actionLabel && (
          <Button
            className="mt-4"
            variant="outline"
            disabled={disabled}
            size="sm"
            onClick={handleCancel}
          >
            {actionLabel}
          </Button>
        )}
      </div>
    </div>
  );
};

export default ListingCard;
