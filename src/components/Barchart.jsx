import Chart from 'react-apexcharts';

const BasicColumn = ({ graphData }) => {
  // Extract data for chart from the graphData prop
  const days = graphData.map((entry) => entry.day);
  const tweetsGrowthData = graphData.map((entry) => parseInt(entry.tweetsGrowth));

  const data = [
    {
      name: 'Tweets Growth',
      data: tweetsGrowthData,
    },
  ];

  const options = {
    chart: {
      toolbar: {
        show: true,
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '55%',
        borderRadius: 4,
      },
    },
    colors: ['#00E396'], // Tweets Growth color
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 2,
      colors: ['transparent'],
    },
    xaxis: {
      title: {
        text: 'Days of the Week',
        style: {
          color: '#FFFFFF',
        },
      },
      categories: days,
      labels: {
        style: {
          colors: '#FFFFFF',
        },
      },
    },
    yaxis: {
      title: {
        text: 'Tweets Growth Count',
        style: {
          color: '#FFFFFF',
        },
      },
      labels: {
        style: {
          colors: '#FFFFFF',
        },
      },
    },
    fill: {
      opacity: 1,
    },
    tooltip: {
      y: {
        formatter: (val) => val,
      },
    },
  };

  return <Chart options={options} series={data} height={300} type="bar" />;
};

export default BasicColumn;
