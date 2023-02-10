import { useGetRecordByName } from "@/hooks/useGetRecordByName";
import { auth } from "@/lib/firebase";
import { Importance, Limit, Tasks } from "@/types/todo";
import { Modal } from "@mantine/core";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Loading } from "../loading";
import { UpdateModalContent } from "../modalContent/updateModalContent";

export const TodoList = ({
  limit,
  importance,
}: {
  limit: Limit;
  importance: Importance;
}) => {
  const router = useRouter();
  const [todoOpened, setTodoOpened] = useState<boolean>(false);
  const { data } = useGetRecordByName(`myTask/${router.query.name}`);
  const updateTodo = async (e: any, todo: Tasks) => {
    e.preventDefault();
    const prevData = data?.tasks?.filter((task) => task._id !== todo._id);

    const newData = [
      prevData,
      {
        task: todo.task,
        limit: todo.limit,
        importance: todo.importance,
        isDone: todo.isDone ? false : true,
        _id: todo._id,
      },
    ].flat();
    try {
      await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/update/${data?._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...data,
            tasks: newData,
          }),
        }
      );
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };
  const deleteTodo = async (e: any, todo: Tasks) => {
    e.preventDefault();
    const prevData = data?.tasks?.filter((task) => task._id !== todo._id);

    try {
      await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/update/${data?._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...data,
            tasks: prevData,
          }),
        }
      );
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      {data?.tasks
        ?.filter(
          (todo) => todo.importance === importance && todo.limit === limit
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
                <p className="m-0 mb-2 ml-6 max-w-[130px] mt-2">{todo.task}</p>
              )}
              <div className="flex">
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
                  onClick={(e) => deleteTodo(e, todo)}
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
  const router = useRouter();
  const { data, isLoading } = useGetRecordByName(`myTask/${router.query.name}`);

  const checkTaskLength = data?.tasks.filter(
    (todo) => todo.limit === limit
  ).length;
  const checkImportance = (importance: string, limit: string) => {
    return data?.tasks.some(
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
            <Loading />
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
