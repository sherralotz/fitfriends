import React, { useState } from 'react';
import { format, addDays, subDays, eachDayOfInterval } from 'date-fns';
import "./WeekView.css";

const WeekView: React.FC = () => {
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [weekDays, setWeekDays] = useState<Date[]>(getWeekDays(new Date()));

  function getWeekDays(startDate: Date) {
    return eachDayOfInterval({ start: startDate, end: addDays(startDate, 6) });
  }

  // Navigation using arrows (shifts by 7 days)
  const handleNavigation = (direction: 'next' | 'previous') => {
    const newStartDate = direction === 'next' ? addDays(startDate, 7) : subDays(startDate, 7);
    setStartDate(newStartDate);
    setWeekDays(getWeekDays(newStartDate));
  };

  // Clicking on a date
  const handleDateClick = (day: Date) => {
    setSelectedDate(day);

    const isFirstDay = day.getTime() === weekDays[0].getTime();
    const isLastDay = day.getTime() === weekDays[6].getTime();

    if (isFirstDay) {
      // Shift left by 1 day
      const newStartDate = subDays(startDate, 1);
      setStartDate(newStartDate);
      setWeekDays(getWeekDays(newStartDate));
    } else if (isLastDay) {
      // Shift right by 1 day
      const newStartDate = addDays(startDate, 1);
      setStartDate(newStartDate);
      setWeekDays(getWeekDays(newStartDate));
    }
  };

  return (
    <div className="container my-4">
      {/* Month Header */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <button className="btn btn-outline-secondary" onClick={() => handleNavigation('previous')}>&lt;</button>
        <h3>{format(startDate, 'MMMM yyyy')}</h3>
        <button className="btn btn-outline-secondary" onClick={() => handleNavigation('next')}>&gt;</button>
      </div>

      {/* Days of the Week */}
      <div className="row justify-content-center">
        {weekDays.map((day, index) => (
          <div className="col" key={index}>
            <div
              className="card text-center p-4 date-card"
              onClick={() => handleDateClick(day)}
              style={{ cursor: 'pointer', fontSize: '1.5rem' }}
            >
              <p>{format(day, 'EEE')}</p> {/* Day of the week */}
              <p>{format(day, 'd')}</p>   {/* Date number */}
            </div>
          </div>
        ))}
      </div>

      {/* Detail View */}
      {selectedDate && (
        <div className="mt-4 p-3 border rounded">
          <h4>Details for {format(selectedDate, 'EEEE, MMMM d, yyyy')}</h4>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </div>
      )}
    </div>
  );
};

export default WeekView;
