"use client";
import { memo } from "react";
import {
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarItem,
  NavbarBrand,
} from "@nextui-org/navbar";
import { Button } from "@nextui-org/button";

import { useSidebarstore } from "../Sidebar/model/store/useSidebarstore";

import { ThemeSwitch } from "@/components/theme-switch";
import {
  LinkIcon,
  LogoutIcon,
  MenuSecondaryIcon,
} from "@/src/shared/assets/icons";

export const Navbar = memo(() => {
  const setIsSidebarCollapsed = useSidebarstore(
    (state) => state.setIsSidebarCollapsed,
  );
  const isSidebarCollapsed = useSidebarstore(
    (state) => state.isSidebarCollapsed,
  );

  const handleNavigateToFront = () => {
    window.open(`https://devfront.erproom.ru/docs/outgoing/0`, "_blank");
  };

  return (
    <NextUINavbar
      isBordered
      classNames={{
        wrapper: "px-4",
      }}
      maxWidth="full"
      position="sticky"
    >
      <NavbarBrand className="gap-5">
        <Button
          isIconOnly
          variant="flat"
          onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
        >
          <MenuSecondaryIcon />
        </Button>
        <p className="font-bold text-2xl text-primary">ТрансМашПрибор</p>
      </NavbarBrand>
      <NavbarContent className="flex flex-row items-center" justify="end">
        <NavbarItem className="flex flex-row items-center gap-3">
          <ThemeSwitch />
          <Button
            color="secondary"
            startContent={<LinkIcon />}
            variant="flat"
            onClick={handleNavigateToFront}
          >
            Старый фронт
          </Button>
          <Button
            color="danger"
            startContent={<LogoutIcon size={24} />}
            variant="flat"
          >
            Выйти
          </Button>
        </NavbarItem>
      </NavbarContent>
    </NextUINavbar>
  );
});
