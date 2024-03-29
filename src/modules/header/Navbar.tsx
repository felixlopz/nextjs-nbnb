import Menu from '@/modules/header/menu/Menu';
import getCurrentUser from '@/actions/getCurrentUser';
import NavbarButton from '@/modules/header/NavbarButton';

export default async function Navbar({}) {
  const currentUser = await getCurrentUser();

  return (
    <nav className="hidden items-center justify-between gap-3 md:flex">
      <NavbarButton currentUser={currentUser} />
      <Menu currentUser={currentUser} />
    </nav>
  );
}
