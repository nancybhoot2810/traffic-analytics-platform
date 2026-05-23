import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
  CartesianGrid,
  LabelList,
} from "recharts";

const GRADIENTS = [
  ["#60a5fa", "#2563eb"],
  ["#a78bfa", "#7c3aed"],
  ["#4ade80", "#16a34a"],
  ["#fb923c", "#f97316"],
];

function CountryChart({ data }) {
  return (
    <div className="chartCard dashboardChartCard">
      <div className="chartHeader">
        <div>
          <h2>Country-wise Traffic</h2>
          <p>Total traffic count by country</p>
        </div>

        <button className="chartTypeBtn">Bar Chart</button>
      </div>

      <div className="barChartBox">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 24, right: 18, left: -12, bottom: 0 }}
          >
            <defs>
              {GRADIENTS.map(([start, end], index) => (
                <linearGradient
                  key={index}
                  id={`barGradient${index}`}
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop offset="0%" stopColor={start} />
                  <stop offset="100%" stopColor={end} />
                </linearGradient>
              ))}
            </defs>

            <CartesianGrid
              strokeDasharray="4 4"
              stroke="rgba(148,163,184,0.12)"
              vertical={false}
            />

            <XAxis
              dataKey="country"
              tick={{ fill: "#94a3b8", fontSize: 12 }}
              tickLine={false}
            />

            <YAxis
              tick={{ fill: "#94a3b8", fontSize: 12 }}
              tickLine={false}
            />

            <Tooltip cursor={{ fill: "transparent" }} />

            <Bar dataKey="_sum.count" radius={[8, 8, 0, 0]} barSize={66}>
              <LabelList
                dataKey="_sum.count"
                position="top"
                fill="#ffffff"
                fontSize={12}
                formatter={(value) => value.toLocaleString()}
              />

              {data.map((_, index) => (
                <Cell
                  key={index}
                  fill={`url(#barGradient${index % GRADIENTS.length})`}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default CountryChart;