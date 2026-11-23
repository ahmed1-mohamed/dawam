import type { Tool } from "./types";

export const TOOLS: Tool[] = [
  { key: "attendance", image: "/images/landing/attendance.png" },
  { key: "visits", image: "/images/landing/visits.png" },
  { key: "tasks", image: "/images/landing/tasks.png" },
  { key: "leaves", image: "/images/landing/leaves.png" },
  { key: "employees", image: "/images/landing/employees.png" },
];

/** Seconds each tool stays expanded before auto-advancing. */
export const TOOL_ROTATE_SECONDS = 4.5;
