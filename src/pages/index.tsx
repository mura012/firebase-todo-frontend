import { Layout } from "@/Layout";
type Limit = "day" | "week" | "year" | "continuation";
type Importance = "high" | "middle" | "low";
type Todo = {
  id: number;
  title: string;
  limit: Limit;
  importance: Importance;
  isDone: boolean;
};

export const Todos: Todo[] = [
  { id: 3, title: "day lo", limit: "day", importance: "low", isDone: false },
  { id: 2, title: "day mi", limit: "day", importance: "middle", isDone: false },
  { id: 1, title: "day hi", limit: "day", importance: "high", isDone: false },
  { id: 4, title: "洗濯", limit: "week", importance: "high", isDone: false },
  { id: 5, title: "勉強", limit: "week", importance: "middle", isDone: false },
  { id: 6, title: "掃除", limit: "week", importance: "low", isDone: false },
  { id: 7, title: "洗濯", limit: "year", importance: "high", isDone: false },
  { id: 8, title: "掃除", limit: "year", importance: "middle", isDone: false },
  { id: 9, title: "洗濯", limit: "year", importance: "low", isDone: false },
  {
    id: 10,
    title: "洗濯",
    limit: "continuation",
    importance: "high",
    isDone: false,
  },
  {
    id: 11,
    title: "掃除",
    limit: "continuation",
    importance: "middle",
    isDone: false,
  },
  {
    id: 12,
    title: "勉強",
    limit: "continuation",
    importance: "low",
    isDone: false,
  },
];

export const TodoList = ({
  limit,
  importance,
}: {
  limit: Limit;
  importance: Importance;
}) => {
  return (
    <>
      {Todos.filter(
        (todo) => todo.limit === limit && todo.importance === importance
      ).map((todo) => {
        return (
          <li key={todo.id} className=" flex justify-between items-center">
            <p className="ml-6">{todo.title}</p>
            <button className="mr-6">削除</button>
          </li>
        );
      })}
    </>
  );
};

export const TodoLists = ({ limit }: { limit: Limit }) => {
  return (
    <div className="border-black border-solid mx-2 my-2 min-w-[200px]">
      <h2 className="text-center">{limit}</h2>
      <ul>
        <TodoList limit={limit} importance={"high"} />
        <TodoList limit={limit} importance={"middle"} />
        <TodoList limit={limit} importance={"low"} />
      </ul>
    </div>
  );
};

const Home = () => {
  return (
    <Layout title="home">
      <main className="flex w-screen flex-wrap justify-center">
        <TodoLists limit="day" />
        <TodoLists limit="week" />
        <TodoLists limit="year" />
        <TodoLists limit="continuation" />
      </main>
    </Layout>
  );
};

export default Home;
