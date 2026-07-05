import AuthService from "@/services/auth.service";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useAuth = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["me"],
    queryFn: AuthService.me,
    retry: false, // 👈 Don't retry on auth failure
  });

  const logoutMutation = useMutation({
    mutationFn: AuthService.logout,
  });

  return {
    me: data?.data,
    isLoading,
    logout: logoutMutation.mutate,
    isLoggingOut: logoutMutation.isPending,
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
