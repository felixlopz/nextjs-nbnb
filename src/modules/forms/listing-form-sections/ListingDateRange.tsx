import { FC, useState } from 'react';
import Heading from '@/modules/common/Heading';
import Calendar from '@/modules/common/inputs/Calendar';
import { addYears, isSameDay } from 'date-fns';
import { DateRange } from 'react-day-picker';

interface ListingDateRangeProps {
  range: DateRange | undefined;
  onChangeDate: (range?: DateRange) => void;
}

export const ListingDateRange: FC<ListingDateRangeProps> = ({
  range,
  onChangeDate,
}) => {
  const defaultMonth = new Date();
  const nextYear = addYears(defaultMonth, 1);

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

  return (
    <div className="flex flex-col gap-8">
      <Heading
        title="When do you plan to go?"
        subtitle="Make sure everyone is free!"
      />
      <div className="flex min-h-[425px] justify-center">
        <Calendar
          showOutsideDays={false}
          mode="range"
          today={defaultMonth}
          defaultMonth={defaultMonth}
          fromDate={defaultMonth}
          toDate={nextYear}
          selected={range}
          onSelect={(range, selectedDay) => {
            handleSelect(selectedDay, range);
          }}
          max={30}
          numberOfMonths={2}
        />
      </div>
    </div>
  );
};

export default ListingDateRange;
