import '@uploadthing/react/styles.css';
import 'swiper/css';
import 'mapbox-gl/dist/mapbox-gl.css';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import '../styles/globals.css';

import { Nunito } from 'next/font/google';
import { Toaster } from 'react-hot-toast';
import Header from '@/modules/header/Header';
// import ModalManager from '@/modules/modal/ModalManager';
import Providers from '@/modules/common/Providers';

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
        <Providers>
          <Toaster />
          {/* <ModalManager /> */}
          <Header />
          {children}
        </Providers>
      </body>
    </html>
  );
}
