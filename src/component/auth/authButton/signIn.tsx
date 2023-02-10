import { auth } from "@/lib/firebase";
import { Button, Group, Modal } from "@mantine/core";
import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { ModalSignInContent } from "./modalSignInContent";

export const SignIn = () => {
  const [user] = useAuthState(auth);
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
