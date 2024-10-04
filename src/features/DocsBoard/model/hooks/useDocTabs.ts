import { Key, useCallback, useMemo } from "react";

import { useDocsStore } from "../store/docs";
import { EDocsTabs } from "../types/docs";

export const useDocTabs = () => {
  const currentTab = useDocsStore((state) => state.currentTab);

  const setCurrentTab = useDocsStore((state) => state.setCurrentTab);

  const handleTabChange = useCallback((key: Key) => {
    const tab = key as EDocsTabs;

    setCurrentTab(tab);
  }, []);

  return useMemo(
    () => ({
      currentTab,
      handleTabChange,
    }),
    [currentTab, handleTabChange],
  );
};
