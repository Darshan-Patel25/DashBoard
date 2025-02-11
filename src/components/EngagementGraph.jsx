import React from "react";
import { BarChart } from "@mui/x-charts";

const EngagementBarChart = ({ likes, replies, views, reposts, bookmarks }) => {
  // Engagement metrics data
  const engagementData = [
    { metric: "Likes", count: likes },
    { metric: "Replies", count: replies },
    { metric: "Views", count: views },
    { metric: "Reposts", count: reposts },
    { metric: "Bookmarks", count: bookmarks },
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
          width={750}
          height={300}
        />
      </div>
    </div>
  );
};

export default EngagementBarChart;
