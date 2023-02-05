import { Footer } from "@/components/footer";
import { Header } from "@/components/header/header";
import { TodoLists } from "@/components/todo";
import { auth } from "@/lib/firebase";
import Head from "next/head";
import Image from "next/image";
import { useAuthState } from "react-firebase-hooks/auth";
const Home = () => {
  const [user] = useAuthState(auth);
  return (
    <>
      <Head>
        <title>Todoリスト</title>
      </Head>
      <div className="w-full items-center flex flex-col min-h-screen">
        <Header />
        {!user ? (
          <div className="mb-3 bg-yellow-200 text-gray-500 px-3 flex items-center">
            <Image src="/images/announce.jpg" width={20} height={20} alt="" />
            <p>Googleでサインインすれば、タスクを追加できます</p>
          </div>
        ) : null}
        <main className="flex w-screen flex-wrap justify-center flex-1">
          <div className="flex">
            <TodoLists limit="今日中" />
            <TodoLists limit="今週中" />
          </div>
          <div className="flex">
            <TodoLists limit="今月中" />
            <TodoLists limit="継続" />
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Home;
