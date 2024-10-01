import { create } from "zustand";
import { persist } from "zustand/middleware";
export interface IOrgschemaBoardStore {
  zoomCount: number;

  setZoomCount: (value: number) => void;
}

export const useOrgschemaBoardStore = create<IOrgschemaBoardStore>()(
  persist(
    (set) => ({
      zoomCount: 1,
      setZoomCount: (value) => set({ zoomCount: value }),
    }),
    {
      name: "orgschemaBoardStore", // имя для localStorage
      partialize: (state) => ({ zoomCount: state.zoomCount }), // сохраняем только zoomCount
    },
  ),
);
