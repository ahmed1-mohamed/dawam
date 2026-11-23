import { User } from "@/types";

export interface DashboardMetric {
  id: string;
  titleKey: string;
  value: string;
  changeKey: string;
  trend: "up" | "down" | "neutral";
}

export interface ActivityItem {
  id: string;
  user: string;
  action: string;
  target: string;
  time: string;
}

export interface RevenueChartPoint {
  month: string;
  revenue: number;
  expenses: number;
}
