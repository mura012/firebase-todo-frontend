import { AdminContent } from "@/component/adminContent/adminContent";
import { NoAdmin } from "@/component/adminContent/noAdmin";
import { Layout } from "@/layout/layout";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/router";
import { useAuthState } from "react-firebase-hooks/auth";

const Admin = () => {
  const [user] = useAuthState(auth);

  const router = useRouter();
  if (!user) {
    return (
      <Layout title="管理者画面">
        <NoAdmin />
      </Layout>
    );
  }
  return (
    <Layout title="管理者画面">
      <AdminContent name={router.query.name} />
    </Layout>
  );
};

export default Admin;
