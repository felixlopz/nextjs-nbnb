import Container from '../Container';
import Logo from './Logo';
import SearchBar from './SearchBar';
import Menu from './Menu';
import { User } from '@prisma/client';

interface NavbarProps {
  currentUser?: User | null;
}

export const Navbar: React.FC<NavbarProps> = ({ currentUser }) => {
  return (
    <div className="fixed z-10 w-full bg-white shadow-sm">
      <div className="border-b-[1px] py-4">
        <Container>
          <div className="flex flex-row items-center justify-between gap-3 md:gap-0">
            <Logo />
            <SearchBar />
            <Menu currentUser={currentUser} />
          </div>
        </Container>
      </div>
    </div>
  );
};

export default Navbar;
