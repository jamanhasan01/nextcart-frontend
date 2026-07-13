export interface IUser {
  _id: string;
  name: string;
  email: string;
  role: "super_admin" | "admin" | "user";
  phone?: string;
  isBlocked: boolean;
  createdAt: string;
  updatedAt: string;
}


export interface IUserQueries {
  page?: number
  limit?: number
  search?: string
  role?: string
  status?:"active" | "blocked";
}