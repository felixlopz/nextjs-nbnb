import getCurrentUser from '@/actions/getCurrentUser';
import getListings from '@/actions/getListings';
import Container from '@/modules/common/Container';
import EmptyState from '@/modules/common/EmptyState';
import ListingCard from '@/modules/listing/ListingCard';
import { ListingSearchParams, SafeListing } from '@/types';

interface HomeProps {
  searchParams: ListingSearchParams;
}

export default async function Home({ searchParams }: HomeProps) {
  const listings = await getListings(searchParams);
  const currentUser = await getCurrentUser();

  const isEmpty = listings.length === 0;
  const areSearchParams = Object.keys(searchParams).length > 0;

  if (isEmpty && !areSearchParams) {
    return (
      <EmptyState
        title="No listings added yet"
        subtitle="Try adding one yourself"
      />
    );
  }

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
          py-12
          sm:grid-cols-2 
          md:grid-cols-3
          lg:grid-cols-4
          xl:grid-cols-5
          2xl:grid-cols-6
        "
      >
        {listings.map((listing: SafeListing) => (
          <ListingCard
            key={listing.id}
            data={listing}
            currentUser={currentUser}
            areSearchParams={areSearchParams}
          />
        ))}
      </div>
    </Container>
  );
}
