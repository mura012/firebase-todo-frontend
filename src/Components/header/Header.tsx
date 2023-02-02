import { Modal } from "@mantine/core";
import { Button } from "@mantine/core/";
import { Group } from "@mantine/core/";
import { useState } from "react";
import { Auth } from "../Auth/auth";

import { ModalContent } from "./ModalContent";

export const Header = () => {
  const [taskOpened, setTaskOpened] = useState<boolean>(false);
  return (
    <header className="w-full h-20 text-black flex items-center justify-around">
      <p>hedda</p>
      <div className="flex space-x-3 items-center">
        <Modal
          opened={taskOpened}
          onClose={() => setTaskOpened(false)}
          title="タスクを追加"
          centered
        >
          <ModalContent />
        </Modal>

        <Group position="center">
          <Button onClick={() => setTaskOpened(true)}>タスクを追加</Button>
        </Group>
        <Auth />
      </div>
    </header>
  );
};
