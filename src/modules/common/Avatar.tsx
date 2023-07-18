import Image from 'next/image';

interface AvatarProps {
  src?: string | null;
  size?: number;
}

export const Avatar: React.FC<AvatarProps> = ({ src, size = 30 }) => {
  return (
    <Image
      fill
      src={src || '/images/placeholder.jpg'}
      className="rounded-full object-cover"
      alt="Avatar"
    />
  );
};

export default Avatar;
