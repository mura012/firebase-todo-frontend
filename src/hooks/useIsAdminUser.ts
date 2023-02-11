import { DatabaseType } from "@/types/todo";
import useSWR from "swr";

export const useIsAdminUser = (
  url: string | string[] | undefined,
  email: string | null | undefined
) => {
  const fetcher = async (input: RequestInfo, init?: RequestInit) => {
    const res = await fetch(input, init);
    return res.json();
  };

  const { data } = useSWR<DatabaseType, Error>(
    `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/myTask/${url}`,
    fetcher
  );
  const isAdmin = data?.adminUserEmail === email;
  return { isAdmin };
};
