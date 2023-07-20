'use client';

import { IconType } from 'react-icons';
import ListingCategory from '@/modules/listing/ListingCategory';
import { SafeUser } from '@/types';
import Avatar from '@/modules/common/Avatar';
import Map, { Marker } from 'react-map-gl';

interface ListingInfoProps {
  user: SafeUser;
  description: string;
  guestCount: number;
  roomCount: number;
  bathroomCount: number;
  category:
    | {
        icon: IconType;
        label: string;
        description: string;
      }
    | undefined;
  lat: number;
  lng: number;
  isExactLocation: boolean;
}

const ListingInfo: React.FC<ListingInfoProps> = ({
  user,
  description,
  guestCount,
  roomCount,
  bathroomCount,
  category,
  lng,
  lat,
  isExactLocation,
}) => {
  return (
    <>
      <div className="flex flex-col gap-2">
        <div
          className="
            flex 
            flex-row 
            items-center 
            gap-2 
            text-xl
            font-semibold
          "
        >
          <div>Hosted by {user?.name}</div>
          <div className="relative h-[40px] w-[40px]">
            <Avatar src={user?.image} />
          </div>
        </div>
        <div
          className="
            flex 
            flex-row 
            items-center 
            gap-4 
            font-light
            text-neutral-500
          "
        >
          <div>{guestCount} guests</div>
          <div>{roomCount} rooms</div>
          <div>{bathroomCount} bathrooms</div>
        </div>
      </div>
      <hr />
      {category && (
        <ListingCategory
          icon={category.icon}
          label={category?.label}
          description={category?.description}
        />
      )}
      <hr />
      <div
        className="
      text-lg font-light text-neutral-500"
      >
        {description}
      </div>
      <hr />
      <div className="h-[20rem]">
        <Map
          dragPan={false}
          maxZoom={14}
          minZoom={4}
          initialViewState={{
            longitude: lng,
            latitude: lat,
            zoom: 14,
          }}
          mapStyle="mapbox://styles/mapbox/streets-v12"
          mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
        >
          <Marker latitude={lat} longitude={lng} draggable={false}>
            <div className="animation-pulse flex h-12 w-12 items-center justify-center rounded-full ">
              <div className="h-1/2 w-1/2 rounded-full bg-primary outline outline-2 outline-white"></div>
            </div>
          </Marker>
        </Map>
      </div>
    </>
  );
};

export default ListingInfo;
