import { create } from "zustand";

export interface ISidebarStore {
  isSidebarCollapsed: boolean;

  setIsSidebarCollapsed: (value: boolean) => void;
}

export const useSidebarstore = create<ISidebarStore>((set) => {
  const initialState = {
    isSidebarCollapsed: true,
  };

  return {
    ...initialState,
    setIsSidebarCollapsed: (value) => set({ isSidebarCollapsed: value }),
  };
});
