'use client';

import * as React from 'react';
import { DayPicker } from 'react-day-picker';
import { cn } from '@/libs/utils';
import { buttonVariants } from '@/modules/common/Button';

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn('p-3', className)}
      classNames={{
        months: 'flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0',
        month: 'space-y-4',
        caption: 'flex items-center relative mb-4',
        caption_label: 'text-md font-medium text-center w-full',
        nav: '',
        nav_button: cn(
          'h-7 w-7 bg-transparent p-0 hover:opacity-100 border-none outline-none rounded-none'
        ),
        nav_button_previous: 'disabled:opacity-50 absolute left-0 top-[-4px]',
        nav_button_next: 'disabled:opacity-50',
        table: 'w-full border-collapse space-y-1',
        head_row: 'flex',
        head_cell: 'text-muted-foreground rounded-md w-8 font-normal text-base',
        row: 'flex w-full mt-2',
        cell: 'text-center p-0 relative [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20',
        day: 'h-11 w-11 p-0 font-normal aria-selected:opacity-100 text-base hover:border-black hover:border-1 focus:ring-offset-2 transition focus:ring-black focus:ring-2 rounded-full',
        day_selected: 'bg-black text-primary-foreground rounded-full',
        day_today: 'text-primary',
        day_outside: 'text-muted-foreground opacity-50',
        day_disabled: 'text-muted-foreground opacity-50',
        day_hidden: 'invisible',
        day_range_middle: 'rounded-none bg-gray-100',
        day_range_start: 'text-white bg-black',
        day_range_end: 'text-white bg-black',

        ...classNames,
      }}
      {...props}
    />
  );
}
Calendar.displayName = 'Calendar';

export default Calendar;
