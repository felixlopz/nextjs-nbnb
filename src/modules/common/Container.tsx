import { cn } from '@/libs/utils';

interface Props {
  children: React.ReactNode;
  className?: string;
}

const Container: React.FC<Props> = ({ children, className }) => {
  return (
    <div
      className={cn([
        'mx-auto max-w-[2520px] px-4 sm:px-2 md:px-10 xl:px-20',
        className,
      ])}
    >
      {children}
    </div>
  );
};

export default Container;
