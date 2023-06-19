'use client';

import Container from '@/src/modules/common/Container';
import { usePathname } from 'next/navigation';
import categories from '@/src/modules/categories/categories';
import CategorySelector from '@/src/components/CategorySelector';

const Categories = () => {
  const pathname = usePathname();
  const isMainPage = pathname === '/';

  if (isMainPage === false) {
    return null;
  }

  return (
    <Container>
      <div className="flex flex-row items-center justify-between overflow-hidden pt-4">
        {categories.map((category) => (
          <CategorySelector
            key={category.label}
            icon={category.icon}
            label={category.label}
          />
        ))}
      </div>
    </Container>
  );
};

export default Categories;
