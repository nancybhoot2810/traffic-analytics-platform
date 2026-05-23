import {
  getCountryFlag,
  getTrafficCount,
} from "../../utils/countryUtils";

function TrafficTable({ data }) {
  const sortedData = [...data].sort(
    (a, b) => getTrafficCount(b) - getTrafficCount(a)
  );

  return (
    <div className="tableCard">
      <div className="sectionHeader">
        <div>
          <h2>Recent Traffic Summary</h2>
          <p>Latest traffic data by country</p>
        </div>
      </div>

      <div className="trafficTable">
        <div className="tableRow tableHead">
          <span>Country</span>
          <span>Traffic Count</span>
          <span>Trend</span>
          <span>Last Updated</span>
        </div>

        {sortedData.map((item, index) => {
          const count = getTrafficCount(item);
          const trend = index === sortedData.length - 1 ? "↓ 3%" : index === 1 ? "↑ 5%" : "↑ 12%";
          const trendClass = trend.includes("↓") ? "trendDown" : "trendUp";

          return (
            <div className="tableRow" key={item.country}>
              <span>
                {getCountryFlag(item.country)} {item.country}
              </span>

              <span>{count.toLocaleString()}</span>

              <span className={trendClass}>{trend}</span>

              <span>2 min ago</span>
            </div>
          );
        })}
      </div>

      <button className="viewBtn">View All Countries →</button>
    </div>
  );
}

export default TrafficTable;