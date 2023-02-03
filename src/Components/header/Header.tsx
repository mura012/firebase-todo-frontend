import { Modal } from "@mantine/core";
import { Button } from "@mantine/core/";
import { Group } from "@mantine/core/";
import { useState } from "react";
import { Auth } from "../auth/auth";

import { ModalContent } from "./modalContent";

export const Header = () => {
  const [todoOpened, setTodoOpened] = useState<boolean>(false);
  return (
    <header className="w-full h-20 text-black flex items-center justify-around">
      <p>hedda</p>
      <div className="flex space-x-3 items-center">
        <Modal
          opened={todoOpened}
          onClose={() => setTodoOpened(false)}
          title="タスクを追加"
          centered
        >
          <ModalContent />
        </Modal>

        <Group position="center">
          <Button onClick={() => setTodoOpened(true)}>タスクを追加</Button>
        </Group>
        <Auth />
      </div>
    </header>
  );
};
