import React from 'react';
import { Bar } from 'react-chartjs-2';

const TradeQtyChart = ({ values, labels }) => {
  const data = {
    labels: labels,
    datasets: [
      {
        label: '거래량',
        backgroundColor: 'rgba(255,99,132,0.2)',
        borderColor: 'rgba(255,99,132,1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(255,99,132,0.4)',
        hoverBorderColor: 'rgba(255,99,132,1)',
        data: values,
      },
    ],
  };
  const option = {
    scaleOverride : true,
    scaleStartValue : 0
  };

  return <Bar data={data} options={option} width={100} height={100} />;
};

export default TradeQtyChart;
