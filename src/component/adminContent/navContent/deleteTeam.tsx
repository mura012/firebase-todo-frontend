import { useGetRecordByName } from "@/hooks/useGetRecordByName";
import { Button, Modal } from "@mantine/core";
import { useRouter } from "next/router";
import { useState } from "react";

export const DeleteTeam = () => {
  const [opened, setOpened] = useState(false);
  const router = useRouter();
  const { data } = useGetRecordByName(`${router.query.name}`);
  const deleteTeam = () => {
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/all`, {
      method: "delete",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        _id: data?._id,
      }),
    });
    router.push("/");
  };
  return (
    <>
      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        centered
        title="本当に削除しても良いですか？"
      >
        <Button onClick={deleteTeam} color="dark" size="xs">
          削除
        </Button>
      </Modal>
      <Button onClick={() => setOpened(true)} color="dark" size="xs">
        {`「${router.query.name}」を削除`}
      </Button>
    </>
  );
};
