import { auth, provider } from "@/lib/firebase";
import { Button } from "@mantine/core";
import { signInWithPopup } from "firebase/auth";
import Image from "next/image";
import { useRouter } from "next/router";

export const ModalSignInContent = () => {
  const router = useRouter();
  const handleSignIn = () => {
    signInWithPopup(auth, provider);
    router.push("/");
  };
  return (
    <Button
      onClick={handleSignIn}
      className="bg-white text-black shadow-lg border-solid border-black hover:bg-white"
      color="dark"
      size="xs"
    >
      <Image src="/images/googleLogo.png" width={30} height={30} alt="G" />
      <p className="ml-4">Sign in with Google</p>
    </Button>
  );
};
