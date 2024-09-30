import { IUser } from "../types/user";

import { API_URL, axiosClassic } from "@/src/shared/api/api.config";

export const UserService = {
  async getAllUsers() {
    const { data } = await axiosClassic.get<IUser[]>(API_URL.user(""));

    return data;
  },
};
