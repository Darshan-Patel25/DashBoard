import React from "react";
import { BarChart } from "@mui/x-charts";

const BarLabel = ({ graphData }) => {
  // Extract the days, followers, followings, and tweets directly from graphData
  const days = graphData.map((entry) => entry.day);
  const followersData = graphData.map((entry) => parseInt(entry.followers));
  const followingsData = graphData.map((entry) => parseInt(entry.followings));
  const tweetsData = graphData.map((entry) => parseInt(entry.tweets));

  return (
    <div className="overflow-x-auto w-full">
      <div className="min-w-[600px]">
        <BarChart
          xAxis={[
            {
              scaleType: "band",
              data: days,
              label: "Days of the Week",
            },
          ]}
          yAxis={[{ label: "Engagement Count" }]}
          series={[
            { id: 1, label: "Followers", data: followersData },
            { id: 2, label: "Followings", data: followingsData },
            { id: 3, label: "Tweets", data: tweetsData },
          ]}
          width={750}
          height={300}
        />
      </div>
    </div>
  );
};

export default BarLabel;
