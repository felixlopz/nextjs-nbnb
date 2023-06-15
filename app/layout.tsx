import '../src/styles/globals.css';

import Navbar from '../src/components/navbar/Navbar';
import { Nunito } from 'next/font/google';
import RegisterModal from '@/src/components/modal/RegisterModal';
import LoginModal from '@/src/components/modal/LoginModal';
import { Toaster } from 'react-hot-toast';
import getCurrentUser from '@/src/actions/getCurrentUser';
import RentModal from '@/src/components/modal/RentModal';
import SearchModal from '@/src/components/modal/SearchModal';

const nunito = Nunito({ subsets: ['latin'] });

export const metadata = {
  title: 'Nextbnb',
  description: 'Aribnb clone',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentUser = await getCurrentUser();

  return (
    <html lang="en">
      <body className={nunito.className}>
        <Toaster />
        <SearchModal />
        <RegisterModal />
        <LoginModal />
        <RentModal />
        <Navbar currentUser={currentUser} />
        {children}
      </body>
    </html>
  );
}
