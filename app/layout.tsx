import '../styles/globals.css';

import Modal from '../components/modal/Modal';
import Navbar from '../components/navbar/Navbar';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'NBNB',
  description: 'Aribnb clone',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Modal isOpen />
        <Navbar />
        {children}
      </body>
    </html>
  );
}
