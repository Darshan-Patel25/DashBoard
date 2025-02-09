import Chart from 'react-apexcharts';

const BasicColumn = () => {
  const data = [
    {
      name: 'Net Profit',
      data: [44, 55, 57, 56, 61, 58, 63],
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
    colors: ['#FF4560'],
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
      categories: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
      labels: {
        style: {
          colors: '#FFFFFF',
        },
      },
    },
    yaxis: {
      title: {
        text: 'Net Profit ($)',
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
        formatter: (val) => 50000,
      },
    },
  };

  return <Chart options={options} series={data} height={300} type="bar" />;
};

export default BasicColumn;