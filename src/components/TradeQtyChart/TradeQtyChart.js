import React from 'react';
import { Bar } from 'react-chartjs-2';

const TradeQtyChart = ({ prices, values, labels }) => {
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
        yAxisID: 'y-axis-1',
      },
      {
        label: '마지막 가격',
        backgroundColor: 'rgba(75,192,192,0.1)',
        borderColor: 'rgba(75,192,192,1)',
        borderWidth: 1,
        data: prices,
        type: 'line',
        yAxisID: 'y-axis-2',
      },
    ],
  };
  const option = {
    scaleOverride: true,
    scaleStartValue: 0,
    scales: {
      yAxes: [
        {
          type: 'linear',
          display: true,
          position: 'left',
          id: 'y-axis-1',
          gridLines: {
            display: false,
          },
          labels: {
            show: true,
          },
          ticks: {
            suggestedMin: 0,
          },
        },
        {
          type: 'linear',
          display: true,
          position: 'right',
          id: 'y-axis-2',
          gridLines: {
            display: false,
          },
          labels: {
            show: true,
          },
          ticks: {
            suggestedMax: Math.max(...prices) + Math.floor(Math.max(...prices) / 100),  
            suggestedMin: Math.min(...prices) - Math.floor(Math.min(...prices) / 100),
          },
        },
      ],
    },
  };

  return <Bar data={data} options={option} width={100} height={175} />;
};

export default TradeQtyChart;
