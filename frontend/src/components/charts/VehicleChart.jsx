import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const COLORS = ["#3b82f6", "#22c55e", "#8b5cf6", "#f97316", "#ef4444"];

function renderPieLabel({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
}) {
  const RADIAN = Math.PI / 180;
  const radius = innerRadius + (outerRadius - innerRadius) * 0.55;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="#ffffff"
      textAnchor="middle"
      dominantBaseline="central"
      fontSize={12}
      fontWeight={700}
    >
      {(percent * 100).toFixed(1)}%
    </text>
  );
}

function VehicleChart({ data }) {
  const total = data.reduce((sum, item) => sum + (item._sum?.count || 0), 0);

  return (
    <div className="chartCard compactChartCard">
      <div className="chartHeader">
        <div>
          <h2>Vehicle Distribution</h2>
          <p>Traffic distribution by vehicle type</p>
        </div>

        <button className="chartTypeBtn">Pie Chart</button>
      </div>

      <div className="vehicleChartLayout">
        <div className="donutWrapper">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                dataKey="_sum.count"
                nameKey="vehicleType"
                innerRadius={54}
                outerRadius={112}
                paddingAngle={0}
                stroke="none"
                strokeWidth={0}
                label={renderPieLabel}
                labelLine={false}
              >
                {data.map((_, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>

              <Tooltip
                // formatter={(value) => [`${value.toLocaleString()}`, "Vehicles"]}
                contentStyle={{
                  background: "#020617",
                  border: "1px solid rgba(255,255,255,0.12)",
                  borderRadius: "14px",
                  color: "#fff",
                }}
              />
            </PieChart>
          </ResponsiveContainer>

          <div className="donutCenter">
            <h3>{total.toLocaleString()}</h3>
            <p>Total</p>
          </div>
        </div>

        <div className="sideLegend">
          {data.map((item, index) => {
            const count = item._sum?.count || 0;
            const percent = total ? ((count / total) * 100).toFixed(1) : 0;

            return (
              <div className="sideLegendItem" key={item.vehicleType}>
                <span
                  className="legendDot"
                  style={{ background: COLORS[index % COLORS.length] }}
                />

                <span>{item.vehicleType}</span>

                <strong>
                  {count.toLocaleString()} <em>({percent}%)</em>
                </strong>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default VehicleChart;
