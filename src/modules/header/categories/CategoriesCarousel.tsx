'use client';

import Container from '@/modules/common/Container';
import { usePathname } from 'next/navigation';
import CategorySelector from '@/modules/category/CategorySelector';
import categories from '@/modules/category/categories';
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';

const CategoriesCarousel = () => {
  const pathname = usePathname();
  const isMainPage = pathname === '/';

  if (isMainPage === false) {
    return null;
  }

  return (
    <Container>
      <div className="flex flex-row items-center justify-between overflow-hidden pt-4">
        <Swiper
          style={{
            position: 'relative',
          }}
          spaceBetween={20}
          slidesPerView={5}
          breakpoints={{
            640: {
              slidesPerView: 6,
            },
            768: { slidesPerView: 9 },
            1024: { slidesPerView: 16 },
            1280: { slidesPerView: 16 },
          }}
        >
          {categories.map((category) => (
            <SwiperSlide key={category.label}>
              <CategorySelector icon={category.icon} label={category.label} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </Container>
  );
};

export default CategoriesCarousel;
