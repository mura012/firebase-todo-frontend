import { useGetRecordByEmail } from "@/hooks/useGetRecordByEmail";
import { auth } from "@/lib/firebase";
import { TeamUser, Todo } from "@/types/todo";
import { Button, Input } from "@mantine/core";
import Link from "next/link";
import { ComponentProps, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Loading } from "../loading";

export const MyTasks = () => {
  const [user] = useAuthState(auth);
  const [email, setEmail] = useState<string>("");
  const [adminData, setAdminData] = useState([]);
  const { data, isLoading } = useGetRecordByEmail(`${user?.email}`);
  const handleSearch: ComponentProps<"form">["onSubmit"] = async (e) => {
    e.preventDefault();
    const data = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/adminTasks/${email}`
    );
    const json = await data.json();
    setAdminData(json);
  };

  return (
    <div className="bg-gray-100 flex flex-col w-1/4">
      <h2 className="ml-5">あなたが作成したチーム</h2>
      {isLoading ? <Loading /> : null}
      {data?.map((task) => {
        return (
          <Link
            key={task._id}
            href={`/task/${task.name}`}
            className="mx-5 before:content-['▶'] my-1 hover:bg-gray-200 p-1"
          >
            {task.name}
          </Link>
        );
      })}
      <form onSubmit={handleSearch} className="relative mb-12">
        <label>
          <Input.Wrapper
            label="メールアドレス"
            description="リーダーのメールアドレスを検索"
            className="mx-5"
          >
            <Input
              placeholder="exsample@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Input.Wrapper>
        </label>
        <Button
          type="submit"
          className="absolute right-5 mt-1"
          color="dark"
          size="xs"
        >
          検索
        </Button>
      </form>
      {adminData.map((item: Todo) => {
        return item.teamUser?.map((team: TeamUser) => {
          return team.email === user?.email ? (
            <Link
              key={team._id}
              href={`/task/${item.name}`}
              className="before:content-['▶'] my-1 hover:bg-gray-200 mx-5 p-1"
            >
              {item.name}
            </Link>
          ) : null;
        });
      })}
    </div>
  );
};
