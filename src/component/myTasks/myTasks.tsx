import { useGetRecordsByEmail } from "@/hooks/useGetRecordsByEmail";
import { auth } from "@/lib/firebase";
import { TeamUser, Todo } from "@/types/todo";
import { Button, Input } from "@mantine/core";
import Link from "next/link";
import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

export const MyTasks = () => {
  const [user] = useAuthState(auth);
  const [email, setEmail] = useState<string>("");
  const [adminData, setAdminData] = useState([]);
  const { data } = useGetRecordsByEmail(`myTasks/${user?.email}`);
  const handleSearch = async () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const data = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/adminTasks/${email}`
    );
    const json = await data.json();
    setAdminData(json);
  };
  return (
    <div className="bg-gray-100 flex flex-col">
      <>
        <p>あなたが作成したチーム</p>
        {data?.map((task) => {
          return (
            <Link key={task._id} href={`/team/${task.name}`}>
              {task.name}
            </Link>
          );
        })}
        <form>
          <label>
            <span>メールアドレス</span>
            <Input
              placeholder="exsample@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <Button onClick={handleSearch}>検索</Button>
        </form>
        {adminData.map((item: Todo) => {
          return item.teamUser?.map((team: TeamUser) => {
            return team.email === user?.email ? (
              <Link key={team._id} href={`/team/${item.name}`}>
                {item.name}
              </Link>
            ) : null;
          });
        })}
      </>
    </div>
  );
};
