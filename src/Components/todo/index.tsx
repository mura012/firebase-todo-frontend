import { useGetTask } from "@/hooks/useGetTask";
import { auth } from "@/lib/firebase";
import { DatabaseType, Importance, Limit } from "@/types/todo";
import { Loader } from "@mantine/core";
import Image from "next/image";
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
  const updateTodo = async (e: any, todo: DatabaseType) => {
    console.log(!todo.isDone);

    await fetch(`${process.env.NEXT_PUBLIC_LOCALHOST}/${todo._id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: user?.email,
        task: todo.task,
        limit: todo.limit,
        importance: todo.importance,
        isDone: !todo.isDone,
      }),
    });
    window.location.reload();
  };
  const deleteTodo = async (e: any, id: string) => {
    await fetch(`${process.env.NEXT_PUBLIC_LOCALHOST}/${id}`, {
      method: "delete",
    });
    window.location.reload();
  };
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
            <li key={todo._id} className="flex justify-between items-center">
              {todo.isDone ? (
                <div>
                  <Image
                    src="/images/done.jpeg"
                    width={64}
                    height={32}
                    alt="済"
                    className="absolute"
                  />
                  <p className="ml-6 line-through w-36 relative">{todo.task}</p>
                </div>
              ) : (
                <p className="ml-6 w-36">{todo.task}</p>
              )}
              <div className="space-x-1">
                <button
                  className="border-0 bg-white cursor-pointer"
                  onClick={(e) => updateTodo(e, todo)}
                >
                  <Image
                    src="/images/check.png"
                    width={15}
                    height={15}
                    alt="更新"
                  />
                </button>
                <button
                  className="border-0 bg-white cursor-pointer"
                  onClick={(e) => deleteTodo(e, todo._id)}
                >
                  <Image
                    src="/images/trash.png"
                    width={15}
                    height={15}
                    alt="ゴミ箱"
                  />
                </button>
              </div>
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
    <div className="border-black border-solid mx-2 my-2 min-w-[300px] relative">
      <h2 className="text-center absolute m-0 -top-4 bg-white ml-3">{`${limit}: ${
        todoLimitLength ? todoLimitLength : "0"
      }件`}</h2>
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
