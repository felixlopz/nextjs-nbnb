'use client';

interface MenuButtonProps {
  label: string;
  onClick: () => void;
}

export const MenuButton: React.FC<MenuButtonProps> = ({ onClick, label }) => {
  return (
    <button
      style={{ textAlign: 'left' }}
      onClick={onClick}
      className="
      cursor-pointer
      list-none 
      px-4
      py-3
      text-left
      font-semibold
      transition
    hover:bg-neutral-100
      focus:bg-neutral-100
      focus:outline-none
    "
    >
      {label}
    </button>
  );
};

export default MenuButton;
