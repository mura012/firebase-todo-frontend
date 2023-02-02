import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import Head from "next/head";
import { ReactNode } from "react";

export const Layout = ({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) => {
  return (
    <div className="w-full items-center flex flex-col min-h-screen">
      <Head>
        <title>{title}</title>
      </Head>
      <Header />
      <div className="flex-1 flex">{children}</div>
      <Footer />
    </div>
  );
};
