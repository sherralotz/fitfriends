import React, { useState } from "react";
import moment from "moment";
import type { Moment } from "moment";
import { extendMoment } from "moment-range"; 
import "./Calendar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronDown,
  faChevronUp,
  faPlus, 
} from "@fortawesome/free-solid-svg-icons";  
import { wod } from "../../../config/wod";
import { useNavigate } from "react-router-dom";
 
const Moment = extendMoment(moment);

const Calendar: React.FC = () => {
  type DateType = Moment;

  const getStartOfWeek = (date: DateType): DateType => {
    return date.clone().startOf("week").add(1, "day");
  };

  const generateDays = (
    currentDate: DateType,
    viewMode: "week" | "month"
  ): DateType[] => {
    const startOfWeek = getStartOfWeek(currentDate);
    const days: DateType[] = [];

    if (viewMode === "week") {
      for (let i = 0; i < 7; i++) {
        days.push(startOfWeek.clone().add(i, "days"));
      }
    } else {
      // Month view
      const startOfMonth = currentDate.clone().startOf("month");
      let currentDay = getStartOfWeek(startOfMonth);

      for (let i = 0; i < 35; i++) {
        // 5 weeks
        days.push(currentDay.clone());
        currentDay.add(1, "day");
      }
    }
    return days;
  };

  const [viewMode, setViewMode] = useState<"week" | "month">("week");
  const [selectedDate, setSelectedDate] = useState(moment());
  const currentDate = selectedDate.clone(); // Use selectedDate for calculations

  const displayedDays = generateDays(currentDate, viewMode);
  const formattedSelectedDate = selectedDate.format("MM-DD-YY");

  const displayedWod = wod.find((w) => {
    const wodDateMoment = moment(w.date, "MM-DD-YY");
    const formattedWodDate = wodDateMoment.format("MM-DD-YY");
    return formattedWodDate === formattedSelectedDate;
  });
  const navigate = useNavigate();


  const handleDateClick = (date: Moment) => {
    setSelectedDate(date);
  };

  const dayNames = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  return (
    <>
      <div className="d-flex justify-content-between align-items-center my-3">
        <div></div>
        <button
          className="btn btn-outline-primary ms-auto"
          onClick={() => setViewMode(viewMode === "week" ? "month" : "week")}
        >
          <span className=""> {currentDate.format("MMMM")} </span>
          {viewMode === "week" ? (
            <FontAwesomeIcon icon={faChevronDown} size="xs" />
          ) : (
            <FontAwesomeIcon icon={faChevronUp} size="xs" />
          )}
        </button>
      </div>

      <div className="calendar-header">
        {dayNames.map((day) => (
          <div key={day} className="day-header text-center">
            {day}
          </div>
        ))}
      </div>

      <div className="calendar-grid">
        {displayedDays.map((day) => (
          <div
            key={day.format("YYYY-MM-DD")}
            className={`day-cell rounded border ${
              day.isSame(selectedDate, "day") ? "bg-primary text-white" : ""
            }`}
            onClick={() => handleDateClick(day)}
          >
            <div className="day-number">{day.format("D")}</div>
          </div>
        ))}
      </div>

      <div className="mt-4">
        <div className="d-flex">
          <div className="btn-group ms-auto">
            <button
              type="button"
              className="btn  btn-outline-secondary dropdown-toggle"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <FontAwesomeIcon icon={faPlus} size="xs" /> Create
            </button>
            <ul className="dropdown-menu"> 
              <li>
                <a className="dropdown-item" onClick={()=> navigate("/create-workout")}>
                  Workout
                </a>
              </li>
            </ul>
          </div>
        </div>
        <h4>{selectedDate.format("dddd, MMM D")}</h4>

        <div>
          {displayedWod ? (
            <div>
              <p>Workout of the Day!</p>
              <pre className="wod-content">{displayedWod.content}</pre>
            </div>
          ) : (
            <p>No WOD available for this date.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default Calendar;
