"use client";
import { memo } from "react";
import { Skeleton } from "@nextui-org/skeleton";
import { Button } from "@nextui-org/button";
import { Autocomplete, AutocompleteItem } from "@nextui-org/autocomplete";

import { useOrgschemaMenuListbox } from "../../../model/hooks/useOrgschemaMenuListbox";

import { OrgSchemaIcon } from "@/src/shared/assets/icons";
import { subtitle, title } from "@/components/primitives";

interface OrgschemaListboxProps {
  className?: string;
}

export const OrgschemaListbox = memo((props: OrgschemaListboxProps) => {
  const { className } = props;

  const {
    data,
    isLoading,
    isError,
    error,
    activeSchemaId,
    handleSelectSchema,
  } = useOrgschemaMenuListbox();

  if (isLoading) {
    return (
      <div className="flex flex-col gap-2">
        <Skeleton className="rounded-lg h-3 w-1/3" />
        <Skeleton className="rounded-lg h-12 w-full" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center gap-3">
        <h5
          className={title({
            size: "tiny",
            bold: "bold",
          })}
        >
          Ошибка!
        </h5>
        <p className={subtitle()}>
          {error ? error.message : "Попробуйте еще раз"}
        </p>
        <Button color="danger">Обновить</Button>
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="flex flex-col items-center">
        <h5
          className={title({
            size: "tiny",
            bold: "bold",
          })}
        >
          Схемы отсутствуют
        </h5>
        <p>Попробуйте создать новую схему</p>
      </div>
    );
  }

  return (
    <Autocomplete
      isClearable
      isRequired
      label="Выберите схему"
      labelPlacement="outside"
      placeholder="Выберите схему"
      selectedKey={String(activeSchemaId)}
      size="lg"
      startContent={<OrgSchemaIcon className="text-primary" />}
      onSelectionChange={handleSelectSchema}
    >
      {data.map((schema) => (
        <AutocompleteItem
          key={schema.id}
          startContent={<OrgSchemaIcon />}
          textValue={schema.name}
        >
          <div className="flex flex-col">
            <span>{schema.name}</span>
          </div>
        </AutocompleteItem>
      ))}
    </Autocomplete>
  );
});
