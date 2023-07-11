'use client';

import { useRouter } from 'next/navigation';
import Heading from '@/src/modules/common/Heading';
import Button from '@/src/modules/common/Button';

interface EmptyStateProps {
  title?: string;
  subtitle?: string;
  showReset?: boolean;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  title = 'No exact matches',
  subtitle = 'Try changing or removing some of your filter',
  showReset,
}) => {
  const router = useRouter();

  return (
    <div
      className="
      flex
      h-[60vh] 
      flex-col 
      items-center 
      justify-center 
      gap-2 
    "
    >
      <Heading center title={title} subtitle={subtitle} />
      <div className="mt-4">
        {showReset && (
          <Button variant="outline" onClick={() => router.push('/')}>
            Clear filters
          </Button>
        )}
      </div>
    </div>
  );
};

export default EmptyState;
