import { api } from "@/utils/Api";

const AuthService = {
  register: (data: FormData) => {
    return api.post("/auth/register", data);
  },
  login: (data: { email: string; password: string }) => {
    return api.post("/auth/login", data);
  },
  logout: () => {
    return api.post("/auth/logout", {});
  },
  me: () => {
    return api.get("/auth/me");
  },
};

export default AuthService;
