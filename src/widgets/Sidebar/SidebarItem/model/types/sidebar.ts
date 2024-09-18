import { IconSvgProps } from "@/types";

export interface SidebarItemType {
  label: string;
  href: string;
  icon: React.FC<IconSvgProps>;
}
