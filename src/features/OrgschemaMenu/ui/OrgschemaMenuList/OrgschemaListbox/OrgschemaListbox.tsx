"use client";
import { memo } from "react";
import { Listbox, ListboxItem } from "@nextui-org/listbox";
import { Skeleton } from "@nextui-org/skeleton";
import { Button } from "@nextui-org/button";

import { useOrgschemaMenuListbox } from "../../../model/hooks/useOrgschemaMenuListbox";

import { OrgSchemaIcon } from "@/src/shared/assets/icons";
import { subtitle, title } from "@/components/primitives";

interface OrgschemaListboxProps {
  className?: string;
}

const getSkeletonsSchemaList = () =>
  new Array(7).fill(0).map((item, index) => (
    <ListboxItem
      key={index}
      aria-label="Загрузка..."
      startContent={<OrgSchemaIcon size={40} />}
    >
      <Skeleton className="rounded-lg h-7 w-full" />
    </ListboxItem>
  ));

export const OrgschemaListbox = memo((props: OrgschemaListboxProps) => {
  const { className } = props;

  const { data, isLoading, isError, error, handleSelectionChange } =
    useOrgschemaMenuListbox();

  if (isLoading) {
    return (
      <Listbox aria-label="Зарузка" color="primary">
        {getSkeletonsSchemaList()}
      </Listbox>
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
    <Listbox
      disallowEmptySelection
      aria-label="orgschema list"
      color="primary"
      selectionMode="single"
      variant="faded"
      onSelectionChange={handleSelectionChange}
    >
      {data.map((schema) => (
        <ListboxItem
          key={schema.id}
          aria-label={schema.name}
          startContent={<OrgSchemaIcon size={40} />}
        >
          <p className={subtitle()}>{schema.name}</p>
        </ListboxItem>
      ))}
    </Listbox>
  );
});
