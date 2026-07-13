import UserService from "@/services/user.service";
import { IUserQueries } from "@/types/user.type";
import { useQuery } from "@tanstack/react-query";

export const useUsers = (params: IUserQueries) => {
  const { data, isLoading } = useQuery({
    queryKey: ["users", params],
    queryFn: () => UserService.get(params),
  });
  return {
    users: data?.data,
    pagination: data?.pagination,
    isLoading,
  };
};
export default useUsers;
