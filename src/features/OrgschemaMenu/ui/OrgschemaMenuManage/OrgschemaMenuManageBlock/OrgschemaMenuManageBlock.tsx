"use client";

import { Key, memo } from "react";
import { Autocomplete, AutocompleteItem } from "@nextui-org/autocomplete";
import { Tooltip } from "@nextui-org/tooltip";
import { Button } from "@nextui-org/button";
import { Skeleton } from "@nextui-org/skeleton";

import { useOrgschemaMenu } from "../../../model/store/orgschemaMenu";
import { useOrgschemaMenuManage } from "../../../model/hooks/useOrgschemaMenuManage";

import { ActionManageScreenInfo } from "./ActionManageScreen/ActionManageScreenInfo/ActionManageScreenInfo";

import { subtitle } from "@/components/primitives";
import { OrgschemaSelectBlockBg } from "@/src/shared/assets/OrgschemaSelectBlockBg/OrgschemaSelectBlockBg";
import {
  DocumentEmptyIcon,
  EyeOpenedIcon,
  GlobalRefreshIcon,
} from "@/src/shared/assets/icons";
import { ErrorBg } from "@/src/shared/assets/ErrorBg/ErrorBg";

export const OrgschemaMenuManageBlock = memo(() => {
  const selectedBlock = useOrgschemaMenu((state) => state.selectedBlock);
  const setSelectedBlock = useOrgschemaMenu((state) => state.setSelectedBlock);
  const { data, isLoading, isError, error } = useOrgschemaMenuManage();

  function refreshPage() {
    window.location.reload();
  }
  const handleSelectBlock = (blockId: Key | null) => {
    if (!blockId || !data) {
      setSelectedBlock(undefined);

      return;
    }

    const NumberBlockId = Number(blockId);

    const blockData = data.find((item) => {
      const isMatch = item.id === NumberBlockId;

      return isMatch;
    });

    if (!blockData) {
      setSelectedBlock(undefined);

      return;
    }

    setSelectedBlock(blockData);
  };

  if (isLoading) {
    return (
      <div className="h-full flex flex-col justify-between">
        <div className="flex flex-row items-end gap-4 w-full">
          <div className="w-full flex flex-col gap-3">
            <Skeleton className="w-1/2 h-3 rounded-xl" />
            <Skeleton className="w-full h-11 rounded-xl" />
          </div>

          <Skeleton className="w-11 flex-none h-11 rounded-xl" />
        </div>
        <div className="w-full flex flex-col items-center gap-3">
          <Skeleton className="w-1/2 h-40 rounded-xl" />
          <Skeleton className="w-full h-5 rounded-xl" />
          <Skeleton className="w-full h-3 rounded-xl" />
          <Skeleton className="w-full h-3 rounded-xl" />
        </div>

        <Skeleton className="w-full h-11 rounded-xl" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="h-full flex flex-col gap-10">
        <div className="flex flex-col items-center gap-4">
          <ErrorBg className="text-danger" size={300} />
          <h4
            className={subtitle({
              color: "default",
            })}
          >
            Ошибка
          </h4>
          <h4
            className={subtitle({
              size: "tiny",
              align: "center",
            })}
          >
            {error
              ? error.message
              : "Не удалось загрузить блоки. Попробуйте снова"}
          </h4>
          <Button
            color="danger"
            startContent={<GlobalRefreshIcon />}
            onClick={refreshPage}
          >
            Перезагрузить страницу
          </Button>
        </div>
      </div>
    );
  }

  if (!selectedBlock) {
    return (
      <div className="flex flex-col items-center gap-4 h-full">
        <OrgschemaSelectBlockBg className="text-primary" size={300} />
        <h4
          className={subtitle({
            color: "default",
          })}
        >
          Выберите активный блок
        </h4>
        <h4
          className={subtitle({
            size: "tiny",
            align: "center",
          })}
        >
          Выберите из списка блок, с которым хотите работать, или вы просто
          кликните по нему на схеме организации.
        </h4>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-4 w-full h-full">
      <div className="flex flex-row items-end gap-4 w-full">
        <Autocomplete
          isClearable
          label="Список блоков схемы"
          labelPlacement="outside"
          placeholder="Выберите блок схемы"
          selectedKey={String(selectedBlock?.id)}
          size="lg"
          startContent={<DocumentEmptyIcon className="text-primary" />}
          onSelectionChange={handleSelectBlock}
        >
          {data && data.length > 0 ? (
            data.map((block) => (
              <AutocompleteItem
                key={block.id}
                startContent={<DocumentEmptyIcon />}
                textValue={block.name}
              >
                <div className="flex flex-col">
                  <span className="font-bold">{block.name}</span>
                  <span className="line-clamp-2 text-default-500">
                    {block.description}
                  </span>
                </div>
              </AutocompleteItem>
            ))
          ) : (
            <AutocompleteItem
              key="Пусто"
              startContent={<DocumentEmptyIcon />}
              textValue="Пусто"
            >
              ПУСТО
            </AutocompleteItem>
          )}
        </Autocomplete>
        <Tooltip color="primary" content="Показать блок на схеме">
          <Button isIconOnly color="primary" size="lg" variant="faded">
            <EyeOpenedIcon />
          </Button>
        </Tooltip>
      </div>
      <ActionManageScreenInfo />
    </div>
  );
});
