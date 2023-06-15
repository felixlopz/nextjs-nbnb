import '../styles/globals.css';

import Navbar from '../components/navbar/Navbar';
import { Nunito } from 'next/font/google';
import RegisterModal from '@/components/modal/RegisterModal';
import LoginModal from '@/components/modal/LoginModal';
import { Toaster } from 'react-hot-toast';
import { getCurrentUser } from '@/actions/getCurrentUser';
import RentModal from '@/components/modal/RentModal';
import SearchModal from '@/components/modal/SearchModal';

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
