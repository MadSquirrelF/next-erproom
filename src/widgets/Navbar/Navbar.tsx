import { memo } from "react";
import {
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/navbar";
import { Button } from "@nextui-org/button";

import { ThemeSwitch } from "@/components/theme-switch";

export const Navbar = memo(() => {
  return (
    <NextUINavbar shouldHideOnScroll maxWidth="full" position="sticky">
      <NavbarContent
        className="hidden sm:flex basis-1/5 sm:basis-full"
        justify="end"
      >
        <NavbarItem className="flex flex-row gap-3">
          <ThemeSwitch />
          <Button color="primary">Войти</Button>
          <Button color="primary" variant="faded">
            Зарегестрироваться
          </Button>
        </NavbarItem>
      </NavbarContent>
    </NextUINavbar>
  );
});
