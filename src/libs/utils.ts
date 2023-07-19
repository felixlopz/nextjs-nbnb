import { ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// https://linuxhint.com/convert-object-to-query-string-javascript
export const objectToQueryString = (object: any) => {
  const objString =
    '?' +
    Object.keys(object)
      .map((key) => {
        return `${key}=${encodeURIComponent(object[key])}`;
      })
      .join('&');
  return objString;
};
