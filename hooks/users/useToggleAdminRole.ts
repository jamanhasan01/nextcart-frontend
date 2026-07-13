import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import UserService from "@/services/user.service";

export const useToggleAdminRole = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => UserService.toggleRole(id),

    onSuccess: (res) => {

      
      toast.success(res.message);

      queryClient.invalidateQueries({
        queryKey: ["users"],
      });
    },

    onError: (error: any) => {
      toast.error(error.message ?? "Failed to update role");
    },
  });
};
