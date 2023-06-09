'use client';

import useCountries from '@/hooks/useCountries';
import Select from 'react-select';

export type Location = {
  flag: string;
  label: string;
  latlng: Array<number>;
  region: string;
  value: string;
};

interface CountrySelectProps {
  value: Location | null;
  onChange: (value: Location) => void;
}

const CountrySelect: React.FC<CountrySelectProps> = ({ value, onChange }) => {
  const { getAll } = useCountries();

  return (
    <div>
      <Select
        placeholder="Anywhere"
        options={getAll()}
        value={value}
        onChange={(value) => onChange(value as Location)}
        formatOptionLabel={(option: any) => {
          return (
            <div className="flex flex-row items-center gap-3">
              <div>{option.flag}</div>
              <div>
                {option.label != null ? `${option.label},` : ''}
                <span className="ml-1 text-neutral-500">{option.region}</span>
              </div>
            </div>
          );
        }}
        classNames={{
          control: () => 'p-3 border-2',
          input: () => 'text-lg',
          option: () => 'text-lg',
        }}
        theme={(theme) => ({
          ...theme,
          borderRadius: 6,
          colors: {
            ...theme.colors,
            primary: 'black',
            primary25: '#ffe4e6',
          },
        })}
      />
    </div>
  );
};

export default CountrySelect;
