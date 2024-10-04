import { FC } from "react";

import { IconSvgProps } from "@/types";

export enum EDocsTabs {
  STATISTICS = "Статистика",
  INCOMING = "Входящие",
  OUTGOING = "Исходящие",
  ARCHIVE = "Архив",
  TEMPLATE_REF = "Справочник шаблонов",
  FIELD_REF = "Справочник полей",
}

export interface IDocsTab {
  key: EDocsTabs;
  icon: FC<IconSvgProps>;
}
