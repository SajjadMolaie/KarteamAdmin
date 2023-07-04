import ReactEcharts from "echarts-for-react";
import * as echarts from "echarts";

function BarChart() {
  const data1 = [2, 3, 5];
  const data2 = [4, 1, 3];

  const options = {
    xAxis: {
      type: "category",
      data: ["A", "B", "C"],
    },
    yAxis: {
      type: "value",
      splitNumber: 5, // split the y-axis into 5 parts
    },
    series: [
      {
        type: "bar",
        data: data1,
        itemStyle: {
          color: "#2196f3", // set color for the first bar series
        },
      },
      {
        type: "bar",
        data: data2,
        itemStyle: {
          color: "#4caf50", // set color for the second bar series
        },
      },
    ],
  };

  return <ReactEcharts echarts={echarts} option={options} />;
}

export default BarChart;
