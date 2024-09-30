"use client";

import { memo, useMemo } from "react";

import { SidebarItem } from "../SidebarItem/ui/SidebarItem";
import { useSidebarstore } from "../model/store/useSidebarstore";

import { siteConfig } from "@/src/shared/config/site";

export const Sidebar = memo(() => {
  const isSidebarCollapsed = useSidebarstore(
    (state) => state.isSidebarCollapsed,
  );

  const itemsList = useMemo(
    () =>
      siteConfig.navItems.map((item) => (
        <SidebarItem key={item.href} item={item} />
      )),
    [isSidebarCollapsed],
  );

  return (
    <aside
      className={`h-[calc(100vh-65px)] absolute left-0 top-0 bottom-0 bg-background w-20 z-40 border-r-1 border-default ${isSidebarCollapsed ? "translate-x-[-80px]" : "translate-x-0"} shadow-default shadow-medium py-6 px-2 transition-all duration-300`}
    >
      <p className="font-medium mb-2 text-default-500 text-left">Меню</p>
      <nav className="flex flex-col gap-3 mb-5">{itemsList}</nav>
    </aside>
  );
});
