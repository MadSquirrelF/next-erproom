"use client";
import { CSSTransition } from "react-transition-group";

import { OrgschemaBoard } from "@/src/features/OrgschemaBoard";
import { OrgschemaMenu } from "@/src/features/OrgschemaMenu";
import { useOrgschemaMenu } from "@/src/features/OrgschemaMenu/model/store/orgschemaMenu";
import { useSidebarstore } from "@/src/widgets/Sidebar/model/store/useSidebarstore";

export default function OrgSchema() {
  const isMenuCollapsed = useOrgschemaMenu((state) => state.isMenuCollapsed);
  const isSidebarCollapsed = useSidebarstore(
    (state) => state.isSidebarCollapsed,
  );

  return (
    <section
      className={`flex gap-4 items-center justify-between ${isSidebarCollapsed ? "w-[calc(100vw-80px)]" : "w-[calc(100vw-280px)]"}  h-screen pl-6 py-4 pr-3 flex-grow`}
    >
      <OrgschemaBoard />

      <CSSTransition
        unmountOnExit
        classNames="slide-animation"
        in={!isMenuCollapsed}
        timeout={300}
      >
        <OrgschemaMenu />
      </CSSTransition>
    </section>
  );
}
