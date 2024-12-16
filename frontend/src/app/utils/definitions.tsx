export interface Task {
  id?: number;
  description: string;
  status: "pending" | "completed";
}
