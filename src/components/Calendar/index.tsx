import { getWeekDays } from '@/utils/get-week-days';
import dayjs from 'dayjs';
import { CaretLeft, CaretRight } from 'phosphor-react';
import { useMemo, useState } from 'react';
import {
  CalendarActions,
  CalendarBody,
  CalendarContainer,
  CalendarDay,
  CalendarHeader,
  CalendarTitle,
} from './styles';

export function Calendar() {
  const [currentDate, setCurrentDate] = useState(() => {
    return dayjs().set('date', 1);
  });

  function handlePreviousMonth() {
    const previousMonthDate = currentDate.subtract(1, 'month');
    setCurrentDate(previousMonthDate);
  }

  function handleNextMonth() {
    const nextMonthDate = currentDate.add(1, 'month');
    setCurrentDate(nextMonthDate);
  }

  const shortWeekDays = getWeekDays({ short: true });

  const currentMonth = currentDate.format('MMMM');
  const currentYear = currentDate.format('YYYY');

  const calendarWeeks = useMemo(() => {
    const daysInMonthArray = Array.from({
      length: currentDate.daysInMonth(),
    }).map((_, index) => {
      const day = currentDate.set('date', index + 1);
      return day;
    });

    const firstWeekDay = currentDate.get('day');

    const previousMonthFillArray = Array.from({
      length: firstWeekDay,
    })
      .map((_, index) => {
        return currentDate.subtract(index + 1, 'day');
      })
      .reverse();

    const lastDayInCurrentMonth = currentDate.set(
      'date',
      currentDate.daysInMonth()
    );

    const lastWeekDay = lastDayInCurrentMonth.get('day');

    const nextMonthFillArray = Array.from({
      length: 7 - (lastWeekDay + 1),
    }).map((_, index) => {
      return lastDayInCurrentMonth.add(index + 1, 'day');
    });

    const calendarDays = [
      ...previousMonthFillArray.map((date) => {
        return { date, disabled: true };
      }),
      ...daysInMonthArray.map((date) => {
        return { date, disabled: false };
      }),
      ...nextMonthFillArray.map((date) => {
        return { date, disabled: true };
      }),
    ];

    return calendarDays;
  }, [currentDate]);

  return (
    <CalendarContainer>
      <CalendarHeader>
        <CalendarTitle>
          {currentMonth} <span>{currentYear}</span>
        </CalendarTitle>

        <CalendarActions>
          <button onClick={handlePreviousMonth} title="Previous Month">
            <CaretLeft />
          </button>
          <button onClick={handleNextMonth} title="Next Month">
            <CaretRight />
          </button>
        </CalendarActions>
      </CalendarHeader>

      <CalendarBody>
        <thead>
          <tr>
            {shortWeekDays.map((weekDay) => {
              return <th key={weekDay}>{weekDay}.</th>;
            })}
          </tr>
        </thead>
        <tbody>
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td>
              <CalendarDay disabled>1</CalendarDay>
            </td>
            <td>
              <CalendarDay>2</CalendarDay>
            </td>
            <td>
              <CalendarDay>3</CalendarDay>
            </td>
          </tr>
        </tbody>
      </CalendarBody>
    </CalendarContainer>
  );
}
