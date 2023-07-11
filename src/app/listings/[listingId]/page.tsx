import getCurrentUser from '@/actions/getCurrentUser';
import getListingById from '@/actions/getListingById';
import getReservations from '@/actions/getReservations';
import EmptyState from '@/modules/common/EmptyState';
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
