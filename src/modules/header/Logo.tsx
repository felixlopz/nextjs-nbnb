import Image from 'next/image';
import Link from 'next/link';

export const Logo = () => {
  return (
    <Link href="/">
      <Image
        src={'/images/logo.png'}
        alt="Nextbnb logo"
        className="hidden cursor-pointer md:block"
        width={100}
        height={100}
      />
    </Link>
  );
};

export default Logo;
