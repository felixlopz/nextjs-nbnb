import Logo from '@/modules/header/Logo';
import Searchbar from '@/modules/header/searchbar/Searchbar';
import Container from '@/modules/common/Container';
import Navbar from '@/modules/header/Navbar';
import CategoriesCarousel from '@/modules/header/categories/CategoriesCarousel';

const Header = () => {
  return (
    <header className="relative z-10 w-full bg-white shadow-sm">
      <div className="border-b-[1px] py-4">
        <Container>
          <div className="flex flex-row items-center justify-center gap-3 md:justify-between md:gap-0">
            <Logo />
            <Searchbar />
            {/* @ts-expect-error Server Component */}
            <Navbar />
          </div>
        </Container>
      </div>
      <CategoriesCarousel />
    </header>
  );
};

export default Header;
