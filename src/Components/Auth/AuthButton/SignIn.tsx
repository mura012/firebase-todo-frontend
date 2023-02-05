import { Button, Group, Modal } from "@mantine/core";
import { useState } from "react";
import { ModalSignInContent } from "./modalSignInContent";

export const SignIn = () => {
  const [todoOpened, setTodoOpened] = useState<boolean>(false);

  return (
    <>
      <Modal
        opened={todoOpened}
        onClose={() => setTodoOpened(false)}
        title="Googleアカウントでサインイン"
        centered
      >
        <ModalSignInContent />
      </Modal>
      <Group position="center">
        <Button onClick={() => setTodoOpened(true)} color="dark" size="xs">
          サインイン
        </Button>
      </Group>
    </>
  );
};
