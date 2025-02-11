import React from "react";
import { BarChart } from "@mui/x-charts";

const EngagementBarChart = ({ likes, replies, views, reposts, bookmarks }) => {
  // Engagement metrics data
  const engagementData = [
    { metric: "Likes", count: likes, color: "#FF6384" },
    { metric: "Replies", count: replies, color: "#36A2EB" },
    { metric: "Views", count: views, color: "#FFCE56" },
    { metric: "Reposts", count: reposts, color: "#4BC0C0" },
    { metric: "Bookmarks", count: bookmarks, color: "#9966FF" },
  ];

  return (
    <div className="overflow-x-auto w-full">
      <div className="min-w-[600px]">
        <BarChart
          xAxis={[
            {
              scaleType: "band",
              data: engagementData.map((entry) => entry.metric),
              label: "Engagement Metrics",
            },
          ]}
          yAxis={[{ label: "Count" }]}
          series={[
            {
              id: 1,
              label: "Engagement Count",
              data: engagementData.map((entry) => entry.count),
            },
          ]}
          width={550}
          height={500}
        />
      </div>
    </div>
  );
};

export default EngagementBarChart;
