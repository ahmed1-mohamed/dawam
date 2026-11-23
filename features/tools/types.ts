export type ToolKey = "attendance" | "visits" | "tasks" | "leaves" | "employees";

export interface Tool {
  key: ToolKey;
  image: string;
}
