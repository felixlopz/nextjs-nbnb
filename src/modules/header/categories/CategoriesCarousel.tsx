'use client';

import Container from '@/modules/common/Container';
import { usePathname } from 'next/navigation';
import CategorySelector from '@/modules/category/CategorySelector';
import categories from '@/modules/category/categories';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useState } from 'react';
import { cn } from '@/libs/utils';
import useSwipe from '@/hooks/useSwipe';

const CategoriesCarousel = () => {
  const pathname = usePathname();
  const isMainPage = pathname === '/';

  const [reachedBegin, setReachedBegin] = useState(true);
  const [swipeDirection, setSwipeDirection] = useState<'left' | 'right' | null>(
    null
  );

  const { onTouchEnd, onTouchMove, onTouchStart } = useSwipe({
    onSwipedLeft: () => {
      setSwipeDirection('left');
      setReachedBegin(false);
    },
    onSwipedRight: () => {
      setSwipeDirection('right');
    },
  });

  if (isMainPage === false) {
    return null;
  }

  return (
    <Container className="relative">
      <div
        className={cn([
          'absolute left-0 top-0 z-20 h-full w-16  bg-gradient-to-r from-white from-50%',
          reachedBegin === true ? 'opacity-0' : 'opacity-100',
        ])}
      ></div>
      <div className="absolute right-0 top-0 z-20 h-full w-16  bg-gradient-to-l from-white from-50%"></div>
      <div className="flex flex-row items-center  justify-between overflow-hidden ">
        <Swiper
          slidesOffsetAfter={350}
          wrapperClass="gap-x-6 md:gap-x-8"
          slidesPerView="auto"
          onReachBeginning={() => {
            if (swipeDirection === 'right') {
              setReachedBegin(true);
            }
          }}
          onTouchStart={(_, e) => {
            onTouchStart(e as PointerEvent);
          }}
          onTouchMove={(_, e) => {
            onTouchMove(e as PointerEvent);
          }}
          onTouchEnd={(_, e) => {
            onTouchEnd();
          }}
        >
          {categories.map((category) => (
            <SwiperSlide
              key={category.label}
              className="flex w-fit items-center justify-center "
            >
              <CategorySelector icon={category.icon} label={category.label} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </Container>
  );
};

export default CategoriesCarousel;
