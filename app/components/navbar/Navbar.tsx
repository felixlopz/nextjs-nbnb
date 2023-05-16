import Container from '../Container';
import Logo from './Logo';
import SearchBar from './SearchBar';

export const Navbar = () => {
  return (
    <div className="fixed z-10 w-full bg-white shadow-sm">
      <div className="border-b-[1px] py-4">
        <Container>
          <div className="flex flex-row items-center justify-between gap-3 md:gap-0">
            <Logo />
            <SearchBar />
          </div>
        </Container>
      </div>
    </div>
  );
};

export default Navbar;
