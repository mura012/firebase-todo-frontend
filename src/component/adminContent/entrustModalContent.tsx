import { auth } from "@/lib/firebase";
import { DatabaseType } from "@/types/todo";
import { Button, Select } from "@mantine/core";
import { Dispatch, SetStateAction, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

type Props = {
  id: string;
  state: DatabaseType | undefined;
  setState: Dispatch<SetStateAction<DatabaseType | undefined>>;
};

export const EntrustModalContent = ({ id, state, setState }: Props) => {
  const [workUser, setWorkUser] = useState<string | null>(null);
  const [user] = useAuthState(auth);
  const entrustUser = async (
    id: string,
    workUser: string | null | undefined
  ) => {
    const newTasks = state?.tasks?.map((user) => {
      if (user._id === id) {
        return {
          ...user,
          workingUserName: workUser,
        };
      }
      return user;
    });
    setState((prev: any) => {
      return {
        ...prev,
        tasks: newTasks,
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
            tasks: newTasks,
          }),
        }
      );
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="relative mb-8">
      {state?.teamUser && (
        <>
          <Select
            data={state.teamUser.map((item) => {
              return { value: item.name, label: item.name };
            })}
            className="w-28"
            value={workUser}
            onChange={setWorkUser}
          />
          <div className="absolute right-0 flex">
            <Button
              onClick={() => entrustUser(id, user?.displayName)}
              color="dark"
              size="xs"
              className="p-2 mr-1"
            >
              自分
            </Button>
            <Button
              onClick={() => entrustUser(id, workUser)}
              color="dark"
              size="xs"
              className="p-2"
              disabled={workUser ? false : true}
            >
              任せる
            </Button>
          </div>
        </>
      )}
    </div>
  );
};
