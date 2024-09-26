"use client";

import { memo, useMemo } from "react";
import { Button } from "@nextui-org/button";

import { SidebarItem } from "../SidebarItem/ui/SidebarItem";
import { useSidebarstore } from "../model/store/useSidebarstore";

import { siteConfig } from "@/src/shared/config/site";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  LogoutIcon,
} from "@/src/shared/assets/icons";
import { ThemeSwitch } from "@/components/theme-switch";

interface SidebarProps {
  className?: string;
}

export const Sidebar = memo((props: SidebarProps) => {
  const isSidebarCollapsed = useSidebarstore(
    (state) => state.isSidebarCollapsed,
  );

  const setIsSidebarCollapsed = useSidebarstore(
    (state) => state.setIsSidebarCollapsed,
  );

  const itemsList = useMemo(
    () =>
      siteConfig.navItems.map((item) => (
        <SidebarItem
          key={item.href}
          collapsed={isSidebarCollapsed}
          item={item}
        />
      )),
    [isSidebarCollapsed],
  );

  return (
    <aside
      className={`h-full "w-20" border-r-1 border-default shadow-default shadow-medium py-6 px-2 relative transition-all duration-300`}
    >
      <p className="font-bold text-2xl text-primary">TMP</p>

      <div className="mt-9 text-center">
        <p className="font-medium mb-2 text-default-500 text-left">Меню</p>
        <nav className="flex flex-col gap-3 mb-5">{itemsList}</nav>
        <Button
          fullWidth
          className="mb-5"
          color="danger"
          isIconOnly={isSidebarCollapsed}
          size="lg"
          startContent={<LogoutIcon size={24} />}
          variant="faded"
        >
          <p
            className={`font-semibold  ${isSidebarCollapsed ? "hidden" : "flex"}`}
          >
            Выйти
          </p>
        </Button>
        <ThemeSwitch />
      </div>
      <Button
        isIconOnly
        className="absolute text-primary bottom-4 right-2"
        variant="faded"
        onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
      >
        {isSidebarCollapsed ? <ArrowRightIcon /> : <ArrowLeftIcon />}
      </Button>
    </aside>
  );
});
