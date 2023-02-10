import { DatabaseType } from "@/types/todo";
import useSWR from "swr";

export const useGetRecordByAdminEmail = (adminEmail: string) => {
  const fetcher = async (input: RequestInfo, init?: RequestInit) => {
    const res = await fetch(input, init);
    return res.json();
  };

  const { data, error } = useSWR<DatabaseType[], Error>(
    `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/adminTasks/${adminEmail}`,
    fetcher
  );
  return { data, error, isLoading: !data && !error };
};
