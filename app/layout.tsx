import '../styles/globals.css';

import Navbar from '../components/navbar/Navbar';
import { Inter } from 'next/font/google';
import RegisterModel from '@/components/modal/RegisterModel';
import { Toaster } from 'react-hot-toast';

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
        <Toaster />
        <RegisterModel />
        <Navbar />
        {children}
      </body>
    </html>
  );
}
