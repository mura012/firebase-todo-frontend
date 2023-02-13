import { DatabaseType, TeamUser } from "@/types/todo";
import { Button, Input } from "@mantine/core";
import { Dispatch, SetStateAction, useState } from "react";

type User = Pick<TeamUser, "name" | "email">;

type Props = {
  state: DatabaseType | undefined;
  setState: Dispatch<SetStateAction<DatabaseType | undefined>>;
};

export const AddUserModal = ({ state, setState }: Props) => {
  const [newUser, setNewUser] = useState<User>({ name: "", email: "" });
  const addUser = async () => {
    const addUser = [
      state?.teamUser,
      { name: newUser.name, email: newUser.email },
    ].flat();
    setState((prev: any) => {
      return {
        ...prev,
        teamUser: addUser,
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
            teamUser: addUser,
          }),
        }
      );
    } catch (err) {
      console.log(err);
    }
    setNewUser({ name: "", email: "" });
  };
  return (
    <form className="pb-10" onSubmit={(e) => e.preventDefault()}>
      <label>
        <Input.Wrapper label="メンバーの名前">
          <Input
            value={newUser.name}
            onChange={(e) =>
              setNewUser({ name: e.target.value, email: newUser.email })
            }
          />
        </Input.Wrapper>
        <p className="m-0 text-right">{newUser.name.length}/20</p>
      </label>
      <label>
        <Input.Wrapper label="メールアドレス">
          <Input
            value={newUser.email}
            onChange={(e) =>
              setNewUser({
                name: newUser.name,
                email: e.target.value,
              })
            }
          />
        </Input.Wrapper>
      </label>
      <Button
        className="absolute right-3 bottom-3"
        onClick={addUser}
        color="dark"
        size="xs"
        disabled={
          newUser.name && newUser.name.length <= 10 && newUser.email
            ? false
            : true
        }
      >
        追加
      </Button>
    </form>
  );
};
