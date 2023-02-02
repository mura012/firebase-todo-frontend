import { TodoLists } from "@/components/todo";
import { Layout } from "@/layout";

const Home = () => {
  return (
    <Layout title="home">
      <main className="flex w-screen flex-wrap justify-center">
        <TodoLists limit="今日中" />
        <TodoLists limit="今週中" />
        <TodoLists limit="今月中" />
        <TodoLists limit="継続" />
      </main>
    </Layout>
  );
};

export default Home;
