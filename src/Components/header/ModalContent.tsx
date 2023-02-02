import { auth } from "@/lib/firebase";
import { Input, Radio, Button } from "@mantine/core";
import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

export const ModalContent = () => {
  const [task, setTask] = useState<string>("");
  const [limit, setLimit] = useState<string>("今日中");
  const [importance, setImportance] = useState<string>("高");
  const [user] = useAuthState(auth);
  console.log(user);

  const handleClick = (e: any) => {
    e.preventDefault();
    console.log({ task, limit, importance, id: auth.currentUser?.email });
  };
  return (
    <>
      <form className="pb-10">
        <label>
          <span>タスク</span>
          <Input
            placeholder="勉強"
            className="mb-3"
            value={task}
            onChange={(e) => setTask(e.target.value)}
          />
        </label>
        <label>
          <span>リミット</span>
          <Radio.Group
            description="このタスクはいつまでに行わなければいけませんか？"
            className="mb-3"
            value={limit}
            onChange={setLimit}
          >
            <Radio value="今日中" label="今日中" />
            <Radio value="今週中" label="今週中" />
            <Radio value="今月中" label="今月中" />
            <Radio value="継続" label="継続" />
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
            <Radio value="高" label="高" />
            <Radio value="中" label="中" />
            <Radio value="下" label="下" />
          </Radio.Group>
        </label>
        <Button className="absolute right-8 bottom-3" onClick={handleClick}>
          追加
        </Button>
      </form>
    </>
  );
};
