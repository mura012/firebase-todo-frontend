export type Limit = "今日中" | "今週中" | "今月中" | "継続";
export type Importance = "high" | "middle" | "low";
export type Todo = {
  task: string;
  limit: Limit;
  importance: Importance;
  isDone: boolean;
};
