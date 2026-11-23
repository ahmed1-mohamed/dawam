import {
  Banknote,
  Building2,
  Calendar,
  Camera,
  ChartColumn,
  Clock,
  FileText,
  LogIn,
  MapPin,
  Pill,
  Radio,
  Route,
  SquareCheck,
  Truck,
  Users,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import type { Industry, IndustryChipKey } from "./types";

export const INDUSTRIES: Industry[] = [
  { key: "pharma", icon: Pill, chips: ["visits", "route", "reports"] },
  { key: "distribution", icon: Truck, chips: ["liveTracking", "customers", "tasks"] },
  { key: "branches", icon: Building2, chips: ["attendance", "shifts", "leaves"] },
  { key: "maintenance", icon: Wrench, chips: ["tasks", "visits", "photos"] },
  { key: "collection", icon: Banknote, chips: ["route", "attendance"] },
  { key: "offices", icon: Users, chips: ["attendance", "leaves", "files"] },
];

export const CHIP_ICONS: Record<IndustryChipKey, LucideIcon> = {
  visits: MapPin,
  route: Route,
  reports: ChartColumn,
  liveTracking: Radio,
  customers: Users,
  tasks: SquareCheck,
  attendance: LogIn,
  shifts: Clock,
  leaves: Calendar,
  photos: Camera,
  files: FileText,
};

/** Seconds each industry stays selected before auto-advancing. */
export const INDUSTRY_ROTATE_SECONDS = 5;
