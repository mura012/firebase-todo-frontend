import { useState } from "react";
import { AddUser } from "./addUser";
import { AdminNavMenu } from "./adminNavMenu";
import { DeleteTeam } from "./deleteTeam";

export type Nav = {
  id: number;
  label: string;
  isSelected: boolean;
};

const nav: Nav[] = [
  { id: 1, label: "ユーザーを追加", isSelected: true },
  { id: 2, label: "チームを削除", isSelected: false },
];

export const AdminContent = ({
  name,
}: {
  name: string | string[] | undefined;
}) => {
  const [navBar, setNavBar] = useState(nav);

  return (
    <div className="flex">
      <AdminNavMenu navBar={navBar} setNavBar={setNavBar} />
      {navBar[0].isSelected && <AddUser name={name} />}
      {navBar[1].isSelected && <DeleteTeam />}
    </div>
  );
};
