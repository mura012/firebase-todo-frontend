import { useGetRecordsByName } from "@/hooks/useGetRecordByName";
import { DatabaseType } from "@/types/todo";
import { Button, Modal } from "@mantine/core";
import { useState } from "react";
import { AddUserModal } from "./addUserModal";

export type Mock = Pick<DatabaseType, "teamUser">;

export const AdminContent = ({
  name,
}: {
  name: string | string[] | undefined;
}) => {
  const [opened, setOpened] = useState(false);
  const { data } = useGetRecordsByName(`myTask/${name}`);
  const teamUser = data?.teamUser;
  const deleteUser = async (id: string) => {
    const newUsers = data?.teamUser?.filter((user) => user._id !== id);

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
            teamUser: newUsers,
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
      <h2>{`現在のユーザー${teamUser?.length}人`}</h2>
      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title="ユーザーを追加"
        centered
      >
        <AddUserModal />
      </Modal>
      <Button onClick={() => setOpened(true)}>ユーザーを追加</Button>
      <ul>
        {teamUser?.map((item) => {
          return (
            <li key={item._id}>
              <p className="m-0 text-lg">{item.name}</p>
              <Button onClick={() => deleteUser(item._id)}>削除</Button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
