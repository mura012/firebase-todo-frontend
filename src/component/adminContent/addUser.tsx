import { useGetRecordByName } from "@/hooks/useGetRecordByName";
import { Button, Dialog, Group, Modal, Text } from "@mantine/core";
import { useState } from "react";
import { AddUserModal } from "./addUserModal";

export const AddUser = ({ name }: { name: string | string[] | undefined }) => {
  const [modalOpened, setModalOpened] = useState(false);
  const [dialogOpened, setDialogOpened] = useState(false);
  const { data } = useGetRecordByName(`myTask/${name}`);
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
    <div className="flex flex-col">
      <h2>{`現在のユーザー${teamUser?.length}人`}</h2>
      <Modal
        opened={modalOpened}
        onClose={() => setModalOpened(false)}
        title="ユーザーを追加"
        centered
      >
        <AddUserModal />
      </Modal>
      <Button onClick={() => setModalOpened(true)}>ユーザーを追加</Button>
      <ul>
        {teamUser?.map((item) => {
          return (
            <li key={item._id} className="flex">
              <div>
                <p className="m-0 text-lg">{item.name}</p>
                <p className="m-0 text-sm text-gray-700">{item.email}</p>
              </div>
              <Group position="center">
                <Button onClick={() => setDialogOpened((o) => !o)}>削除</Button>
              </Group>
              <Dialog
                opened={dialogOpened}
                withCloseButton
                onClose={() => setDialogOpened(false)}
                size="lg"
                radius="md"
              >
                <Text size="sm" style={{ marginBottom: 10 }} weight={500}>
                  本当に削除しても良いですか？
                </Text>

                <Group align="flex-end">
                  <Button onClick={() => deleteUser(item._id)}>削除</Button>
                </Group>
              </Dialog>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
