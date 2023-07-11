'use client';

import { useState, FC, useEffect } from 'react';
import Calendar from '@/src/modules/common/inputs/Calendar';
import { DateRange } from 'react-day-picker';
import { addYears } from 'date-fns';

interface DateRangePickerProps {
  updateStartDateAndEndDate: (startDate?: Date, endDate?: Date) => void;
}

const DateRangePicker: FC<DateRangePickerProps> = ({
  updateStartDateAndEndDate,
}) => {
  const defaultMonth = new Date();
  const nextYear = addYears(defaultMonth, 1);
  const [range, setRange] = useState<DateRange | undefined>();

  useEffect(() => {
    updateStartDateAndEndDate(range?.from, range?.to);
  }, [range]);

  return (
    <Calendar
      mode="range"
      today={defaultMonth}
      defaultMonth={defaultMonth}
      fromDate={defaultMonth}
      toDate={nextYear}
      selected={range}
      onSelect={setRange}
      max={30}
      numberOfMonths={2}
    />
  );
};

export default DateRangePicker;
