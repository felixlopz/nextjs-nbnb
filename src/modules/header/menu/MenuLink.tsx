import Link from 'next/link';

interface MenuLinkProps {
  href: string;
  label: string;
}

const MenuLink: React.FC<MenuLinkProps> = ({ href, label }) => {
  return (
    <Link
      href={href}
      className="
        block
        w-full
        cursor-pointer 
        list-none 
        px-4
        py-3
        font-semibold
        transition
        hover:bg-neutral-100
        focus:bg-neutral-100
        focus:outline-none"
    >
      {label}
    </Link>
  );
};

export default MenuLink;
