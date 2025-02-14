import React from "react";
import { Chart } from "react-google-charts";
import { Box, Typography } from "@mui/material";

const DonutChart = ({positive,neutral,negative}) => {
  // Ensure valid data
//   const { positive = 0, neutral = 0, negative = 0 } = sentimentData || {};

  // Data for Google Charts
  const data = [
    ["Sentiment", "Percentage"],
    ["Positive", positive],
    ["Neutral", neutral],
    ["Negative", negative],
  ];

  // Chart Options
  const options = {
    title: "Sentiment Distribution",
    pieHole: 0.4, // Donut style
    is3D: false,
    backgroundColor: "transparent",
    legend: { position: "bottom" },
    pieSliceText: "value",
    chartArea: { width: "90%", height: "75%" },
    slices: {
      0: { color: "#00C9A7" }, // Green for Positive
      1: { color: "#FFB400" }, // Yellow for Neutral
      2: { color: "#FF3D68" }, // Red for Negative
    },
  };

  return (
    <Box textAlign="center" p={3}>
      <Typography variant="h6" gutterBottom>
        Overall Sentiment Analysis
      </Typography>
      {positive + neutral + negative > 0 ? (
        <Chart chartType="PieChart" width="100%" height="300px" data={data} options={options} />
      ) : (
        <Typography color="#EAEAEA">No sentiment data available.</Typography>
      )}
    </Box>
  );
};

export default DonutChart;
