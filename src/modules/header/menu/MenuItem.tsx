interface MenuItemProps {
  children: React.ReactNode;
}

const MenuItem: React.FC<MenuItemProps> = ({ children }) => {
  return (
    <li
      className="
        cursor-pointer 
        list-none 
        px-4
        py-3
        font-semibold
        transition
        hover:bg-neutral-100
      "
    >
      {children}
    </li>
  );
};

export default MenuItem;
