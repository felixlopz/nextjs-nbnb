import 'swiper/css';
import 'swiper/css/navigation';
import '@uploadthing/react/styles.css';
import '../styles/globals.css';

import { Nunito } from 'next/font/google';
import { Toaster } from 'react-hot-toast';
import Header from '@/modules/header/Header';
import ModalManager from '@/modules/modal/ModalManager';

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
        <ModalManager />
        <Header />
        {children}
      </body>
    </html>
  );
}
