import getCurrentUser from '@/src/actions/getCurrentUser';
import getListings, { IListingsParams } from '@/src/actions/getListings';
import Container from '@/src/components/Container';
import EmptyState from '@/src/components/EmptyState';
import ListingCard from '@/src/components/listing/ListingCard';
import { SafeListing } from '@/src/types';

interface HomeProps {
  searchParams: IListingsParams;
}

export default async function Home({ searchParams }: HomeProps) {
  const listings = await getListings(searchParams);
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
        {listings.map((listing: SafeListing) => (
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
