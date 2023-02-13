import { SegmentedControl } from "@mantine/core";
import { useState } from "react";
import { AddUser } from "./navContent/addUser";
import { DeleteList } from "./navContent/deleteList";
import { Entrust } from "./navContent/entrust";

export const AdminContent = ({
  name,
}: {
  name: string | string[] | undefined;
}) => {
  const [selected, setSelected] = useState("add");

  return (
    <div className="flex flex-col max-w-md bg-gray-200 px-2">
      <SegmentedControl
        value={selected}
        onChange={setSelected}
        data={[
          { label: "メンバーを追加", value: "add" },
          { label: "タスクを任せる", value: "entrust" },
          { label: "リストを削除", value: "delete" },
        ]}
      />
      {selected === "add" && <AddUser name={name} />}
      {selected === "entrust" && <Entrust />}
      {selected === "delete" && <DeleteList />}
    </div>
  );
};
