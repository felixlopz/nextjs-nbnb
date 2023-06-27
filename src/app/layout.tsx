import '../styles/globals.css';

import { Nunito } from 'next/font/google';
import { Toaster } from 'react-hot-toast';
import Header from '@/src/modules/header/Header';
import ModalManager from '@/src/modules/modal/ModalManager';

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
