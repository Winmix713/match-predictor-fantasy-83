
import React from 'react';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { Calendar } from "@/components/ui/calendar";
import FilterPopover from './FilterPopover';

interface DateRangeFilterProps {
  dateRange: { from: Date | null; to: Date | null };
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  onSelect: (range: { from: Date | null; to: Date | null }) => void;
}

const DateRangeFilter: React.FC<DateRangeFilterProps> = ({
  dateRange,
  isOpen,
  setIsOpen,
  onSelect
}) => {
  return (
    <FilterPopover
      icon={<CalendarIcon className="h-4 w-4" />}
      label={
        dateRange.from ? (
          <span>
            {format(dateRange.from, 'PP')} 
            {dateRange.to ? ` - ${format(dateRange.to, 'PP')}` : ''}
          </span>
        ) : (
          <span>Date Range</span>
        )
      }
      isOpen={isOpen}
      onOpenChange={setIsOpen}
      selectedCount={dateRange.from || dateRange.to ? 1 : 0}
    >
      <Calendar
        mode="range"
        selected={dateRange}
        onSelect={onSelect}
        initialFocus
        className="bg-transparent border-none"
      />
    </FilterPopover>
  );
};

export default DateRangeFilter;
