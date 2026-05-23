import { useEffect, useMemo, useState } from "react";
import { FaCar, FaGlobe, FaChartLine, FaClock } from "react-icons/fa";

import Sidebar from "../components/layout/Sidebar";
import Header from "../components/layout/Header";
import StatsCard from "../components/cards/StatsCard";
import CountryChart from "../components/charts/CountryChart";
import VehicleChart from "../components/charts/VehicleChart";
import TrafficTable from "../components/tables/TrafficTable";
import TopCountries from "../components/widgets/TopCountries";

import { getCountryTraffic, getVehicleTraffic } from "../api/traffic";

function Dashboard() {
  const today = new Date();

  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(today.getDate() - 6);

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [countryData, setCountryData] = useState([]);
  const [vehicleData, setVehicleData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [dateRange, setDateRange] = useState({
    startDate: sevenDaysAgo,
    endDate: today,
  });

  const loadDashboardData = async () => {
    try {
      setLoading(true);

      const countries = await getCountryTraffic(dateRange);
      const vehicles = await getVehicleTraffic(dateRange);

      setCountryData(countries);
      setVehicleData(vehicles);
    } catch (error) {
      console.error("Dashboard API error:", error);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 500);
    }
  };

  useEffect(() => {
    if (dateRange.startDate && dateRange.endDate) {
      loadDashboardData();
    }
  }, [dateRange.startDate, dateRange.endDate]);

  const totalTraffic = useMemo(() => {
    return countryData.reduce((sum, item) => sum + (item._sum?.count || 0), 0);
  }, [countryData]);

  const avgDailyTraffic = Math.round(totalTraffic / 7);

  const handleRangeChange = (range) => {
    setSelectedRange(range);
  };

  return (
    <div className="dashboardLayout">
      <div
        className={`mobileOverlay ${sidebarOpen ? "showOverlay" : ""}`}
        onClick={() => setSidebarOpen(false)}
      />

      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <main className="mainContent">
        <Header
          onRefresh={loadDashboardData}
          onMenuClick={() => setSidebarOpen(true)}
          loading={loading}
          dateRange={dateRange}
          onDateRangeChange={setDateRange}
        />

        <section className="statsGrid">
          <StatsCard
            title="Total Countries"
            value={countryData.length}
            subtitle="Active countries"
            growth="12%"
            icon={<FaGlobe />}
            color="linear-gradient(135deg, #4f46e5, #6366f1)"
            lineColor="#8b5cf6"
            sparkPath="M0 38 C20 36 30 37 48 31 C66 25 78 24 96 31 C118 39 134 38 150 27 C170 13 188 16 204 25 C220 34 230 29 240 22"
          />

          <StatsCard
            title="Total Vehicle Types"
            value={vehicleData.length}
            subtitle="Tracked vehicles"
            growth="8%"
            icon={<FaCar />}
            color="linear-gradient(135deg, #059669, #22c55e)"
            lineColor="#22c55e"
            sparkPath="M0 40 C20 37 34 36 50 29 C65 20 76 24 88 34 C104 48 120 37 136 28 C154 18 170 24 186 29 C205 36 222 28 240 18"
          />

          <StatsCard
            title="Total Traffic Count"
            value={totalTraffic.toLocaleString()}
            subtitle="Total vehicles"
            growth="15%"
            icon={<FaChartLine />}
            color="linear-gradient(135deg, #ea580c, #f97316)"
            lineColor="#f97316"
            sparkPath="M0 42 C18 36 30 39 46 32 C60 25 74 35 88 34 C104 33 116 20 136 23 C154 26 164 36 182 29 C202 20 220 26 240 18"
          />

          <StatsCard
            title="Avg. Daily Traffic"
            value={avgDailyTraffic.toLocaleString()}
            subtitle="Per day average"
            growth="9%"
            icon={<FaClock />}
            color="linear-gradient(135deg, #9333ea, #d946ef)"
            lineColor="#d946ef"
            sparkPath="M0 40 C20 37 32 39 48 31 C66 22 80 28 96 34 C114 40 128 22 148 19 C166 16 178 30 194 31 C214 32 224 24 240 16"
          />
        </section>

        <section className="chartsGrid">
          <CountryChart data={countryData} />
          <VehicleChart data={vehicleData} />
        </section>

        <section className="bottomGrid">
          <TrafficTable data={countryData} />
          <TopCountries data={countryData} />
        </section>
      </main>
    </div>
  );
}

export default Dashboard;
