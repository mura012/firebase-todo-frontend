import { auth } from "@/lib/firebase";
import Image from "next/image";
import { useState } from "react";
import { Menu } from "./authButton/menu";

export const Auth = () => {
  const [profileOpened, setProfileOpened] = useState<boolean>(false);

  return (
    <>
      <div className="relative">
        {auth.currentUser && auth.currentUser.photoURL ? (
          <Image
            src={auth.currentUser.photoURL}
            width={50}
            height={50}
            alt="icon"
            className="rounded-full flex mr-3"
            onClick={(e) => {
              e.preventDefault();
              setProfileOpened(!profileOpened);
            }}
          />
        ) : (
          <Image
            src="/images/defaultIcon.png"
            width={50}
            height={40}
            alt="icon"
            className="rounded-full flex mr-3"
            onClick={(e) => {
              e.preventDefault();
              setProfileOpened(!profileOpened);
            }}
          />
        )}
        {profileOpened && (
          <div className="absolute right-0 z-50 bg-white border-solid border-black rounded-md min-w-[150px]">
            {auth.currentUser && auth.currentUser.photoURL ? (
              <div className="flex items-center mt-1 ml-3">
                <Image
                  src={auth.currentUser.photoURL}
                  width={40}
                  height={40}
                  alt="icon"
                  className="rounded-full flex"
                />
                <span className="ml-1">{auth.currentUser.displayName}</span>
              </div>
            ) : null}
            <Menu />
          </div>
        )}
      </div>
    </>
  );
};
