import '../src/styles/globals.css';

import { Nunito } from 'next/font/google';
import RegisterModal from '@/src/components/modal/RegisterModal';
import LoginModal from '@/src/components/modal/LoginModal';
import { Toaster } from 'react-hot-toast';
import RentModal from '@/src/components/modal/RentModal';
import SearchModal from '@/src/components/modal/SearchModal';
import Header from '@/src/modules/header/Header';

const nunito = Nunito({ subsets: ['latin'] });

export const metadata = {
  title: 'Nextbnb',
  description: 'Really cool next project',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={nunito.className}>
        <Toaster />
        <SearchModal />
        <RegisterModal />
        <LoginModal />
        <RentModal />
        <Header />
        {children}
      </body>
    </html>
  );
}
