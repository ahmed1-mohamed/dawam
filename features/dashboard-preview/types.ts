export type RoleKey = "manager" | "hr" | "employee";
export type Tone = "g" | "y" | "r" | "b";

export type PersonKey = "ahmed" | "sara" | "karim" | "noha" | "mohamed";

export interface Kpi {
  key: string;
  value: number;
  tone?: Exclude<Tone, "b">;
}

export interface ManagerRow {
  person: PersonKey;
  checkIn: string | null;
  place: "salam" | "maadi" | "shifa" | "hq" | null;
  status: "visiting" | "late" | "onLeave" | "present";
  tone: Tone;
}

export interface HrRow {
  person: PersonKey;
  daysPresent: number;
  lateHours: number;
  lateMinutes: number;
  absences: number;
  tone: Tone;
}

export interface EmployeeCard {
  key: "selfie" | "schedule" | "requests";
  tone: Tone;
}

export interface EmployeeTask {
  key: "weeklyReport" | "followOrder" | "updateClients";
  due: "thursday" | "tomorrow" | "sunday";
  priority: { key: "high" | "medium" | "normal"; tone: Tone };
  status: { key: "new" | "inProgress"; tone: Tone };
}
