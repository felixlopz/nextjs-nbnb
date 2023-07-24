import { useState } from 'react';

interface SwipeInput {
  onSwipedLeft: () => void;
  onSwipedRight: () => void;
}

interface SwipeOutput {
  onTouchStart: (e: PointerEvent) => void;
  onTouchMove: (e: PointerEvent) => void;
  onTouchEnd: () => void;
}

// https://stackoverflow.com/questions/70612769/how-do-i-recognize-swipe-events-in-react

const useSwipe = (input: SwipeInput): SwipeOutput => {
  let touchStart = 0;
  let touchEnd = 0;

  const minSwipeDistance = 10;

  const onTouchStart = (e: PointerEvent) => {
    touchEnd = 0; // otherwise the swipe is fired even with usual touch events
    touchStart = e.clientX;
  };

  const onTouchMove = (e: PointerEvent) => (touchEnd = e.clientX);

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    if (isLeftSwipe) {
      input.onSwipedLeft();
    }
    if (isRightSwipe) {
      input.onSwipedRight();
    }
  };

  return {
    onTouchStart,
    onTouchMove,
    onTouchEnd,
  };
};

export default useSwipe;
