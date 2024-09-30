import { create } from "zustand";
import { persist } from "zustand/middleware";
export interface IOrgschemaBoardStore {
  isSchemaLoaded: boolean;
  zoomCount: number;

  setZoomCount: (value: number) => void;
  setIsSchemaLoaded: (value: boolean) => void;
}

export const useOrgschemaBoardStore = create<IOrgschemaBoardStore>()(
  persist(
    (set) => ({
      isSchemaLoaded: false,
      zoomCount: 1,
      setZoomCount: (value) => set({ zoomCount: value }),
      setIsSchemaLoaded: (value) => set({ isSchemaLoaded: value }),
    }),
    {
      name: "orgschemaBoardStore", // имя для localStorage
      partialize: (state) => ({ zoomCount: state.zoomCount }), // сохраняем только zoomCount
    },
  ),
);
