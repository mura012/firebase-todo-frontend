import { auth } from "@/lib/firebase";
import { Button } from "@mantine/core";
import { ComponentProps, Dispatch, SetStateAction } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

export const SignOut = ({
  setProfileOpened,
}: {
  setProfileOpened: Dispatch<SetStateAction<boolean>>;
}) => {
  const [user] = useAuthState(auth);
  const handleSignOut = () => {
    setProfileOpened(false);
    auth.signOut();
  };
  const handleAllDelete: ComponentProps<"button">["onClick"] = async (e) => {
    e.preventDefault();
    try {
      await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/tasks/all`, {
        method: "delete",
        // ↓忘れていたので注意
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: user?.email,
        }),
      });
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <Button
        onClick={handleSignOut}
        className=" text-black hover:bg-blue-300 bg-white w-full"
      >
        <p className="m-0">サインアウト</p>
      </Button>
      <Button
        onClick={handleAllDelete}
        className=" text-black hover:bg-blue-300 bg-white w-full"
      >
        <p className="m-0">タスクをすべて削除</p>
      </Button>
    </>
  );
};
