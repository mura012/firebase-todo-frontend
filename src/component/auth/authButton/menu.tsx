import { auth, provider } from "@/lib/firebase";
import { Button } from "@mantine/core";
import { signInWithPopup } from "firebase/auth";
import Link from "next/link";
import { useRouter } from "next/router";
import { useAuthState } from "react-firebase-hooks/auth";

export const Menu = ({}: {}) => {
  const router = useRouter();
  const [user] = useAuthState(auth);
  const handleSignOut = () => {
    auth.signOut();
  };
  const handleSignIn = () => {
    signInWithPopup(auth, provider);
  };

  return (
    <>
      <Button
        onClick={user ? handleSignOut : handleSignIn}
        className=" text-black hover:bg-blue-300 bg-white w-full"
      >
        <p className="m-0">{user ? "サインアウト" : "サインイン"}</p>
      </Button>

      {user && router.pathname !== "/" && (
        <Button className=" text-black hover:bg-blue-300 bg-white w-full">
          <Link
            href={
              router.route === "/team/[name]"
                ? `/team/${router.query.name}/admin`
                : `/team/${router.query.name}`
            }
            className="text-black no-underline"
          >
            <p className="m-0">{`${
              router.route === "/team/[name]/admin"
                ? "Todo一覧ページ"
                : "管理者画面"
            }へ移動`}</p>
          </Link>
        </Button>
      )}
    </>
  );
};
