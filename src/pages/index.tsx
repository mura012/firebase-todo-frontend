import { SignIn } from "@/component/auth/authButton/signIn";
import { Loading } from "@/component/loading";
import { MyTasks } from "@/component/myTasks";
import { Layout } from "@/layout/layout";
import { auth } from "@/lib/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

const Home = () => {
  const [user, loading] = useAuthState(auth);
  if (loading) {
    return (
      <Layout title="ホーム">
        <main className="flex w-screen flex-wrap justify-center">
          <Loading />
        </main>
      </Layout>
    );
  }
  if (!user) {
    return (
      <Layout title="ホーム">
        <main>
          <h2>Googleでサインインしてください</h2>
          <SignIn />
        </main>
      </Layout>
    );
  }
  return (
    <Layout title="ホーム">
      <main className="flex w-screen flex-wrap justify-center">
        <MyTasks />
      </main>
    </Layout>
  );
};

export default Home;
