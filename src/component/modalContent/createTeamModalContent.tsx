import { auth } from "@/lib/firebase";
import { Input, Button } from "@mantine/core";
import { useRouter } from "next/router";
import { ComponentProps, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

export const CreateTeamModalContent = () => {
  const [name, setName] = useState<string>("");
  const [user] = useAuthState(auth);
  const router = useRouter();

  const createTask: ComponentProps<"form">["onSubmit"] = async (e) => {
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
      router.push(`/task/${name}`);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <form className="pb-10" onSubmit={createTask}>
        <label>
          <Input.Wrapper
            description="20文字以内で入力してください"
            label="名前"
          >
            <Input
              placeholder="案件"
              className="mb-3"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Input.Wrapper>
          <p className="mb-1 -mt-2 text-right">{name.length}/20</p>
        </label>
        <Button
          className="absolute right-8 bottom-3"
          disabled={name && name.length <= 20 ? false : true}
          type="submit"
        >
          追加
        </Button>
      </form>
    </>
  );
};
