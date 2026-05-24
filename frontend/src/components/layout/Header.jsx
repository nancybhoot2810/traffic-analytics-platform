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
  sidebarOpen
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
        <button
          className={`menuToggle ${sidebarOpen ? "hideMenuToggle" : ""}`}
          onClick={onMenuClick}
        >
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
            onChange={(update) => {
              handleDateChange(update);

              if (update?.[0] && update?.[1]) {
                document.activeElement?.blur();
              }
            }}
            startDate={startDate}
            endDate={endDate}
            selectsRange
            shouldCloseOnSelect={true}
            monthsShown={2}
            maxDate={new Date()}
            filterDate={(date) => date <= new Date()}
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
