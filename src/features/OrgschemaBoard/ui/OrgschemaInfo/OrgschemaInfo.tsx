"use client";
import { Chip } from "@nextui-org/chip";
import { memo } from "react";
import { Tooltip } from "@nextui-org/tooltip";

import { DateCrateIcon, DateEditIcon } from "@/src/shared/assets/icons";
import { getTimeDifferenceFromCreationDate } from "@/src/shared/utils/Date/Date";

interface OrgschemaInfoProps {
  name: string;
  createdAt?: string;
  updatedAt?: string;
}

export const OrgschemaInfo = memo((props: OrgschemaInfoProps) => {
  const { name, createdAt, updatedAt } = props;

  return (
    <div className="flex flex-col gap-2">
      <h4>{name}</h4>
      <Tooltip color="success" content="Блок создан">
        <Chip
          className="w-full"
          color="success"
          startContent={<DateCrateIcon size={20} />}
          variant="faded"
        >
          {getTimeDifferenceFromCreationDate(createdAt || null)}
        </Chip>
      </Tooltip>

      <Tooltip color="warning" content="Последний раз обновлен">
        <Chip
          color="warning"
          startContent={<DateEditIcon size={20} />}
          variant="faded"
        >
          {getTimeDifferenceFromCreationDate(updatedAt || null)}
        </Chip>
      </Tooltip>
    </div>
  );
});
