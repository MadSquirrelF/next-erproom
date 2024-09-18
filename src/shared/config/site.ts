import {
  AdminIcon,
  DocsIcon,
  HomeIcon,
  OrgSchemaIcon,
  TaskIcon,
} from "@/src/shared/assets/icons";
import { SidebarItemType } from "@/src/widgets/Sidebar/SidebarItem/model/types/sidebar";

export interface ISiteConfig {
  name: string;
  description: string;
  navItems: SidebarItemType[];
}

export const siteConfig = {
  name: "ТрансМашПрибор",
  description: "Make beautiful websites regardless of your design experience.",
  navItems: [
    {
      label: "Главная страница",
      href: "/",
      icon: HomeIcon,
    },
    {
      label: "Задачи",
      href: "/tasks",
      icon: TaskIcon,
    },
    {
      label: "Оргсхема и маршруты",
      href: "/orgschema",
      icon: OrgSchemaIcon,
    },

    {
      label: "Документооборот",
      href: "/docs",
      icon: DocsIcon,
    },
    {
      label: "Администрирование",
      href: "/manage",
      icon: AdminIcon,
    },
  ],
  links: {
    github: "https://github.com/nextui-org/nextui",
    twitter: "https://twitter.com/getnextui",
    docs: "https://nextui.org",
    discord: "https://discord.gg/9b6yyZKmH4",
    sponsor: "https://patreon.com/jrgarciadev",
  },
};
