import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";

interface MixedChartProps {
  categories: Array<string>;
  barSeries: Array<number | string>;
  lineSeries: Array<number | string>;
}

function MixedChart({ categories, barSeries, lineSeries }: MixedChartProps) {
  const optimalColumnWidthPercent =
    35 + 60 / (1 + 30 * Math.exp(-categories.length / 3));
  const options: ApexOptions = {
    colors: ["#6f03fc", "#fc03be"],
    chart: {
      height: 350,
      type: "line",
    },
    stroke: {
      width: [0, 4],
    },
    title: {
      text: "Driver Analysis",
      style: {
        fontSize: "23px",
        color: "rgb(144, 0, 255)",
      },
    },
    dataLabels: {
      enabled: true,
      enabledOnSeries: [1],
    },
    plotOptions: {
      bar: {
        borderRadius: 10,
        dataLabels: {
          position: "top", // top, center, bottom
        },
        columnWidth: optimalColumnWidthPercent + "%",
      },
    },
    labels: categories,
    grid: {
      show: false,
    },
    yaxis: [
      {
        title: {
          text: "Points",
        },
      },
      {
        opposite: true,
        title: {
          text: "Position",
        },
      },
    ],
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const seriesD : any = [
    {
      name: "Points",
      type: "column",
      data: barSeries,
    },
    {
      name: "Position",
      type: "line",
      data: lineSeries,
    },
  ];
  return (
    <Chart
      options={options}
      series={seriesD}
      type="line"
      width="100%"
      height="auto"
    />
  );
}

export default MixedChart;
