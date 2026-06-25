import AuthService from "@/services/auth.service";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useAuth = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["me"],
    queryFn: AuthService.me,
  });
  return {
    me: data?.data,
    isLoading,
  };
};

export const useRegistration = () => {
  const mutation = useMutation({
    mutationFn: AuthService.register,
  });

  return mutation;
};
export const useLogin = () => {
  const mutation = useMutation({
    mutationFn: AuthService.login,
  });

  return mutation;
};
export const useLogout = () => {
  const mutation = useMutation({
    mutationFn: AuthService.logout,
  });

  return mutation;
};
