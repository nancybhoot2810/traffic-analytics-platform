import {
  FaChartBar,
  FaGlobe,
  FaCar,
  FaBell,
  FaCog,
  FaFileAlt,
  FaTimes,
  FaChevronDown,
} from "react-icons/fa";

import liveTrafficImg from "../../assets/live-traffic-target.png";
import adminAvatar from "../../assets/admin-avatar-target.png";

const menuItems = [
  { name: "Dashboard", icon: <FaChartBar />, active: true },
  { name: "Countries", icon: <FaGlobe /> },
  { name: "Vehicles", icon: <FaCar /> },
  { name: "Reports", icon: <FaFileAlt /> },
  { name: "Alerts", icon: <FaBell /> },
  { name: "Settings", icon: <FaCog /> },
];

function Sidebar({ isOpen, onClose, onMenuSelect, activeSection }) {
  return (
    <aside className={`sidebar ${isOpen ? "sidebarOpen" : ""}`}>
      <div className="sidebarTop">
        <div className="sidebarMobileHeader">
          <div className="logoSection" onClick={onClose}>
            <div className="trafficLights">
              <span className="red"></span>
              <span className="yellow"></span>
              <span className="green"></span>
            </div>

            <h2>Traffic Analytics</h2>
          </div>
        </div>

        <nav className="menu">
          {menuItems.map((item) => (
            <button
              key={item.name}
              className={`menuItem ${activeSection === item.name ? "activeMenu" : ""}`}
              onClick={() => {
                onMenuSelect?.(item.name);
                onClose();
              }}
            >
              <span className="menuIcon">{item.icon}</span>
              <span>{item.name}</span>
            </button>
          ))}
        </nav>
      </div>

      <div className="sidebarBottom">
        <div className="liveCard">
          <img
            src={liveTrafficImg}
            alt="Live traffic graph"
            className="liveTrafficImg"
          />

          <h3>Live Traffic Updates</h3>
          <p>Real-time data streaming from traffic sensors</p>

          <div className="liveStatus">
            <span className="liveDot"></span>
            <span>Live</span>
          </div>
        </div>

        <div className="profileCard">
          <img src={adminAvatar} alt="Admin avatar" className="adminAvatar" />

          <div className="profileText">
            <h4>Admin</h4>
            <p>System Administrator</p>
          </div>

          <FaChevronDown className="profileArrow" />
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
