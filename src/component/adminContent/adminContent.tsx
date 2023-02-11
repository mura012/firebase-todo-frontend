import { SegmentedControl } from "@mantine/core";
import { useState } from "react";
import { AddUser } from "./addUser";
import { DeleteTeam } from "./deleteTeam";
import { Entrust } from "./entrust";

export const AdminContent = ({
  name,
}: {
  name: string | string[] | undefined;
}) => {
  const [selected, setSelected] = useState("add");

  return (
    <div className="flex flex-col max-w-md">
      <SegmentedControl
        value={selected}
        onChange={setSelected}
        data={[
          { label: "ユーザーを追加", value: "add" },
          { label: "タスクを任せる", value: "entrust" },
          { label: "チームを削除", value: "delete" },
        ]}
      />
      {selected === "add" && <AddUser name={name} />}
      {selected === "entrust" && <Entrust />}
      {selected === "delete" && <DeleteTeam />}
    </div>
  );
};
