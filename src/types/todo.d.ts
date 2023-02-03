export type Limit = "今日中" | "今週中" | "今月中" | "継続";
export type Importance = "高" | "中" | "低";
export type Todo = {
  task: string;
  limit: Limit;
  importance: Importance;
  isDone: boolean;
};

export type DatabaseType = Todo & { userId: string; _id: string; __v: number };
