import { auth } from "@/lib/firebase";
import { Modal } from "@mantine/core";
import { Button } from "@mantine/core/";
import { Group } from "@mantine/core/";
import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Auth } from "../auth/auth";
import { AddTaskModalContent } from "./addTaskModalContent";

export const Header = () => {
  const [todoOpened, setTodoOpened] = useState<boolean>(false);
  const [user] = useAuthState(auth);
  return (
    <header className="w-full h-20 text-black flex items-center justify-between">
      <h1 className="font-bold mx-3">Todoリスト</h1>
      <Modal
        opened={todoOpened}
        onClose={() => setTodoOpened(false)}
        title={user ? "タスクを追加" : "Googleアカウントでサインイン"}
        centered
      >
        <AddTaskModalContent />
      </Modal>
      <Group position="center">
        <Button onClick={() => setTodoOpened(true)}>
          {user ? "タスクを追加" : "サインイン"}
        </Button>
      </Group>
      <Auth />
    </header>
  );
};
