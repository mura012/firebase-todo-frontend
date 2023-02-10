import { MyTasks } from "@/component/myTasks";
import { Layout } from "@/layout/layout";

const Home = () => {
  return (
    <Layout title="todo">
      <main className="flex w-screen flex-wrap justify-center">
        <MyTasks />
      </main>
    </Layout>
  );
};

export default Home;
