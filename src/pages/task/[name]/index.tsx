import { TodoLists } from "@/component/todo/todoList";
import { Layout } from "@/layout/layout";

const Team = () => {
  return (
    <Layout title="タスクリスト">
      <div className="flex flex-wrap flex-row justify-center">
        <div className="flex xs:flex-row flex-col">
          <TodoLists limit="今日中" />
          <TodoLists limit="今週中" />
        </div>
        <div className="flex xs:flex-row flex-col">
          <TodoLists limit="今月中" />
          <TodoLists limit="継続" />
        </div>
      </div>
    </Layout>
  );
};

export default Team;
