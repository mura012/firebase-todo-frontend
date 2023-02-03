import { useGetTask } from "@/hooks/useGetTask";
import { auth } from "@/lib/firebase";
import { Importance, Limit } from "@/types/todo";
import { Loader } from "@mantine/core";
import { useAuthState } from "react-firebase-hooks/auth";

export const TodoList = ({
  limit,
  importance,
}: {
  limit: Limit;
  importance: Importance;
}) => {
  const { data } = useGetTask(process.env.NEXT_PUBLIC_LOCALHOST);
  const [user] = useAuthState(auth);
  const deleteTodo = () => {};
  return (
    <>
      {data
        ?.filter(
          (todo) =>
            todo.limit === limit &&
            todo.importance === importance &&
            todo.userId === user?.email
        )
        .map((todo) => {
          return (
            <li key={todo._id} className=" flex justify-between items-center">
              <p className="ml-6">{todo.task}</p>
              <button className="mr-6" onClick={deleteTodo}>
                削除
              </button>
            </li>
          );
        })}
    </>
  );
};

export const TodoLists = ({ limit }: { limit: Limit }) => {
  const [user] = useAuthState(auth);
  const { data, isLoading } = useGetTask(process.env.NEXT_PUBLIC_LOCALHOST);
  const todoLimitLength = data?.filter(
    (todo) => todo.userId === user?.email && todo.limit === limit
  ).length;

  return (
    <div className="border-black border-solid mx-2 my-2 min-w-[200px] relative">
      <h2 className="text-center absolute m-0 -top-4 bg-white ml-3">{`${limit}: ${todoLimitLength}件`}</h2>
      <ul>
        {isLoading && (
          <li className="mt-5 flex items-center ml-5">
            <Loader />
            <span>Loading...</span>
          </li>
        )}
        <TodoList limit={limit} importance={"高"} />
        <TodoList limit={limit} importance={"中"} />
        <TodoList limit={limit} importance={"低"} />
      </ul>
    </div>
  );
};
