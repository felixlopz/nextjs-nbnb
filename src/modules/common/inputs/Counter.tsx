'use client';

import { useCallback, useMemo } from 'react';
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';
import Button from '@/modules/common/Button';

interface CounterProps {
  title: string;
  subtitle: string;
  value: number;
  onChange: (value: number) => void;
}

const Counter: React.FC<CounterProps> = ({
  title,
  subtitle,
  value,
  onChange,
}) => {
  const onAdd = useCallback(() => {
    onChange(value + 1);
  }, [onChange, value]);

  const onReduce = useCallback(() => {
    if (value === 1) {
      return;
    }

    onChange(value - 1);
  }, [onChange, value]);

  const isLeftDisabled = useMemo(() => value <= 1, [value]);

  return (
    <div className="flex flex-row items-center justify-between">
      <div className="flex flex-col">
        <div className="font-medium">{title}</div>
        <div className="font-light text-gray-600">{subtitle}</div>
      </div>
      <div className="flex flex-row items-center gap-4">
        <Button onClick={onReduce} disabled={isLeftDisabled} variant="circle">
          <AiOutlineMinus />
        </Button>
        <span
          className="
            text-base 
            font-light 
            text-neutral-600
          "
        >
          {value}
        </span>
        <Button onClick={onAdd} variant="circle">
          <AiOutlinePlus />
        </Button>
      </div>
    </div>
  );
};

export default Counter;
