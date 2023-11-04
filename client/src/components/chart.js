import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

const Piechart = ({ data }) => {
  ChartJS.register(ArcElement, Tooltip, Legend);
  // console.log(data);
  const labels = Object.keys(data);
  const datasetData = Object.values(data);
  // console.log(labels, datasetData);
  const chartData = {
    labels: labels,
    datasets: [
      {
        label: "People",
        data: datasetData,
        backgroundColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(99, 152, 145, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    maintainAspectRatio: false,
    legend: {
      display: true,
      position: "right",
    },
  };

  return <Pie data={chartData} options={chartOptions} />;
};

export default Piechart;
