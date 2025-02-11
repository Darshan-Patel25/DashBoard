import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const BarGraph = ({ graphData }) => {
  return (
    <BarChart
      width={1100}
      height={400}
      data={graphData}
      margin={{
        top: 20,
        right: 30,
        left: 20,
        bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="date" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="followers" fill="#8884d8" name="Followers" />
      <Bar dataKey="followings" fill="#82ca9d" name="Followings" />
      <Bar dataKey="tweets" fill="#ffc658" name="Tweets" />
    </BarChart>
  );
};

export default BarGraph;
