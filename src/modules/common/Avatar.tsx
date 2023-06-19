import Image from 'next/image';

interface AvatarProps {
  src?: string | null;
  size?: number;
}

export const Avatar: React.FC<AvatarProps> = ({ src, size = 30 }) => {
  return (
    <Image
      className="rounded-full"
      height={size}
      width={size}
      alt="Avatar"
      src={src || '/images/placeholder.jpg'}
    />
  );
};

export default Avatar;
