import { useGetRecordByName } from "@/hooks/useGetRecordByName";
import { Button, Modal } from "@mantine/core";
import { useState } from "react";
import { AddUserModal } from "./addUserModal";

export const AddUser = ({ name }: { name: string | string[] | undefined }) => {
  const [modalOpened, setModalOpened] = useState(false);
  const { data } = useGetRecordByName(`${name}`);
  const [state, setState] = useState(data);
  const deleteUser = async (email: string) => {
    const newUsers = state?.teamUser?.filter((user) => user.email !== email);
    setState((prev: any) => {
      return {
        ...prev,
        teamUser: newUsers,
      };
    });

    try {
      await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/update/${state?._id}`,
        {
          method: "PATCH",
          // ↓忘れていたので注意
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...state,
            teamUser: newUsers,
          }),
        }
      );
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="flex flex-col">
      <h2>{`メンバー${state?.teamUser?.length}人`}</h2>
      <Modal
        opened={modalOpened}
        onClose={() => setModalOpened(false)}
        title="メンバー"
        centered
      >
        <AddUserModal state={state} setState={setState} />
      </Modal>
      <Button onClick={() => setModalOpened(true)} color="dark" size="xs">
        メンバーを追加
      </Button>
      <ul>
        {state?.teamUser?.map((item) => {
          return (
            <li
              key={item.email}
              className="flex justify-between border-solid border-0 border-b pb-1"
            >
              <div>
                <p className="m-0 text-lg">{item.name}</p>
                <p className="m-0 text-sm text-gray-700">{item.email}</p>
              </div>
              <div className="flex justify-center">
                <Button
                  onClick={() => deleteUser(item.email)}
                  color="dark"
                  size="xs"
                >
                  削除
                </Button>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
