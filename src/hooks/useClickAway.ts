import { useEffect, useRef } from 'react';

export function useClickAway(cb: (evt: MouseEvent | TouchEvent) => void) {
  const ref = useRef<any>(null);
  const refCb = useRef(cb);

  useEffect(() => {
    const handler = (e: any) => {
      const element: HTMLElement | null = ref.current;
      if (element != null && element.contains(e.target) === false) {
        refCb.current(e);
      }
    };

    document.addEventListener('mousedown', handler);
    document.addEventListener('touchstart', handler);

    return () => {
      document.removeEventListener('mousedown', handler);
      document.removeEventListener('touchstart', handler);
    };
  }, []);

  return ref;
}
