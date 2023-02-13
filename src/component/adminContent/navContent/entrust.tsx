import { useGetRecordByName } from "@/hooks/useGetRecordByName";
import { useRouter } from "next/router";
import { useState } from "react";
import { EntrustModalContent } from "../entrustModalContent";

export const Entrust = () => {
  const router = useRouter();

  const { data } = useGetRecordByName(`${router.query.name}`);
  const [state, setState] = useState(data);

  return (
    <div>
      <h2>タスクを任せる</h2>
      {state?.tasks.map((task) => {
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

            <EntrustModalContent
              id={task._id}
              state={state}
              setState={setState}
            />
          </div>
        );
      })}
    </div>
  );
};
