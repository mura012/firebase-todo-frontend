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
  // const handleAllDelete: ComponentProps<"button">["onClick"] = async (e) => {
  //   e.preventDefault();
  //   try {
  //     await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/tasks/all`, {
  //       method: "delete",
  //       // ↓忘れていたので注意
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         userId: user?.email,
  //       }),
  //     });
  //     window.location.reload();
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };
  return (
    <>
      <Button
        onClick={user ? handleSignOut : handleSignIn}
        className=" text-black hover:bg-blue-300 bg-white w-full"
      >
        <p className="m-0">{user ? "サインアウト" : "サインイン"}</p>
      </Button>
      {/* <Button
        onClick={handleAllDelete}
        className=" text-black hover:bg-blue-300 bg-white w-full"
      >
        <p className="m-0">タスクをすべて削除</p>
      </Button> */}
      {user && (
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
