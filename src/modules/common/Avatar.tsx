import Image from 'next/image';

interface AvatarProps {
  src?: string | null;
  size?: number;
}

export const Avatar: React.FC<AvatarProps> = ({ src, size = 30 }) => {
  return (
    <Image
      src={src || '/images/placeholder.jpg'}
      className="rounded-full object-cover"
      fill
      alt="Avatar"
    />
  );
};

export default Avatar;
