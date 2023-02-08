import { useGetTask } from "@/hooks/useGetTask";
import { auth } from "@/lib/firebase";
import { DatabaseType, Importance, Limit } from "@/types/todo";
import { CheckIcon, Loader, Modal } from "@mantine/core";
import Image from "next/image";
import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { UpdateModalContent } from "./updateModalContent";

export const TodoList = ({
  limit,
  importance,
}: {
  limit: Limit;
  importance: Importance;
}) => {
  const { data } = useGetTask(`
   ${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/tasks
  `);
  const [todoOpened, setTodoOpened] = useState<boolean>(false);
  const [user] = useAuthState(auth);
  const updateTodo = async (e: any, todo: DatabaseType) => {
    await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/tasks/${todo._id}`,
      {
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
      }
    );
    window.location.reload();
  };
  const deleteTodo = async (e: any, id: string) => {
    await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/tasks/${id}`, {
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
                    src="/images/done.svg"
                    width={36}
                    height={20}
                    alt="済"
                    className="absolute"
                  />
                  <p className="m-0 mb-2 ml-6 line-through w-36 relative  mt-2">
                    {todo.task}
                  </p>
                </div>
              ) : (
                <p className="m-0 mb-2 ml-6 w-36 mt-2">{todo.task}</p>
              )}
              <div className="space-x-1 flex">
                <button
                  className="border-0 bg-white cursor-pointer"
                  onClick={(e) => updateTodo(e, todo)}
                >
                  <Image
                    src="/images/check.png"
                    width={15}
                    height={15}
                    alt="完了"
                  />
                </button>
                <Modal
                  opened={todoOpened}
                  onClose={() => setTodoOpened(false)}
                  title={`「${todo.task}」を編集`}
                  centered
                >
                  <UpdateModalContent todo={todo} />
                </Modal>
                <button
                  className="border-0 bg-white cursor-pointer"
                  onClick={() => setTodoOpened(true)}
                >
                  <Image
                    src="/images/change.png"
                    width={20}
                    height={20}
                    alt="編集"
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
  const { data, isLoading } = useGetTask(`
   ${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/tasks
  `);
  const IsMyTask = data?.filter((todo) => todo.userId === user?.email);
  const checkTaskLength = IsMyTask?.filter(
    (todo) => todo.userId === user?.email && todo.limit === limit
  ).length;
  const checkImportance = (importance: string, limit: string) => {
    return IsMyTask?.some(
      (task) => task.importance === importance && task.limit === limit
    );
  };

  return (
    <div className="border-black border-solid mx-2 min-w-[300px] bg-white min-h-[200px]">
      <h2 className="text-center m-0 ml-3 px-1 mt-2">{`${limit}: ${
        checkTaskLength ? checkTaskLength : "0"
      }件`}</h2>
      <ul>
        {isLoading && (
          <li className="mt-5 flex items-center ml-5">
            <Loader />
            <span>Loading...</span>
          </li>
        )}
        <TodoList limit={limit} importance={"高"} />
        {checkImportance("高", limit) ? (
          <div className="border-solid border-0 border-b-2 mx-2 text-sm text-gray-400 border-gray-400">
            ↑優先度「高」
          </div>
        ) : null}
        <TodoList limit={limit} importance={"中"} />
        {checkImportance("中", limit) ? (
          <div className="border-solid border-0 border-b-2 mx-2 text-sm text-gray-400 border-gray-400">
            ↑優先度「中」
          </div>
        ) : null}
        <TodoList limit={limit} importance={"低"} />
        {checkImportance("低", limit) ? (
          <div className="border-solid border-0 border-b-2 mx-2 text-sm text-gray-400 border-gray-400">
            ↑優先度「低」
          </div>
        ) : null}
      </ul>
    </div>
  );
};
