export type Limit = "今日中" | "今週中" | "今月中" | "継続";
export type Importance = "高" | "中" | "低";
export type TeamUser = {
  name: string;
  email: string;
  _id: string;
};
export type Tasks = {
  task: string;
  limit: Limit;
  importance: Importance;
  isDone: boolean;
  workingUserName?: string;
  _id: string;
};
export type Todo = {
  name: string;
  adminUserName: string;
  adminUserEmail: string;
  adminUserPhoto: string;
  tasks: Tasks[];
  teamUser?: TeamUser[];
};

export type DatabaseType = Todo & { _id: string; __v: number };
