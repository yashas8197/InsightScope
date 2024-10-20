"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export function AboutDashboard() {
  return (
    <Card className="w-full max-w-4xl mx-auto my-8">
      <CardHeader>
        <CardTitle>About This Dashboard</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Bar Chart Section */}
        <div>
          <h3 className="text-lg font-medium">Bar Chart Overview</h3>
          <p className="text-sm text-muted-foreground">
            The Bar Chart offers a visual representation of how much time users
            spend on different product features. Each bar showcases a feature on
            the y-axis, with the length of the bar reflecting the total time
            spent on that feature. This makes it easy to quickly identify which
            features are receiving the most user interaction.
          </p>
        </div>

        {/* Line Chart Section */}
        <div>
          <h3 className="text-lg font-medium">Line Chart Insights</h3>
          <p className="text-sm text-muted-foreground">
            Clicking on any bar from the Bar Chart reveals a detailed Line Chart
            for that feature. This chart tracks user engagement over time,
            giving you the ability to zoom and pan for deeper insights. By
            exploring time trends, you can easily spot patterns and shifts in
            user behavior.
          </p>
        </div>

        {/* Filters Section */}
        <div>
          <h3 className="text-lg font-medium">Refine Your View with Filters</h3>
          <p className="text-sm text-muted-foreground">
            The dashboard includes filtering options, allowing you to customize
            the displayed data based on user demographics like age and gender.
            Additionally, you can narrow the date range to focus on a specific
            time period. These filters help you analyze specific segments of
            users and better understand feature engagement within those groups.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
