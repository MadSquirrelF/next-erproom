"use client";

import { memo, useMemo, useState } from "react";
import { Button } from "@nextui-org/button";

import { SidebarItem } from "./SidebarItem/ui/SidebarItem";

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
  const [collapsed, setCollapsed] = useState(true);

  const toggleSidebar = () => setCollapsed(!collapsed);

  const itemsList = useMemo(
    () =>
      siteConfig.navItems.map((item) => (
        <SidebarItem key={item.href} collapsed={collapsed} item={item} />
      )),
    [collapsed],
  );

  return (
    <aside
      className={`h-full ${collapsed ? "w-20" : "w-[300px]"} border-r-1 border-default shadow-default shadow-medium py-6 px-2 relative transition-all duration-300`}
    >
      <p className="font-bold text-2xl text-primary">TMP</p>

      <div className="mt-9 text-center">
        <p className="font-medium mb-2 text-default-500 text-left">Меню</p>
        <nav className="flex flex-col gap-3 mb-5">{itemsList}</nav>
        <Button
          fullWidth
          className="mb-5"
          color="danger"
          isIconOnly={collapsed}
          size="lg"
          startContent={<LogoutIcon size={24} />}
          variant="faded"
        >
          <p className={`font-semibold  ${collapsed ? "hidden" : "flex"}`}>
            Выйти
          </p>
        </Button>
        <ThemeSwitch />
      </div>
      <Button
        isIconOnly
        className="absolute text-primary bottom-4 right-2"
        variant="faded"
        onClick={toggleSidebar}
      >
        {collapsed ? <ArrowRightIcon /> : <ArrowLeftIcon />}
      </Button>
    </aside>
  );
});
