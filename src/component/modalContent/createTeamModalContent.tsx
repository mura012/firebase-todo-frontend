import { auth } from "@/lib/firebase";
import { Input, Button } from "@mantine/core";
import { ComponentProps, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

export const CreateTeamModalContent = () => {
  const [name, setName] = useState<string>("");
  const [user] = useAuthState(auth);

  const createTask: ComponentProps<"button">["onClick"] = async (e) => {
    e.preventDefault();
    try {
      await fetch(process.env.NEXT_PUBLIC_BACKEND_API_URL, {
        method: "POST",
        // ↓忘れていたので注意
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          adminUserName: user?.displayName,
          adminUserEmail: user?.email,
          adminUserPhoto: user?.photoURL,
          tasks: [],
          teamUser: [],
        }),
      });
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <form className="pb-10">
        <label>
          <span>名前</span>
          <Input.Wrapper description="20文字以内で入力してください">
            <Input
              placeholder="案件"
              className="mb-3"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Input.Wrapper>
          <p className="mb-1 -mt-2 text-right">{name.length}/20</p>
        </label>
        {/* <label>
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
            <Radio value="低" label="低" />
          </Radio.Group>
        </label> */}
        <Button
          className="absolute right-8 bottom-3"
          onClick={createTask}
          disabled={name && name.length <= 20 ? false : true}
        >
          追加
        </Button>
      </form>
    </>
  );
};
