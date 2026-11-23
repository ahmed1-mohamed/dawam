import type { LucideIcon } from "lucide-react";

export type IndustryKey = "pharma" | "distribution" | "branches" | "maintenance" | "collection" | "offices";

export type IndustryChipKey =
  | "visits"
  | "route"
  | "reports"
  | "liveTracking"
  | "customers"
  | "tasks"
  | "attendance"
  | "shifts"
  | "leaves"
  | "photos"
  | "files";

export interface Industry {
  key: IndustryKey;
  icon: LucideIcon;
  chips: IndustryChipKey[];
}
