import getCurrentUser from '@/src/actions/getCurrentUser';
import getListingById from '@/src/actions/getListingById';
import getReservations from '@/src/actions/getReservations';
import EmptyState from '@/src/modules/common/EmptyState';
import Listing from './ListingClient';

interface IParams {
  listingId?: string;
}

const ListingPage = async ({ params }: { params: IParams }) => {
  const listing = await getListingById(params);
  const reservations = await getReservations(params);
  const currentUser = await getCurrentUser();

  if (listing == null) {
    return <EmptyState />;
  }

  return (
    <Listing
      listing={listing}
      reservations={reservations}
      currentUser={currentUser}
    />
  );
};

export default ListingPage;
