"use client";

import * as React from "react";
import { useTranslations } from "next-intl";
import {
  DollarSign,
  Users,
  TrendingUp,
  Activity,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function OverviewStats() {
  const t = useTranslations("dashboard.stats");

  const stats = [
    {
      title: t("revenue.title"),
      value: "$124,592",
      change: t("revenue.change"),
      trend: "up",
      icon: DollarSign,
    },
    {
      title: t("users.title"),
      value: "14,230",
      change: t("users.change"),
      trend: "up",
      icon: Users,
    },
    {
      title: t("conversions.title"),
      value: "3.84%",
      change: t("conversions.change"),
      trend: "up",
      icon: TrendingUp,
    },
    {
      title: t("performance.title"),
      value: "99.98%",
      change: t("performance.change"),
      trend: "neutral",
      icon: Activity,
    },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, i) => {
        const Icon = stat.icon;
        return (
          <Card key={i} className="hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <div className="flex h-8 w-8 items-center justify-center rounded-md bg-muted text-foreground">
                <Icon className="h-4 w-4" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold tracking-tight">
                {stat.value}
              </div>
              <div className="mt-2 flex items-center gap-1.5 text-xs text-muted-foreground">
                <span className="inline-flex items-center text-emerald-600 dark:text-emerald-400 font-medium">
                  <ArrowUpRight className="h-3.5 w-3.5 me-0.5 rtl:rotate-90" />
                  {stat.change}
                </span>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
