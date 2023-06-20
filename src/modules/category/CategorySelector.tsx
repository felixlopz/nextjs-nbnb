'use client';

import { IconType } from 'react-icons';
import React, { useCallback } from 'react';
import {
  ReadonlyURLSearchParams,
  useRouter,
  useSearchParams,
} from 'next/navigation';
import qs from 'query-string';

interface CategorySelectorProps {
  icon: IconType;
  label: string;
}

const CATEGORY_QUERY_PARAM_NAME = 'category';

export const CategorySelector: React.FC<CategorySelectorProps> = (props) => {
  const { icon: Icon, label } = props;

  const router = useRouter();
  const params = useSearchParams();

  const isCurrentCategorySelectedInParams = (): boolean => {
    return params?.get(CATEGORY_QUERY_PARAM_NAME) === label;
  };

  const updateRouterWithCategoryQuery = (categoryQuery: string) => {
    router.push(`?${categoryQuery}`);
  };

  const updateSelectedCategoryQueryFromSearchParams = (
    params: ReadonlyURLSearchParams | null
  ): string => {
    let currentQuery = {};
    if (params != null) {
      currentQuery = qs.parse(params.toString());
    }

    const updatedQuery: any = {
      ...currentQuery,
      [CATEGORY_QUERY_PARAM_NAME]: label,
    };

    if (isCurrentCategorySelectedInParams()) {
      delete updatedQuery[CATEGORY_QUERY_PARAM_NAME];
    }

    return qs.stringify(updatedQuery, { skipNull: true });
  };

  const handleClick = useCallback(() => {
    const updatedCategoryQuery =
      updateSelectedCategoryQueryFromSearchParams(params);

    updateRouterWithCategoryQuery(updatedCategoryQuery);
  }, [label, params, router]);

  const selected = isCurrentCategorySelectedInParams();

  return (
    <div
      onClick={handleClick}
      className={`
      flex 
      cursor-pointer 
      flex-col 
      items-center 
      justify-center 
      gap-2 
      border-b-2 
      p-3 transition 
      hover:text-neutral-800
      ${selected ? 'border-b-neutral-800' : 'border-transparent'}
      ${selected ? 'text-neutral-800' : 'text-neutral-500'}
      `}
    >
      <Icon size={26} />
      <div className="text-sm font-medium">{label}</div>
    </div>
  );
};

export default CategorySelector;
