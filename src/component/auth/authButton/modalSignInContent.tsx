import { auth, provider } from "@/lib/firebase";
import { Button, Group } from "@mantine/core";
import { signInWithPopup } from "firebase/auth";
import Image from "next/image";

export const ModalSignInContent = () => {
  const handleSignIn = () => {
    signInWithPopup(auth, provider);
  };
  return (
    <Button
      onClick={handleSignIn}
      className="bg-white text-black shadow-lg border-solid border-black hover:bg-white"
    >
      <Image src="/googleLogo.png" width={30} height={30} alt="G" />
      <p className="ml-4">Sign in with Google</p>
    </Button>
  );
};
