"use client";
import { memo, useEffect, useRef } from "react";
import { Skeleton } from "@nextui-org/skeleton";
import { Button } from "@nextui-org/button";
import { Autocomplete, AutocompleteItem } from "@nextui-org/autocomplete";
import { Kbd } from "@nextui-org/kbd";

import { useOrgschemaMenuListbox } from "../../../model/hooks/useOrgschemaMenuListbox";

import { OrgSchemaIcon } from "@/src/shared/assets/icons";
import { subtitle, title } from "@/components/primitives";

interface OrgschemaListboxProps {
  className?: string;
}

export const OrgschemaListbox = memo((props: OrgschemaListboxProps) => {
  const { className } = props;
  const inputRef = useRef<HTMLInputElement>(null);

  const {
    data,
    isLoading,
    isError,
    error,
    activeSchemaId,
    handleSelectSchema,
  } = useOrgschemaMenuListbox();

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === "k" && (event.metaKey || event.ctrlKey)) {
      event.preventDefault(); // Отключаем стандартное поведение
      inputRef.current?.focus(); // Устанавливаем фокус на input
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown); // Добавляем обработчик события

    return () => {
      window.removeEventListener("keydown", handleKeyDown); // Убираем обработчик при размонтировании
    };
  }, []);

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
      ref={inputRef}
      isClearable
      isRequired
      endContent={<Kbd keys={["command"]}>K</Kbd>}
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
