import { useEffect, useRef } from 'react';

export function useOnClickOutside(onClickOutside: (evt: Event) => void) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const eventHandler = (e: Event) => {
      const element = ref.current;
      if (element != null && element.contains(e.target as Node) === false) {
        onClickOutside(e);
      }
    };

    document.addEventListener('mousedown', eventHandler);
    document.addEventListener('touchstart', eventHandler);

    return () => {
      document.removeEventListener('mousedown', eventHandler);
      document.removeEventListener('touchstart', eventHandler);
    };
  }, [onClickOutside]);

  return ref;
}
