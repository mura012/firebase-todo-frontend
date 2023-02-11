import { useGetRecordByName } from "@/hooks/useGetRecordByName";
import { auth } from "@/lib/firebase";
import { Tasks } from "@/types/todo";
import { Button, Input, Radio } from "@mantine/core";
import { useRouter } from "next/router";
import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { ModalSignInContent } from "../auth/authButton/modalSignInContent";

type Props = {
  e: any;
  id: string;
};

export const UpdateModalContent = ({ todo }: { todo: Tasks }) => {
  const [task, setTask] = useState<string>(todo.task);
  const [limit, setLimit] = useState<string>(todo.limit);
  const [importance, setImportance] = useState<string>(todo.importance);
  const [user] = useAuthState(auth);
  const router = useRouter();
  const { data } = useGetRecordByName(`${router.query.name}`);
  const updateTask = async ({ e, id }: Props) => {
    e.preventDefault();
    const prevData = await data?.tasks?.filter((task) => task._id !== id);
    const newData = [
      prevData,
      {
        task,
        limit,
        importance,
        isDone: todo.isDone,
        workingUserName: todo.workingUserName,
        _id: todo._id,
      },
    ].flat();
    try {
      await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/update/${data?._id}`,
        {
          method: "PATCH",
          // ↓忘れていたので注意
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

  return (
    <>
      {user ? (
        <form className="pb-10" onSubmit={(e) => e.preventDefault()}>
          <label>
            <span>タスク</span>
            <Input.Wrapper description="20文字以内で入力してください">
              <Input
                placeholder="勉強"
                className="mb-3"
                value={task}
                onChange={(e) => setTask(e.target.value)}
              />
            </Input.Wrapper>
            <p className="mb-1 -mt-2 text-right">{task.length}/20</p>
          </label>
          <label>
            <span>リミット</span>
            <Radio.Group
              description="このタスクはいつまでに行わなければいけませんか？"
              className="mb-3"
              value={limit}
              onChange={setLimit}
            >
              <Radio color="dark" value="今日中" label="今日中" />
              <Radio color="dark" value="今週中" label="今週中" />
              <Radio color="dark" value="今月中" label="今月中" />
              <Radio color="dark" value="継続" label="継続" />
            </Radio.Group>
          </label>
          <label>
            <span>優先度</span>
            <Radio.Group
              description="このタスクの優先度はどれくらいですか？"
              defaultValue="高"
              value={importance}
              onChange={setImportance}
            >
              <Radio color="dark" value="高" label="高" />
              <Radio color="dark" value="中" label="中" />
              <Radio color="dark" value="低" label="低" />
            </Radio.Group>
          </label>
          <Button
            className="absolute right-8 bottom-3"
            onClick={(e) => updateTask({ e, id: todo._id })}
            disabled={task && task.length <= 20 ? false : true}
            color="dark"
            size="xs"
          >
            編集
          </Button>
        </form>
      ) : (
        <ModalSignInContent />
      )}
    </>
  );
};
