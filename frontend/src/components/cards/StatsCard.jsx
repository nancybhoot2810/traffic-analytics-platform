import { motion } from "framer-motion";

function StatsCard({
  title,
  value,
  subtitle,
  growth,
  icon,
  color,
  lineColor,
  sparkPath,
}) {
  return (
    <motion.div
      className="statsCard"
      style={{ "--accent": lineColor }}
      whileHover={{ y: -3 }}
      transition={{ duration: 0.2 }}
    >
      <div className="statsTopContent">
        <div className="statsIcon" style={{ background: color }}>
          {icon}
        </div>

        <div className="statsInfo">
          <div className="statsTitleRow">
            <h4>{title}</h4>
            <span className="growth">↑ {growth}</span>
          </div>

          <h1>{value}</h1>
          <p>{subtitle}</p>
        </div>
      </div>

      <svg className="sparkline" viewBox="0 0 240 54" preserveAspectRatio="none">
        <path
          d={`${sparkPath} L240 54 L0 54 Z`}
          fill="var(--spark-fill)"
        />
        <path
          d={sparkPath}
          fill="none"
          stroke={lineColor}
          strokeWidth="3"
          strokeLinecap="round"
        />
      </svg>
    </motion.div>
  );
}

export default StatsCard;