import { getCurrentUser } from '@/actions/getCurrentUser';
import getListings from '@/actions/getListings';
import Container from '@/components/Container';
import EmptyState from '@/components/EmptyState';
import ListingCard from '@/components/listings/ListingCard';
import { Listing } from '@prisma/client';

export default async function Home() {
  const listings = await getListings();
  const currentUser = await getCurrentUser();

  const isEmpty = listings.length === 0;

  if (isEmpty) {
    return <EmptyState showReset />;
  }

  return (
    <Container>
      <div
        className="
          grid
          grid-cols-1 
          gap-8 
          pt-24 
          sm:grid-cols-2 
          md:grid-cols-3
          lg:grid-cols-4
          xl:grid-cols-5
          2xl:grid-cols-6
        "
      >
        {listings.map((listing: Listing) => (
          <ListingCard
            key={listing.id}
            data={listing}
            currentUser={currentUser}
          />
        ))}
      </div>
    </Container>
  );
}
