import Image from 'next/image';
import Link from 'next/link';

export const Logo = () => {
  return (
    <Link
      href="/"
      className="hidden cursor-pointer rounded-full px-4 py-2 md:block"
    >
      <Image
        src={'/images/logo.png'}
        alt="Nextbnb logo"
        width={125}
        height={100}
      />
    </Link>
  );
};

export default Logo;
