export type Limit = "今日中" | "今週中" | "今月中" | "継続";
export type Importance = "high" | "middle" | "low";
export type Todo = {
  id: number;
  title: string;
  limit: Limit;
  importance: Importance;
  isDone: boolean;
};
