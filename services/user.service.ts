import { IUserQueries } from "@/types/user.type";
import { api } from "@/utils/Api";

const UserService = {
  // Get All Users
  get: async (params?: IUserQueries) => {
    return api.get("/users", params);
  },

  // Get Single User
  getById: async (id: string) => {
    return api.get(`/users/${id}`);
  },

  // Delete User
  delete: async (id: string) => {
    return api.delete(`/users/${id}`);
  },

  // Block / Unblock User
  toggleBlock: async (id: string) => {
    return api.patch(`/users/${id}/block`, {});
  },

  // Make / Remove Admin
  toggleRole: async (id: string) => {
    return api.patch(`/users/${id}/role`, {});
  },
};

export default UserService;
