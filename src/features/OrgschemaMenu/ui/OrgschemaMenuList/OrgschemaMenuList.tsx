"use client";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { memo } from "react";

import { IOrgschemaMenuSection } from "../../model/store/orgschemaMenu";
import { useOrgschemaMenuList } from "../../model/hooks/useOrgschemaMenuList";

import { OrgschemaListbox } from "./OrgschemaListbox/OrgschemaListbox";

import {
  AddIcon,
  CloudActionIcon,
  SearchListIcon,
} from "@/src/shared/assets/icons";

interface OrgschemaMenuListProps {
  className?: string;
}

export const OrgschemaMenuList = memo((props: OrgschemaMenuListProps) => {
  const { className } = props;

  const {
    currentSection,
    handleLoadSchemaById,
    error,
    isError,
    isLoading,
    activeSchemaId,
  } = useOrgschemaMenuList();

  return (
    <form className="h-full flex flex-col justify-between">
      <div className="flex flex-col gap-6">
        <Input
          isClearable
          label="Поиск"
          labelPlacement="outside"
          placeholder={`Искать ${currentSection === IOrgschemaMenuSection.SCHEMAS ? "схему" : "маршрут"} `}
          size="lg"
          startContent={<SearchListIcon className="text-primary" size={30} />}
          type="text"
        />

        <OrgschemaListbox />
      </div>

      <div className="flex flex-col gap-2">
        <Button
          color="primary"
          endContent={<AddIcon size={30} />}
          size="lg"
          variant="faded"
        >
          {currentSection === IOrgschemaMenuSection.SCHEMAS
            ? "Создать новую схему"
            : "Создать новый маршрут"}
        </Button>

        <Button
          color="primary"
          endContent={<CloudActionIcon size={30} />}
          isDisabled={!activeSchemaId}
          isLoading={isLoading}
          size="lg"
          onClick={handleLoadSchemaById}
        >
          {currentSection === IOrgschemaMenuSection.SCHEMAS
            ? "Загрузить схему"
            : "Загрузить маршрут"}
        </Button>
      </div>
    </form>
  );
});
