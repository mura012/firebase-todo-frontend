import { auth } from "@/lib/firebase";
import { Button } from "@mantine/core";
import { Dispatch, SetStateAction } from "react";

export const SignOut = ({
  setProfileOpened,
}: {
  setProfileOpened: Dispatch<SetStateAction<boolean>>;
}) => {
  const handleSignOut = () => {
    setProfileOpened(false);
    auth.signOut();
  };
  return (
    <>
      <Button
        onClick={handleSignOut}
        className=" text-black hover:bg-blue-300 bg-white"
      >
        <p className="m-0">サインアウト</p>
      </Button>
    </>
  );
};
