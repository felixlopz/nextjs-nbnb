import Image from 'next/image';
import Link from 'next/link';

export const Logo = () => {
  return (
    <Link href="/" className="rounded-full px-4 py-2">
      <Image
        src={'/images/logo.png'}
        alt="Nextbnb logo"
        className="hidden cursor-pointer md:block"
        width={150}
        height={100}
      />
    </Link>
  );
};

export default Logo;
