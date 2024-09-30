"use client";
import { memo } from "react";
import NextLink from "next/link";
import { usePathname } from "next/navigation";
import { Tooltip } from "@nextui-org/tooltip";

import { SidebarItemType } from "../model/types/sidebar";

interface SidebarItemProps {
  item: SidebarItemType;
}

export const SidebarItem = memo((props: SidebarItemProps) => {
  const { item } = props;

  const pathname = usePathname();
  const isActive = pathname === item.href;

  return (
    <Tooltip
      showArrow
      color="primary"
      content={item.label}
      offset={20}
      placement="right"
      size="lg"
    >
      <NextLink
        className={`flex flex-row gap-3 justify-center items-center p-4 line-clamp-1 rounded-2xl ${isActive ? "bg-primary bg-opacity-85 text-white dark:bg-primary dark:bg-opacity-65" : ""} hover:bg-primary hover:text-white dark:hover:bg-primary`}
        href={item.href}
      >
        <item.icon className={`flex-none`} size={30} />
      </NextLink>
    </Tooltip>
  );
});
