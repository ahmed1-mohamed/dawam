export type Locale = "en" | "ar";
export type Direction = "ltr" | "rtl";
export type Theme = "light" | "dark" | "system";

export type UserRole = "admin" | "developer" | "designer" | "manager";
export type UserStatus = "active" | "inactive" | "pending";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  status: UserStatus;
  avatarUrl?: string;
  createdAt: string;
  bio?: string;
  receiveEmails?: boolean;
}

export interface MetricCardData {
  id: string;
  titleKey: string;
  value: string | number;
  changeKey: string;
  trend: "up" | "down" | "neutral";
  iconName: string;
}

export interface ChartDataPoint {
  month: string;
  revenue: number;
  expenses: number;
  profit: number;
}
