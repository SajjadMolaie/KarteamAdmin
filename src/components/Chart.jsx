import React from "react";
import ReactECharts from "echarts-for-react";

const Chart = ({ title, row, data }) => {
  const chartOptions = {
    grid: { top: 8, right: 8, bottom: 24, left: 36 },
    xAxis: {
      type: "category",
      data: row,
    },
    yAxis: {
      type: "value",
    },
    series: data,
    tooltip: {
      trigger: "axis",
    },
  };

  return (
    <div className="flex flex-col">
      <h2 className="text-2xl">{title}</h2>
      <ReactECharts className="w-5/6" option={chartOptions} />
    </div>
  );
};

export default Chart;
