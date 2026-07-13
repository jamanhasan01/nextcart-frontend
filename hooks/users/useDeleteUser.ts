import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import UserService from "@/services/user.service";

export const useDeleteUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => UserService.delete(id),

    onSuccess: (res) => {
      toast.success(res.data.message);

      queryClient.invalidateQueries({
        queryKey: ["users"],
      });
    },

    onError: (error: any) => {
      toast.error(error?.response?.data?.message ?? "Failed to delete user");
    },
  });
};
