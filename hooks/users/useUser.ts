import { useQuery } from "@tanstack/react-query";
import UserService from "@/services/user.service";

export const useUser = (id: string) => {
  const { data, isLoading } = useQuery({
    queryKey: ["user", id],
    queryFn: async () => {
      const res = await UserService.getById(id);
      return res.data;
    },
    enabled: !!id,
  });

  return {
    user: data?.data,
    isLoading,
  };
};