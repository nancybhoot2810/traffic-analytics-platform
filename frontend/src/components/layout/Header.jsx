import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { FaCalendarAlt, FaRedo, FaBars } from "react-icons/fa";
import ThemeToggle from "./ThemeToggle";

function Header({
  onRefresh,
  onMenuClick,
  loading,
  dateRange,
  onDateRangeChange,
}) {
  const { startDate, endDate } = dateRange;

  const handleDateChange = (dates) => {
    const [start, end] = dates;

    onDateRangeChange({
      startDate: start,
      endDate: end,
    });
  };

  return (
    <div className="dashboardHeader">
      <div className="mobileTopRow">
        <button className="menuToggle" onClick={onMenuClick}>
          <FaBars />
        </button>

        <div>
          <h1>Dashboard</h1>
          <p>Real-time overview of traffic analytics</p>
        </div>
      </div>

      <div className="headerActions">
        <div className="datePickerBox">
          <FaCalendarAlt />

          <DatePicker
            selected={startDate}
            onChange={handleDateChange}
            startDate={startDate}
            endDate={endDate}
            selectsRange
            shouldCloseOnSelect={false}
            monthsShown={2}
            maxDate={new Date()}
            dateFormat="MMM d, yyyy"
            placeholderText="Select date range"
            className="datePickerInput"
            popperClassName="datePickerPopper"
            calendarClassName="datePickerCalendar"
            portalId="root"
            withPortal={false}
          />
        </div>

        <button
          className="iconBtn"
          onClick={onRefresh}
          disabled={loading}
          title="Refresh dashboard"
        >
          <FaRedo className={loading ? "spinIcon" : ""} />
        </button>

        <ThemeToggle />
      </div>
    </div>
  );
}

export default Header;
