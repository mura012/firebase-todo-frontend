import { Footer } from "@/component/footer";
import { Header } from "@/component/header/header";
import Head from "next/head";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  title: string;
};

export const Layout = ({ children, title }: Props) => {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <div className="w-full items-center flex flex-col min-h-screen bg-slate-400">
        <Header />
        <div className="flex-1 flex">{children}</div>
        <Footer />
      </div>
    </>
  );
};
