import * as React from "react";
import { BarChart } from "@mui/x-charts";

export default function BarLabel() {
  return (
    <div className="overflow-x-auto w-full">
      <div className="min-w-[600px]">
        <BarChart
          xAxis={[
            {
              scaleType: "band",
              data: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
              label: "Days of the Week",
            },
          ]}
          yAxis={[{ label: "Engagement Count" }]}
          series={[
            { id: 1, label: "Followers", data: [4, 3, 5, 2, 3, 4, 1] },
            { id: 2, label: "Likes", data: [1, 6, 3, 5, 2, 4, 3] },
            { id: 3, label: "Comments", data: [2, 5, 6, 1, 4, 2, 5] },
          ]}
          width={750} // Adjusted width
          height={300}
        />
      </div>
    </div>
  );
}
