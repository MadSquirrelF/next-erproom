import { create } from "zustand";
import { persist } from "zustand/middleware";

import { EDocsTabs } from "../types/docs";

import { DOCS_LOCALSTORAGE_KEY } from "@/src/shared/constants/constants";

export interface IDocsStore {
  currentTab: EDocsTabs;

  setCurrentTab: (tab: EDocsTabs) => void;
}

export const useDocsStore = create<IDocsStore>()(
  persist(
    (set) => {
      const initialState = {
        currentTab: EDocsTabs.STATISTICS,
      };

      return {
        ...initialState,

        setCurrentTab: (tab) => {
          set({ currentTab: tab });
        },
      };
    },
    {
      name: DOCS_LOCALSTORAGE_KEY,
    },
  ),
);
