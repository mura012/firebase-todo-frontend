import { TodoLists } from "@/components/todo";
import { Layout } from "@/layout";
const Home = () => {
  return (
    <Layout title="home">
      <main className="flex w-screen flex-wrap justify-center">
        <div className="flex">
          <TodoLists limit="今日中" />
          <TodoLists limit="今週中" />
        </div>
        <div className="flex">
          <TodoLists limit="今月中" />
          <TodoLists limit="継続" />
        </div>
      </main>
    </Layout>
  );
};

export default Home;
