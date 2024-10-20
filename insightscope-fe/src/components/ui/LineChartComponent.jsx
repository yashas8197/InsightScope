import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { Line } from "react-chartjs-2";
import zoomPlugin from "chartjs-plugin-zoom";

ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  zoomPlugin,
  Filler
);

export function LineChartComponent({ data, category }) {
  const formattedData = data.map((entry) => {
    if (!entry?.day) {
      console.warn("Invalid or missing 'day' field in entry:", entry);
      return entry;
    }

    const [day, month, year] = entry.day.split("/");
    const date = new Date(year, month - 1, day);
    const formattedDay = date.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
    });

    return {
      ...entry,
      day: formattedDay,
    };
  });

  const labels = formattedData.map((entry) => entry.day);

  const yAxisData = formattedData.map((entry) => entry[category]);

  const dataForChart = {
    labels: labels,
    datasets: [
      {
        label: `Values for ${category}`,
        data: yAxisData,
        borderColor: "rgba(75,192,192,1)",
        backgroundColor: "rgba(75,192,192,0.2)",
        fill: true,
      },
    ],
  };

  const options = {
    responsive: true,
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
          wheel: {
            enabled: true,
            modifierKey: "ctrl",
          },
          pinch: {
            enabled: true,
          },
          mode: "xy",
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Days",
        },
      },
      y: {
        title: {
          display: true,
          text: `Values for ${category}`,
        },
      },
    },
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Line Chart - Linear</CardTitle>
        <CardDescription>
          {formattedData[0]?.day} -{" "}
          {formattedData[formattedData.length - 1]?.day} - Feature {category}
        </CardDescription>
      </CardHeader>

      <Line data={dataForChart} options={options} />
    </Card>
  );
}
