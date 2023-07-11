'use client';

import Button from '@/src/modules/common/Button';
import Calendar from '@/src/modules/common/inputs/Calendar';
import { addYears, isSameDay } from 'date-fns';
import { DateRange } from 'react-day-picker';

interface ListingReservationProps {
  dateRange?: DateRange;
  price: number;
  totalPrice: number;
  disabledDates: Date[];
  onChangeDate: (range?: DateRange) => void;
  onSubmit: () => void;
  disabled?: boolean;
}

const ListingReservation: React.FC<ListingReservationProps> = ({
  price,
  dateRange,
  totalPrice,
  onChangeDate,
  onSubmit,
  disabled,
  disabledDates,
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
    <div
      className="
      overflow-hidden 
        rounded-xl 
        border-[1px]
      border-neutral-200 
        bg-white
      "
    >
      <div
        className="
      flex flex-row items-center gap-1 p-4"
      >
        <div className="text-2xl font-semibold">$ {price}</div>
        <div className="font-light text-neutral-600">night</div>
      </div>
      <hr />
      <div className="flex justify-center">
        <Calendar
          mode="range"
          today={defaultMonth}
          defaultMonth={defaultMonth}
          fromDate={defaultMonth}
          min={0}
          toDate={nextYear}
          selected={dateRange}
          disabled={disabledDates}
          onSelect={(range, selectedDay) => {
            handleSelect(selectedDay, range);
          }}
          onDayClick={() => {}}
          max={30}
          classNames={{
            caption_label: 'text-md font-medium text-left w-full',
            nav: 'flex',
            nav_button_previous: 'disabled:opacity-50',
            nav_button_next:
              'disabled:opacity-50 flex justify-end items-center',
          }}
        />
      </div>
      <hr />
      <div className="flex justify-center p-4">
        <Button
          className="w-full"
          isLoading={disabled}
          size="lg"
          onClick={onSubmit}
        >
          Reserve
        </Button>
      </div>
      <hr />
      <div
        className="
          flex 
          flex-row 
          items-center 
          justify-between 
          p-4
          text-lg
          font-semibold
        "
      >
        <div>Total</div>
        <div>$ {totalPrice}</div>
      </div>
    </div>
  );
};

export default ListingReservation;
