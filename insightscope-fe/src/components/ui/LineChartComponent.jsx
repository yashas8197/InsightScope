"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  LineChart,
  CartesianGrid,
  Line,
  XAxis,
  Tooltip,
  YAxis,
} from "recharts";

export const description = "A linear line chart";

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
};

export function LineChartComponent(result) {
  const data = [...result.data];
  console.log(data);

  if (!data) return;

  const formattedData = data.map((entry) => {
    if (!entry?.day) {
      console.warn("Invalid or missing 'day' field in entry:", entry);
      return entry; // Return the entry as-is if 'day' is missing
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

  const dataCopy = formattedData;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Line Chart - Linear</CardTitle>
        <CardDescription>
          {formattedData[0]?.day} -{" "}
          {formattedData[formattedData.length - 1]?.day} - Feature{" "}
          {result.category}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart
            accessibilityLayer
            data={dataCopy}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="day"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 5)}
            />
            <YAxis
              dataKey={result.category}
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Line
              dataKey={result.category}
              type="linear"
              stroke="var(--color-desktop)"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
