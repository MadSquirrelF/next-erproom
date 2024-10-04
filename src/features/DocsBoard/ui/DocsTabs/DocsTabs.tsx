"use client";
import { Tab, Tabs } from "@nextui-org/tabs";
import { memo } from "react";

import { DocsTabsArray } from "../../model/data/docs";
import { useDocTabs } from "../../model/hooks/useDocTabs";

interface DocsTabsProps {
  className?: string;
}

export const DocsTabs = memo((props: DocsTabsProps) => {
  const { className } = props;

  const { currentTab, handleTabChange } = useDocTabs();

  return (
    <Tabs
      fullWidth
      aria-label="Docs tabs"
      color="primary"
      selectedKey={currentTab}
      size="lg"
      onSelectionChange={handleTabChange}
    >
      {DocsTabsArray.map((tab) => (
        <Tab
          key={tab.key}
          title={
            <div className="flex items-center space-x-2">
              <tab.icon />
              <span>{tab.key}</span>
            </div>
          }
        />
      ))}
    </Tabs>
  );
});
