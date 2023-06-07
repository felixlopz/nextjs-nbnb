'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

export const Logo = () => {
  const router = useRouter();

  const navigateToHomePage = () => {
    router.push('/');
  };

  return (
    <Image
      src={'/images/logo.png'}
      alt="Nextbnb logo"
      className="hidden cursor-pointer md:block"
      width={100}
      height={100}
      onClick={navigateToHomePage}
    />
  );
};

export default Logo;
