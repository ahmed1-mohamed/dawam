import type { EmployeeCard, EmployeeTask, HrRow, Kpi, ManagerRow, RoleKey } from "./types";

/** Illustrative demo data only — not real figures (see the demo note in the UI). */
export const ROLES: RoleKey[] = ["manager", "hr", "employee"];

export const MANAGER_KPIS: Kpi[] = [
  { key: "present", value: 42, tone: "g" },
  { key: "late", value: 5, tone: "y" },
  { key: "absent", value: 2, tone: "r" },
  { key: "inField", value: 14 },
];

export const MANAGER_ROWS: ManagerRow[] = [
  { person: "ahmed", checkIn: "08:56", place: "salam", status: "visiting", tone: "g" },
  { person: "sara", checkIn: "09:24", place: "maadi", status: "late", tone: "y" },
  { person: "karim", checkIn: "08:47", place: "shifa", status: "visiting", tone: "g" },
  { person: "noha", checkIn: null, place: null, status: "onLeave", tone: "b" },
  { person: "mohamed", checkIn: "08:58", place: "hq", status: "present", tone: "g" },
];

export const HR_KPIS: Kpi[] = [
  { key: "workDays", value: 22 },
  { key: "lateHours", value: 31, tone: "y" },
  { key: "absentDays", value: 9, tone: "r" },
  { key: "approvedLeaves", value: 17, tone: "g" },
];

export const HR_ROWS: HrRow[] = [
  { person: "ahmed", daysPresent: 21, lateHours: 1, lateMinutes: 10, absences: 0, tone: "g" },
  { person: "sara", daysPresent: 19, lateHours: 4, lateMinutes: 5, absences: 1, tone: "y" },
  { person: "karim", daysPresent: 22, lateHours: 0, lateMinutes: 0, absences: 0, tone: "g" },
  { person: "noha", daysPresent: 17, lateHours: 0, lateMinutes: 35, absences: 2, tone: "r" },
];

export const EMPLOYEE_CARDS: EmployeeCard[] = [
  { key: "selfie", tone: "g" },
  { key: "schedule", tone: "b" },
  { key: "requests", tone: "y" },
];

export const EMPLOYEE_TASKS: EmployeeTask[] = [
  { key: "weeklyReport", due: "thursday", priority: { key: "high", tone: "r" }, status: { key: "new", tone: "b" } },
  { key: "followOrder", due: "tomorrow", priority: { key: "medium", tone: "y" }, status: { key: "inProgress", tone: "g" } },
  { key: "updateClients", due: "sunday", priority: { key: "normal", tone: "b" }, status: { key: "new", tone: "b" } },
];
