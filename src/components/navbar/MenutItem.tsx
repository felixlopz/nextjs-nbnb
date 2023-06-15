'use client';

interface MenuItemProps {
  label: string;
  onClick: () => void;
}

export const MenutItem: React.FC<MenuItemProps> = ({ onClick, label }) => {
  return (
    <div
      onClick={onClick}
      className="
        cursor-pointer 
        px-4 
        py-3 
        font-semibold
        transition
        hover:bg-neutral-100
        "
    >
      {label}
    </div>
  );
};

export default MenutItem;
