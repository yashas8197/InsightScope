import React, { useRef } from "react";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { aggregateFeatureDataBar } from "@/utils/groupFeatureTimeSpent";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import zoomPlugin from "chartjs-plugin-zoom";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  zoomPlugin
);

export function BarChartComponent({ data, setCategory, setSearchParams }) {
  const chartData = aggregateFeatureDataBar(data);

  if (!Array.isArray(chartData) || chartData.length === 0) {
    return <p>No data available for the chart.</p>;
  }

  const labels = chartData.map((item) => item.feature);
  const timeSpentData = chartData.map((item) => item.timeSpent);

  const dataForChart = {
    labels: labels,
    datasets: [
      {
        label: "Values (Estimated in Minutes)",
        data: timeSpentData,
        backgroundColor: "rgba(137, 134, 216, 0.6)",
        borderColor: "rgba(137, 134, 216, 1)",
        borderWidth: 1,
      },
    ],
  };

  const handleClick = (event, elements) => {
    if (elements.length > 0) {
      const clickedElementIndex = elements[0].index;
      const clickedLabel = labels[clickedElementIndex];
      setCategory(clickedLabel);
      setSearchParams((prev) => {
        prev.set("cat", clickedLabel);
        return prev;
      });
    }
  };

  const options = {
    responsive: true,
    indexAxis: "y",
    onClick: (event, elements) => handleClick(event, elements),
    plugins: {
      legend: {
        position: "top",
      },
      zoom: {
        pan: {
          enabled: true,
          mode: "xy",
        },
        zoom: {
          enabled: true,
          mode: "xy",
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Total Time Spent (Minutes) / Feature",
        },
      },
      y: {
        title: {
          display: true,
          text: "Categories (Features)",
        },
      },
    },
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Bar Chart</CardTitle>
        <CardDescription></CardDescription>
      </CardHeader>
      <Bar data={dataForChart} options={options} />
    </Card>
  );
}
