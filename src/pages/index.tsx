import { MyTasks } from "@/component/myTasks";
import { Layout } from "@/layout/layout";
import { auth } from "@/lib/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

const Home = () => {
  const [user] = useAuthState(auth);
  return (
    <Layout title="todo">
      <main className="flex w-screen flex-wrap justify-center">
        {user ? <MyTasks /> : null}
      </main>
    </Layout>
  );
};

export default Home;
