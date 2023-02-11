import { useGetRecordByName } from "@/hooks/useGetRecordByName";
import { auth } from "@/lib/firebase";
import { Button, Modal } from "@mantine/core";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Auth } from "../auth/auth";
import { AddTaskModalContent } from "../modalContent/addTaskModalConetn";
import { CreateTeamModalContent } from "../modalContent/createTeamModalContent";

export const Header = () => {
  const [opened, setOpened] = useState<boolean>(false);
  const [user] = useAuthState(auth);
  const router = useRouter();
  const { data } = useGetRecordByName(`${router.query.name}`);

  return (
    <header className="w-full h-20 text-black flex items-center justify-between bg-yellow-200">
      <Link href="/">
        <h1 className="font-bold ml-3 text-lg xs:text-3xl">Todoリスト</h1>
      </Link>
      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title={router.pathname === "/" ? "新しいチームを作成" : "タスクを追加"}
        centered
      >
        {router.pathname === "/" ? (
          <CreateTeamModalContent />
        ) : data?.adminUserEmail === user?.email ? (
          <AddTaskModalContent />
        ) : null}
      </Modal>
      {user ? (
        <Button onClick={() => setOpened(true)} color="dark" size="xs">
          {router.pathname === "/" ? "新しいチームを作成" : "タスクを追加"}
        </Button>
      ) : null}
      <Auth />
    </header>
  );
};
