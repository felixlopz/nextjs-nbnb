import { useEffect, useRef } from 'react';

export function useOnClickOutside(handler: (evt: Event) => void) {
  const ref = useRef<HTMLElement>(null);
  const handleReference = useRef(handler);

  useEffect(() => {
    const handler = (e: Event) => {
      const element = ref.current;
      if (element != null && element.contains(e.target as Node) === false) {
        handleReference.current(e);
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
