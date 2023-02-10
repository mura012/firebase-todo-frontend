import { AdminContent } from "@/component/adminContent/adminContent";
import { Footer } from "@/component/footer";
import { Header } from "@/component/header/header";
import { useRouter } from "next/router";

const Admin = () => {
  const router = useRouter();
  return (
    <div>
      <Header />
      <AdminContent name={router.query.name} />
      <Footer />
    </div>
  );
};

export default Admin;
