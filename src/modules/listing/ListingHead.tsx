'use client';

import Image from 'next/image';

import Heading from '@/modules/common/Heading';
import HeartButton from '@/modules/common/HeartButton';
import { SafeUser } from '@/types';
import { Address } from '@prisma/client';

interface ListingHeadProps {
  title: string;
  address: Address;
  imageSrc: string;
  id: string;
  currentUser?: SafeUser | null;
}

const ListingHead: React.FC<ListingHeadProps> = ({
  title,
  address,
  imageSrc,
  id,
  currentUser,
}) => {
  return (
    <>
      <Heading title={title} subtitle={address.placeName} />
      <div
        className="
          relative
          h-[60vh]
          w-full 
          overflow-hidden
          rounded-xl
        "
      >
        <Image
          priority
          fill
          src={imageSrc}
          className="w-full object-cover"
          alt="Image"
        />
        <div
          className="
            absolute
            right-5
            top-5
          "
        >
          <HeartButton listingId={id} currentUser={currentUser} />
        </div>
      </div>
    </>
  );
};

export default ListingHead;
