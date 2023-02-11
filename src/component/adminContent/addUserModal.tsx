import { useGetRecordByName } from "@/hooks/useGetRecordByName";
import { TeamUser } from "@/types/todo";
import { Button, Input } from "@mantine/core";
import { useRouter } from "next/router";
import { useState } from "react";

type User = Pick<TeamUser, "name" | "email">;

export const AddUserModal = () => {
  const [newUser, setNewUser] = useState<User>({ name: "", email: "" });
  const router = useRouter();
  const { data } = useGetRecordByName(`${router.query.name}`);
  const addUser = async () => {
    const addUser = [
      data?.teamUser,
      { name: newUser.name, email: newUser.email },
    ].flat();

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
            teamUser: addUser,
          }),
        }
      );
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
    setNewUser({ name: "", email: "" });
  };
  return (
    <form className="pb-10" onSubmit={(e) => e.preventDefault()}>
      <label>
        <Input.Wrapper label="ユーザー名">
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
