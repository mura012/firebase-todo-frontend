import { Button } from "@mantine/core";
import { Dispatch, SetStateAction } from "react";
import { Nav } from "./adminContent";

type Props = {
  navBar: Nav[];
  setNavBar: Dispatch<SetStateAction<Nav[]>>;
};

export const AdminNavMenu = ({ navBar, setNavBar }: Props) => {
  const handleChange = (label: string) => {
    setNavBar((prev) => {
      return prev.map((item) => {
        if (item.label === label) {
          return { id: item.id, label: item.label, isSelected: true };
        }
        return { ...item, isSelected: false };
      });
    });
  };
  return (
    <ul className="mr-2 list-none">
      {navBar.map((item) => {
        return (
          <li key={item.id} className="before:content-['▶']">
            <Button
              className="p-0 min-w-[120px] bg-inherit text-black hover:bg-inherit font-normal"
              onClick={() => handleChange(item.label)}
            >
              {item.label}
            </Button>
          </li>
        );
      })}
    </ul>
  );
};
