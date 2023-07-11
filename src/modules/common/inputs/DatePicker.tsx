'use client';

import { useState, FC } from 'react';
import Calendar from '@/src/modules/common/inputs/Calendar';
import { DateRange } from 'react-day-picker';
import { addYears } from 'date-fns';

interface DatePickerProps {}

const DatePicker: FC<DatePickerProps> = () => {
  const defaultMonth = new Date();
  const nextYear = addYears(defaultMonth, 1);
  const [range, setRange] = useState<DateRange | undefined>();

  return (
    <Calendar
      mode="range"
      today={defaultMonth}
      defaultMonth={defaultMonth}
      fromMonth={defaultMonth}
      toDate={nextYear}
      selected={range}
      onSelect={setRange}
      max={30}
      numberOfMonths={2}
    />
  );
};

export default DatePicker;
