import { ComposableMap, Geographies, Geography } from "react-simple-maps";

import { FaFileAlt } from "react-icons/fa";
import { getTrafficCount } from "../../utils/countryUtils";

import * as XLSX from "xlsx";

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

const COLORS = ["#7c3aed", "#3b82f6", "#22c55e", "#f97316"];

const normalizeCountryName = (name = "") => {
  return name.toLowerCase().replace(/[^a-z]/g, "");
};

const getGeoName = (geo) => {
  return (
    geo.properties?.name ||
    geo.properties?.NAME ||
    geo.properties?.admin ||
    geo.properties?.ADMIN ||
    ""
  );
};

function TopCountries({ data }) {
  const sorted = [...data].sort(
    (a, b) => getTrafficCount(b) - getTrafficCount(a),
  );

  const countryLookup = sorted.reduce((acc, item, index) => {
    acc[normalizeCountryName(item.country)] = {
      ...item,
      color: COLORS[index % COLORS.length],
    };

    return acc;
  }, {});

  const handleGenerateReport = () => {
    const totalTraffic = sorted.reduce(
      (sum, item) => sum + getTrafficCount(item),
      0,
    );

    const reportData = sorted.map((item, index) => ({
      Rank: index + 1,
      Country: item.country,
      "Traffic Count": getTrafficCount(item),
      "Traffic Percentage": `${(
        (getTrafficCount(item) / totalTraffic) *
        100
      ).toFixed(1)}%`,
    }));

    const summaryData = [
      {
        "Generated On": new Date().toLocaleString(),
        "Total Countries": sorted.length,
        "Total Traffic": totalTraffic,
      },
    ];

    const workbook = XLSX.utils.book_new();

    const reportSheet = XLSX.utils.json_to_sheet(reportData);
    const summarySheet = XLSX.utils.json_to_sheet(summaryData);

    XLSX.utils.book_append_sheet(workbook, reportSheet, "Country Report");
    XLSX.utils.book_append_sheet(workbook, summarySheet, "Summary");

    XLSX.writeFile(workbook, "country-traffic-report.xlsx");
  };
  
  return (
    <div className="widgetCard topCountriesCard">
      <div className="sectionHeader">
        <div>
          <h2>Top Countries</h2>
          <p>By traffic count</p>
        </div>
      </div>

      <div className="topCountriesContent">
        <div className="dynamicMapBox">
          <div className="mapScrollInner">
            <ComposableMap
              projection="geoMercator"
              projectionConfig={{
                scale: 72,
                center: [8, 18],
              }}
              width={760}
              height={260}
              style={{
                width: "760px",
                height: "260px",
              }}
            >
              <Geographies geography={geoUrl}>
                {({ geographies }) =>
                  geographies.map((geo) => {
                    const mapName = getGeoName(geo);
                    const match = countryLookup[normalizeCountryName(mapName)];

                    return (
                      <Geography
                        key={geo.rsmKey}
                        geography={geo}
                        fill={match ? match.color : "rgba(71,85,105,0.45)"}
                        stroke="rgba(15,23,42,0.85)"
                        strokeWidth={0.5}
                        style={{
                          default: {
                            outline: "none",
                            filter: match
                              ? `drop-shadow(0 0 10px ${match.color})`
                              : "none",
                          },
                          hover: {
                            fill: match
                              ? match.color
                              : "rgba(100,116,139,0.55)",
                            outline: "none",
                            cursor: "pointer",
                          },
                          pressed: {
                            outline: "none",
                          },
                        }}
                      />
                    );
                  })
                }
              </Geographies>
            </ComposableMap>
          </div>
        </div>

        <div className="rankingBox">
          {sorted.slice(0, 3).map((item, index) => (
            <div className="rankRow" key={item.country}>
              <span>
                {index + 1}. {item.country}
              </span>

              <strong style={{ color: COLORS[index % COLORS.length] }}>
                {getTrafficCount(item).toLocaleString()}
              </strong>
            </div>
          ))}
        </div>
      </div>

      <button className="viewBtn" onClick={handleGenerateReport}>
        View Country Report <FaFileAlt />
      </button>
    </div>
  );
}

export default TopCountries;
