import { EDocsTabs, IDocsTab } from "../types/docs";

import {
  ArchiveIcon,
  ChartIcon,
  DocTextIcon,
  FieldsIcon,
  IncommingIcon,
  OutgoingIcon,
} from "@/src/shared/assets/icons";

export const DocsTabsArray: IDocsTab[] = [
  {
    key: EDocsTabs.STATISTICS,
    icon: ChartIcon,
  },
  {
    key: EDocsTabs.OUTGOING,
    icon: OutgoingIcon,
  },
  {
    key: EDocsTabs.INCOMING,
    icon: IncommingIcon,
  },
  {
    key: EDocsTabs.ARCHIVE,
    icon: ArchiveIcon,
  },
  {
    key: EDocsTabs.TEMPLATE_REF,
    icon: DocTextIcon,
  },
  {
    key: EDocsTabs.FIELD_REF,
    icon: FieldsIcon,
  },
];

export const OutgoingArrayFields = [
  "Документ",
  "Кому",
  "Дата создание",
  "Дата отправки",
  "Статус",
  "Исполнитель задачи",
  "Действия",
];
