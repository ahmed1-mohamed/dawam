"use client";

import dynamic from "next/dynamic";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

/** Same footprint as the real chart card, so nothing shifts when it loads. */
function AnalyticsChartSkeleton() {
  return (
    <Card className="col-span-full lg:col-span-4">
      <CardHeader>
        <Skeleton className="h-6 w-48" />
        <Skeleton className="mt-2 h-4 w-72" />
      </CardHeader>
      <CardContent>
        <Skeleton className="h-[320px] w-full" />
      </CardContent>
    </Card>
  );
}

/**
 * The chart (and the heavy `recharts` library) is split into its own chunk and
 * loaded after the dashboard's first render, keeping initial JS smaller.
 */
export const AnalyticsChartLazy = dynamic(
  () => import("./analytics-chart").then((m) => m.AnalyticsChart),
  { ssr: false, loading: AnalyticsChartSkeleton }
);
