import { Todos } from "@/mock/todo";
import { Importance, Limit } from "@/types/todo";

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
            <p className="ml-6">{todo.task}</p>
            <button className="mr-6">削除</button>
          </li>
        );
      })}
    </>
  );
};

export const TodoLists = ({ limit }: { limit: Limit }) => {
  const todoLimitLength = Todos.filter((todo) => todo.limit === limit).length;
  return (
    <div className="border-black border-solid mx-2 my-2 min-w-[200px] relative">
      <h2 className="text-center absolute m-0 -top-4 bg-white ml-3">{`${limit}: ${todoLimitLength}件`}</h2>
      <ul>
        <TodoList limit={limit} importance={"high"} />
        <TodoList limit={limit} importance={"middle"} />
        <TodoList limit={limit} importance={"low"} />
      </ul>
    </div>
  );
};
