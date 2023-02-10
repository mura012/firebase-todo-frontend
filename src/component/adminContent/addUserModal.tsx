import { useGetRecordsByName } from "@/hooks/useGetRecordByName";
import { TeamUser } from "@/types/todo";
import { Button, Input } from "@mantine/core";
import { useRouter } from "next/router";
import { useState } from "react";

type User = Pick<TeamUser, "name" | "email">;

export const AddUserModal = () => {
  const [newUser, setNewUser] = useState<User>({ name: "", email: "" });
  const router = useRouter();
  const { data } = useGetRecordsByName(`myTask/${router.query.name}`);
  const addUser = async () => {
    const addUser = [
      data?.teamUser,
      { name: newUser.name, email: newUser.email },
    ].flat();

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
            teamUser: addUser,
          }),
        }
      );
      // window.location.reload();
    } catch (err) {
      console.log(err);
    }
    setNewUser({ name: "", email: "" });
  };
  return (
    <form className="pb-10">
      <label>
        <span>ユーザー名</span>
        <Input
          value={newUser.name}
          onChange={(e) =>
            setNewUser({ name: e.target.value, email: newUser.email })
          }
        />
      </label>
      <label>
        <span>メールアドレス</span>
        <Input
          value={newUser.email}
          onChange={(e) =>
            setNewUser({
              name: newUser.name,
              email: e.target.value,
            })
          }
        />
      </label>
      <Button className="absolute right-3 bottom-3" onClick={addUser}>
        追加
      </Button>
    </form>
  );
};
