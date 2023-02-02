import { Todo } from "@/types/todo";

export const Todos: Todo[] = [
  { id: 3, task: "day lo", limit: "今日中", importance: "low", isDone: false },
  {
    id: 2,
    task: "day mi",
    limit: "今日中",
    importance: "middle",
    isDone: false,
  },
  {
    id: 1,
    task: "day hi",
    limit: "今日中",
    importance: "high",
    isDone: false,
  },
  { id: 4, task: "洗濯", limit: "今週中", importance: "high", isDone: false },
  {
    id: 5,
    task: "勉強",
    limit: "今週中",
    importance: "middle",
    isDone: false,
  },
  { id: 6, task: "掃除", limit: "今週中", importance: "low", isDone: false },
  { id: 7, task: "洗濯", limit: "今月中", importance: "high", isDone: false },
  {
    id: 8,
    task: "掃除",
    limit: "今月中",
    importance: "middle",
    isDone: false,
  },
  { id: 9, task: "洗濯", limit: "今月中", importance: "low", isDone: false },
  {
    id: 10,
    task: "洗濯",
    limit: "継続",
    importance: "high",
    isDone: false,
  },
  {
    id: 11,
    task: "掃除",
    limit: "継続",
    importance: "middle",
    isDone: false,
  },
  {
    id: 12,
    task: "勉強",
    limit: "継続",
    importance: "low",
    isDone: false,
  },
];
