'use client';

import { useState, FC, useEffect } from 'react';
import Calendar from '@/src/modules/common/inputs/Calendar';
import { DateRange } from 'react-day-picker';
import { addYears, isSameDay } from 'date-fns';

interface DateRangePickerProps {
  defaultRange?: DateRange;
  updateStartDateAndEndDate: (startDate?: Date, endDate?: Date) => void;
  onChangeDate: (range?: DateRange) => void;
}

const DateRangePicker: FC<DateRangePickerProps> = ({
  updateStartDateAndEndDate,
  defaultRange,
  onChangeDate,
}) => {
  const defaultMonth = new Date();
  const nextYear = addYears(defaultMonth, 1);
  const [range, setRange] = useState<DateRange | undefined>(defaultRange);

  const handleSelect = (selectedDay: Date, range?: DateRange) => {
    if (
      range != null &&
      range.from != null &&
      range.to != null &&
      isSameDay(selectedDay, range.from)
    ) {
      onChangeDate(undefined);
      return;
    }
    onChangeDate(range);
  };

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
