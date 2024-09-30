import { create } from "zustand";

import { IUser } from "../types/user";

export interface IUserStore {
  currentUser?: IUser;

  setCurrentUser: (user: IUser | undefined) => void;
}

export const useUserStore = create<IUserStore>((set) => {
  const initialState = {
    currentUser: undefined,
  };

  return {
    ...initialState,
    setCurrentUser: (user) => {
      set({ currentUser: user });
    },
  };
});
