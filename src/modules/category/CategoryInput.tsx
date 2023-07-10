'use client';

import { IconType } from 'react-icons';

interface CategoryInputProps {
  label: string;
  icon: IconType;
  onClick: (value: string) => void;
  selected?: boolean;
}

export const CategoryInput: React.FC<CategoryInputProps> = ({
  label,
  icon: Icon,
  onClick,
  selected,
}) => {
  return (
    <button
      onClick={() => onClick(label)}
      className={`
      flex
      w-full
      cursor-pointer
      flex-col
      gap-3 rounded-xl border-2
      p-4
      transition
      hover:border-black
      ${selected ? 'border-black' : 'border-neutral-200'}
    `}
    >
      <Icon size={30} />
      <div className="font-semibold">{label}</div>
    </button>
  );
};

export default CategoryInput;
