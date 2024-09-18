import { memo } from "react";
import { Button } from "@nextui-org/button";
import { Tooltip } from "@nextui-org/tooltip";
import { Autocomplete, AutocompleteItem } from "@nextui-org/autocomplete";

import {
  AddIcon,
  DocumentEmptyIcon,
  EyeOpenedIcon,
} from "@/src/shared/assets/icons";
import { OrgschemaSelectBlockBg } from "@/src/shared/assets/OrgschemaSelectBlockBg/OrgschemaSelectBlockBg";
import { subtitle } from "@/components/primitives";

interface OrgschemaMenuManageProps {
  className?: string;
}

export const orgChartTestArray = [
  {
    id: "1",
    name: "CEO",
    position: "Chief Executive Officer",
    reportsTo: null,
  },
  {
    id: "2",
    name: "CTO",
    position: "Chief Technology Officer",
    reportsTo: "1",
  },
  { id: "3", name: "CFO", position: "Chief Financial Officer", reportsTo: "1" },
  { id: "4", name: "COO", position: "Chief Operating Officer", reportsTo: "1" },
  { id: "5", name: "Lead Developer", position: "Team Lead", reportsTo: "2" },
  {
    id: "6",
    name: "Frontend Developer",
    position: "Developer",
    reportsTo: "5",
  },
  { id: "7", name: "Backend Developer", position: "Developer", reportsTo: "5" },
  { id: "8", name: "Accountant", position: "Finance", reportsTo: "3" },
  { id: "9", name: "HR Manager", position: "Human Resources", reportsTo: "4" },
  {
    id: "10",
    name: "Marketing Manager",
    position: "Marketing",
    reportsTo: "4",
  },
];

export const OrgschemaMenuManage = memo((props: OrgschemaMenuManageProps) => {
  const { className } = props;

  return (
    <form className="h-full flex flex-col justify-between">
      <div className="flex flex-row items-end gap-4 w-full">
        <Autocomplete
          isClearable
          label="Список блоков схемы"
          labelPlacement="outside"
          placeholder="Выберите блок схемы"
          size="lg"
          startContent={<DocumentEmptyIcon className="text-primary" />}
        >
          {orgChartTestArray.map((block) => (
            <AutocompleteItem
              key={block.id}
              startContent={<DocumentEmptyIcon />}
              textValue={block.name}
            >
              <div className="flex flex-col">
                <span>{block.name}</span>
                <span>{block.position}</span>
              </div>
            </AutocompleteItem>
          ))}
        </Autocomplete>
        <Tooltip color="primary" content="Показать блок на схеме">
          <Button isIconOnly color="primary" size="lg" variant="faded">
            <EyeOpenedIcon />
          </Button>
        </Tooltip>
      </div>

      <div className="flex flex-col items-center gap-2">
        <OrgschemaSelectBlockBg className="text-primary" size={300} />
        <h4
          className={subtitle({
            color: "default",
          })}
        >
          Блок схемы не выбран
        </h4>
        <h4
          className={subtitle({
            size: "tiny",
            align: "center",
          })}
        >
          Выберите блок схемы из списка выше, чтобы управлять им из меню или
          просто кликните по нему на схеме.
        </h4>
      </div>

      <Button color="primary" endContent={<AddIcon size={30} />} size="lg">
        Создать новый блок
      </Button>
    </form>
  );
});
