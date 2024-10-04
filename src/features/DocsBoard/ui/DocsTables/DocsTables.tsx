"use client";
import { memo, useCallback } from "react";
import { CSSTransition, SwitchTransition } from "react-transition-group";

import { useDocsStore } from "../../model/store/docs";
import { EDocsTabs } from "../../model/types/docs";

import { DocStatistics } from "./DocStatistics/DocStatistics";
import { DocIncoming } from "./DocIncoming/DocIncoming";
import { DocOutgoing } from "./DocOutgoing/DocOutgoing";
import { DocArchive } from "./DocArchive/DocArchive";
import { DocReferences } from "./DocReferences/DocReferences";
import { DocFields } from "./DocFields/DocFields";

interface DocsTablesProps {
  className?: string;
}

export const DocsTables = memo((props: DocsTablesProps) => {
  const { className } = props;

  const currentTab = useDocsStore((state) => state.currentTab);

  const renderTable = useCallback(
    (currentTab: EDocsTabs) => {
      switch (currentTab) {
        case EDocsTabs.STATISTICS:
          return <DocStatistics />;

        case EDocsTabs.INCOMING:
          return <DocIncoming />;

        case EDocsTabs.OUTGOING:
          return <DocOutgoing />;

        case EDocsTabs.ARCHIVE:
          return <DocArchive />;

        case EDocsTabs.TEMPLATE_REF:
          return <DocReferences />;

        case EDocsTabs.FIELD_REF:
          return <DocFields />;

        default:
          return <DocStatistics />;
      }
    },
    [currentTab],
  );

  return (
    <SwitchTransition mode="out-in">
      <CSSTransition
        key={currentTab}
        unmountOnExit
        classNames="fade"
        timeout={300}
      >
        {renderTable(currentTab)}
      </CSSTransition>
    </SwitchTransition>
  );
});
