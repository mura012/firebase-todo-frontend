import { SignIn } from "../auth/authButton/signIn";

export const NoAdmin = () => {
  return (
    <div className="flex justify-center items-center flex-col">
      <h1>このページは管理者権限がないと操作できません。</h1>
      <div className="flex">
        <h2 className="mr-2">サインインをしてください</h2>
        <SignIn />
      </div>
    </div>
  );
};
