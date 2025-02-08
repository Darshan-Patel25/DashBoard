import * as React from "react";
import { BarChart } from "@mui/x-charts";

export default function BarLabel() {
  return (
    <BarChart
      xAxis={[
        { 
          scaleType: "band", 
          data: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"], 
          label: "Days of the Week" // X-axis label
        }
      ]}
      yAxis={[
        { 
          label: "Engagement Count" // Y-axis label
        }
      ]}
      series={[
        { id: 1, label: "Followers", data: [4, 3, 5, 2, 3, 4, 1] },
        { id: 2, label: "Likes", data: [1, 6, 3, 5, 2, 4, 3] },
        { id: 3, label: "Comments", data: [2, 5, 6, 1, 4, 2, 5] },
      ]}
      width={900}
      height={300}
    />
  );
}
 