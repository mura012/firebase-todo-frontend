import { useGetRecordByName } from "@/hooks/useGetRecordByName";
import { Button, Modal } from "@mantine/core";
import { useRouter } from "next/router";
import { useState } from "react";
import { EntrustModalContent } from "./entrustModalContent";

export const Entrust = () => {
  const router = useRouter();
  const { data } = useGetRecordByName(`${router.query.name}`);
  const [modalOpened, setModalOpened] = useState(false);

  return (
    <div>
      {data?.tasks.map((task) => {
        return (
          <div key={task._id}>
            <p className="m-0">{task.task}</p>
            <Modal
              opened={modalOpened}
              onClose={() => setModalOpened(false)}
              title={`「${task.task}」を割り振る`}
              centered
            >
              <EntrustModalContent id={task._id} data={data} task={task.task} />
            </Modal>
            <Button onClick={() => setModalOpened(true)} color="dark" size="xs">
              タスクを割り振る
            </Button>
          </div>
        );
      })}
    </div>
  );
};
