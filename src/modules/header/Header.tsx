import Logo from '@/src/modules/header/Logo';
import Searchbar from '@/src/modules/header/searchbar/Searchbar';
import Container from '@/src/modules/common/Container';
import Navbar from '@/src/modules/header/Navbar';
import Categories from '@/src/modules/header/categories/Categories';

const Header = () => {
  return (
    <header className="relative z-10 w-full bg-white shadow-sm">
      <div className="border-b-[1px] py-4">
        <Container>
          <div className="flex flex-row items-center justify-between gap-3 md:gap-0">
            <Logo />
            <Searchbar />
            {/* @ts-expect-error Server Component */}
            <Navbar />
          </div>
        </Container>
      </div>
      <Categories />
    </header>
  );
};

export default Header;
