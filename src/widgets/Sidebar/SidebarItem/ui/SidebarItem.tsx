"use client";
import { memo } from "react";
import NextLink from "next/link";
import { usePathname } from "next/navigation";

import { SidebarItemType } from "../model/types/sidebar";

interface SidebarItemProps {
  item: SidebarItemType;
  collapsed: boolean;
}

export const SidebarItem = memo((props: SidebarItemProps) => {
  const { item, collapsed } = props;

  const pathname = usePathname();
  const isActive = pathname === item.href;

  return (
    <NextLink
      className={`flex flex-row gap-3 ${collapsed ? "justify-center" : "justify-start"} items-center p-4 line-clamp-1 rounded-2xl ${isActive ? "bg-primary bg-opacity-85 text-white dark:bg-primary dark:bg-opacity-65" : ""} hover:bg-primary hover:text-white dark:hover:bg-primary`}
      href={item.href}
    >
      <item.icon className={`flex-none `} size={30} />
      <p
        className={`font-semibold  ${collapsed ? "hidden" : "flex"} whitespace-nowrap overflow-hidden text-ellipsis`}
      >
        {item.label}
      </p>
    </NextLink>
  );
});
