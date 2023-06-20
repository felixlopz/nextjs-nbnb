import '../src/styles/globals.css';

import { Nunito } from 'next/font/google';
import RegisterModal from '@/src/modules/modal/register/RegisterModal';
import LoginModal from '@/src/modules/modal/login/LoginModal';
import { Toaster } from 'react-hot-toast';
import RentModal from '@/src/modules/modal/rent/RentModal';
import SearchModal from '@/src/modules/modal/search/SearchModal';
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
