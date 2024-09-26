import { Chip } from "@nextui-org/chip";
import { memo } from "react";
import { Tooltip } from "@nextui-org/tooltip";

import { DateCrateIcon, DateEditIcon } from "@/src/shared/assets/icons";
import { useOrgschemaMenu } from "@/src/features/OrgschemaMenu/model/store/orgschemaMenu";
import { getTimeDifferenceFromCreationDate } from "@/src/shared/utils/Date/Date";

interface OrgschemaInfoProps {
  className?: string;
}

export const OrgschemaInfo = memo((props: OrgschemaInfoProps) => {
  const { className } = props;
  const loadedSchema = useOrgschemaMenu((state) => state.loadedSchema);

  return (
    <div className="flex flex-col gap-2">
      <h4>{loadedSchema?.name}</h4>
      <Tooltip color="success" content="Блок создан">
        <Chip
          className="w-full"
          color="success"
          startContent={<DateCrateIcon size={20} />}
          variant="faded"
        >
          {getTimeDifferenceFromCreationDate(loadedSchema?.created_at || null)}
        </Chip>
      </Tooltip>

      <Tooltip color="warning" content="Последний раз обновлен">
        <Chip
          color="warning"
          startContent={<DateEditIcon size={20} />}
          variant="faded"
        >
          {getTimeDifferenceFromCreationDate(loadedSchema?.updated_at || null)}
        </Chip>
      </Tooltip>
    </div>
  );
});
