"use client";

import { Bar, BarChart, XAxis, YAxis } from "recharts";

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
import { aggregateFeatureDataBar } from "@/utils/groupFeatureTimeSpent";

export const description = "A horizontal bar chart";

const chartConfig = {
  timeSpent: {
    label: "timeSpent",
    color: "hsl(var(--chart-1))",
  },
};

export function BarChartComponent(result) {
  const data = aggregateFeatureDataBar(result);
  console.log(data);

  const handleClick = (data) => {
    result.setCategory(data.feature);
  };

  if (!data) return;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Bar Chart - Horizontal</CardTitle>
        <CardDescription>
          {result?.data[0]?.Day} - {result?.data[result.data.length - 1]?.Day}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={data}
            layout="vertical"
            margin={{
              left: -20,
            }}
          >
            <XAxis type="number" dataKey="timeSpent" />
            <YAxis
              dataKey="feature"
              type="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar
              onClick={(e) => handleClick(e)}
              dataKey="timeSpent"
              fill="var(--color-timeSpent)"
              radius={5}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
