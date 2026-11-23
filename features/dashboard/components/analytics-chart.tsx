"use client";

import * as React from "react";
import { useTranslations } from "next-intl";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useMounted } from "@/hooks/use-mounted";
import { Skeleton } from "@/components/ui/skeleton";
import { useDirection } from "@/hooks/use-direction";

const chartData = [
  { month: "Jan", revenue: 4200, expenses: 2400 },
  { month: "Feb", revenue: 5100, expenses: 2800 },
  { month: "Mar", revenue: 6400, expenses: 3100 },
  { month: "Apr", revenue: 7800, expenses: 3900 },
  { month: "May", revenue: 8900, expenses: 4200 },
  { month: "Jun", revenue: 10200, expenses: 4800 },
  { month: "Jul", revenue: 11800, expenses: 5100 },
  { month: "Aug", revenue: 12400, expenses: 5400 },
];

export function AnalyticsChart() {
  const t = useTranslations("dashboard.charts");
  const mounted = useMounted();
  const { isRtl } = useDirection();

  if (!mounted) {
    return (
      <Card className="col-span-full lg:col-span-4">
        <CardHeader>
          <Skeleton className="h-6 w-48" />
          <Skeleton className="h-4 w-72 mt-2" />
        </CardHeader>
        <CardContent>
          <Skeleton className="h-[300px] w-full" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="col-span-full lg:col-span-4">
      <CardHeader>
        <CardTitle>{t("revenueTrend")}</CardTitle>
        <CardDescription>{t("revenueSub")}</CardDescription>
      </CardHeader>
      <CardContent className="ps-2">
        <div className="h-[320px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={chartData}
              margin={{ top: 10, right: 20, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0.0} />
                </linearGradient>
                <linearGradient id="colorExpenses" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--muted-foreground))" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="hsl(var(--muted-foreground))" stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis
                dataKey="month"
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                reversed={isRtl}
              />
              <YAxis
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `$${value}`}
                orientation={isRtl ? "right" : "left"}
              />
              <Tooltip
                content={({ active, payload, label }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="rounded-lg border bg-popover p-3 shadow-md text-popover-foreground text-xs space-y-1">
                        <p className="font-semibold">{label}</p>
                        <p className="text-primary font-medium">
                          Revenue: ${payload[0]?.value?.toLocaleString()}
                        </p>
                        <p className="text-muted-foreground">
                          Expenses: ${payload[1]?.value?.toLocaleString()}
                        </p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Area
                type="monotone"
                dataKey="revenue"
                stroke="hsl(var(--primary))"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorRevenue)"
              />
              <Area
                type="monotone"
                dataKey="expenses"
                stroke="hsl(var(--muted-foreground))"
                strokeWidth={1.5}
                strokeDasharray="4 4"
                fillOpacity={1}
                fill="url(#colorExpenses)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
