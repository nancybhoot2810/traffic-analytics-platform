import { useEffect, useState } from "react";
import { getPaginatedCountries } from "../../api/traffic";
import { getTrafficCount, getCountryCode } from "../../utils/countryUtils";

function TrafficTable() {
  const [page, setPage] = useState(1);
  const [rows, setRows] = useState([]);
  const [meta, setMeta] = useState({
    page: 1,
    limit: 3,
    totalItems: 0,
    totalPages: 1,
    hasNextPage: false,
    hasPreviousPage: false,
  });

  const loadCountries = async () => {
    const result = await getPaginatedCountries(page, 3);

    setRows(result.data || []);
    setMeta(result.meta || {});
  };

  useEffect(() => {
    loadCountries();
  }, [page]);

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

        {rows.map((item, index) => {
          const trend = index === 2 ? "-3%" : index === 1 ? "5%" : "12%";
          const isNegative = trend.startsWith("-");

          return (
            <div className="tableRow" key={item.country}>
              <span>
                <strong>{getCountryCode(item.country)}</strong> {item.country}
              </span>

              <span>{getTrafficCount(item).toLocaleString()}</span>

              <span className={isNegative ? "trendDown" : "trendUp"}>
                {isNegative ? "↓" : "↑"} {trend.replace("-", "")}
              </span>

              <span>2 min ago</span>
            </div>
          );
        })}
      </div>

      <div className="paginationControls">
        <button
          onClick={() => setPage((current) => current - 1)}
          disabled={!meta.hasPreviousPage}
        >
          Prev
        </button>

        <span>
          Page {meta.page || 1} of {meta.totalPages || 1}
        </span>

        <button
          onClick={() => setPage((current) => current + 1)}
          disabled={!meta.hasNextPage}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default TrafficTable;