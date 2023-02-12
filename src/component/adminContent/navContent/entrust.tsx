import { useGetRecordByName } from "@/hooks/useGetRecordByName";
import { useRouter } from "next/router";
import { EntrustModalContent } from "../entrustModalContent";

export const Entrust = () => {
  const router = useRouter();
  const { data } = useGetRecordByName(`${router.query.name}`);

  return (
    <div>
      <h2>タスクを任せる</h2>
      {data?.tasks.map((task) => {
        return (
          <div
            key={task._id}
            className="flex justify-between items-center my-1 border-solid border-0 border-b pb-1"
          >
            <p className="m-0 text-lg">{task.task}</p>
            {task.workingUserName && (
              <div className="flex flex-col justify-center items-center">
                <p className="m-0 text-xs">作業中</p>
                <p className="m-0 text-sm">{task.workingUserName}</p>
              </div>
            )}

            <EntrustModalContent id={task._id} data={data} />
          </div>
        );
      })}
    </div>
  );
};
