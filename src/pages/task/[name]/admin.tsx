import { AdminContent } from "@/component/adminContent/adminContent";
import { NoAdmin } from "@/component/adminContent/noAdmin";
import { Loading } from "@/component/loading";
import { Layout } from "@/layout/layout";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/router";
import { useAuthState } from "react-firebase-hooks/auth";

const Admin = () => {
  const [user, loading] = useAuthState(auth);

  const router = useRouter();
  if (loading) {
    return (
      <Layout title="管理画面">
        <Loading />
      </Layout>
    );
  }
  if (user === null) {
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
