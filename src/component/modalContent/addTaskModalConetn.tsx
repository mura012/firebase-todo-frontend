import { useGetRecordByName } from "@/hooks/useGetRecordByName";
import { auth } from "@/lib/firebase";
import { Input, Button, Radio } from "@mantine/core";
import { useRouter } from "next/router";
import { ComponentProps, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

export const AddTaskModalContent = () => {
  const router = useRouter();
  const [task, setTask] = useState<string>("");
  const [limit, setLimit] = useState("今日中");
  const [importance, setImportance] = useState("高");
  const [user] = useAuthState(auth);
  const { data } = useGetRecordByName(`myTask/${router.query.name}`);
  const addTask: ComponentProps<"button">["onClick"] = async (e) => {
    const newTasks = [data?.tasks, { task, limit, importance, isDone: false }];

    e.preventDefault();
    try {
      await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/add/${data?._id}`,
        {
          method: "PATCH",
          // ↓忘れていたので注意
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...data,
            tasks: newTasks.flat(),
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
      <form className="pb-10" onSubmit={(e) => e.preventDefault()}>
        <label>
          <Input.Wrapper
            label="タスク"
            description="20文字以内で入力してください"
          >
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
          <Radio.Group
            description="このタスクはいつまでに行わなければいけませんか？"
            className="mb-3"
            value={limit}
            onChange={setLimit}
            label="リミット"
          >
            <Radio value="今日中" label="今日中" />
            <Radio value="今週中" label="今週中" />
            <Radio value="今月中" label="今月中" />
            <Radio value="継続" label="継続" />
          </Radio.Group>
        </label>
        <label>
          <Radio.Group
            description="このタスクの優先度はどれくらいですか？"
            defaultValue="高"
            value={importance}
            onChange={setImportance}
            label="優先度"
          >
            <Radio value="高" label="高" />
            <Radio value="中" label="中" />
            <Radio value="低" label="低" />
          </Radio.Group>
        </label>
        <Button
          className="absolute right-8 bottom-3"
          onClick={addTask}
          disabled={task && task.length <= 20 ? false : true}
        >
          追加
        </Button>
      </form>
    </>
  );
};
