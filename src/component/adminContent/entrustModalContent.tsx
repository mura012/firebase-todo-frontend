import { DatabaseType, TeamUser } from "@/types/todo";
import { Button, Radio } from "@mantine/core";
import { useState } from "react";

type Props = {
  id: string;
  data: DatabaseType;
  task: string;
};

export const EntrustModalContent = ({ id, data, task }: Props) => {
  const [workUser, setWorkUser] = useState("");
  const entrustUser = async (id: string, workUser: string) => {
    const newTasks = data?.tasks?.map((user) => {
      if (user._id === id) {
        return {
          ...user,
          workingUserName: workUser,
        };
      }
      return user;
    });

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
            tasks: newTasks,
          }),
        }
      );
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      <form>
        <label>
          <Radio.Group
            description="誰にこのタスクを振り分けますか？"
            className="mb-3"
            onChange={setWorkUser}
            label={task}
          >
            {data?.teamUser?.map((item) => {
              return (
                <Radio
                  value={item.name}
                  label={item.name}
                  key={item._id}
                  color="dark"
                />
              );
            })}
            <Radio value="" label="割り振らない" color="dark" />
          </Radio.Group>
        </label>
        <Button
          onClick={() => entrustUser(id, workUser)}
          color="dark"
          size="xs"
        >
          割り振る
        </Button>
      </form>
    </div>
  );
};
