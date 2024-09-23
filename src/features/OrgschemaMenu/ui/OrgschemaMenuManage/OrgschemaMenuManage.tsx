"use client";
/* eslint-disable react-hooks/rules-of-hooks */
import { Key, memo, useCallback } from "react";
import { Button } from "@nextui-org/button";
import { Tooltip } from "@nextui-org/tooltip";
import { Skeleton } from "@nextui-org/skeleton";
import { Input } from "@nextui-org/input";
import { CSSTransition, SwitchTransition } from "react-transition-group";
import { Autocomplete, AutocompleteItem } from "@nextui-org/autocomplete";
import { ScrollShadow } from "@nextui-org/scroll-shadow";

import { useOrgschemaMenuManage } from "../../model/hooks/useOrgschemaMenuManage";
import {
  IManageScreen,
  useOrgschemaMenu,
} from "../../model/store/orgschemaMenu";
import { BlockForm } from "../BlockForm/BlockForm";
import { useUpdateBlock } from "../../model/hooks/useUpdateBlock";

import { OrgschemaMenuManageBlock } from "./OrgschemaMenuManageBlock/OrgschemaMenuManageBlock";

import {
  AddIcon,
  DocumentEmptyIcon,
  EditIcon,
  EyeOpenedIcon,
  GlobalRefreshIcon,
  OrgSchemaIcon,
  TrashIcon,
} from "@/src/shared/assets/icons";
import { subtitle, title } from "@/components/primitives";
import { ErrorBg } from "@/src/shared/assets/ErrorBg/ErrorBg";
import { EmptyData } from "@/src/shared/assets/EmptyData/EmptyData";

interface OrgschemaMenuManageProps {
  className?: string;
}

export const OrgschemaMenuManage = memo((props: OrgschemaMenuManageProps) => {
  const { className } = props;

  const { data, loadedSchema, isLoading, isError, error } =
    useOrgschemaMenuManage();

  const {
    onChangeName,
    onChangeDescription,
    onChangeDescriptionSecondary,
    createBlock,
    onChangeColor,
    onChangeMail,
    onChangeCloud,
    onChangeSort,
    cancelUpdate,
    onChangeIsTogether,
  } = useUpdateBlock();

  const currentManageScreen = useOrgschemaMenu(
    (state) => state.currentManageScreen,
  );

  const setManageScreen = useOrgschemaMenu((state) => state.setManageScreen);
  const setSelectedBlock = useOrgschemaMenu((state) => state.setSelectedBlock);
  const selectedBlock = useOrgschemaMenu((state) => state.selectedBlock);

  const handleCreateNewBlock = () => {
    setManageScreen(IManageScreen.CREATE);
  };

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

  const renderManageSection = useCallback(
    (currentManageScreen: IManageScreen) => {
      switch (currentManageScreen) {
        case IManageScreen.EMPTY:
          return (
            <div className="flex flex-col items-center gap-4 w-full h-full">
              <div className="flex flex-col gap-4 w-full justify-center items-center h-full">
                <EmptyData className="text-primary" size={300} />
                <h4
                  className={subtitle({
                    color: "default",
                  })}
                >
                  Схема пустая
                </h4>
                <h4
                  className={subtitle({
                    size: "tiny",
                    align: "center",
                  })}
                >
                  Похоже схема только недавно создана и еще не имеет блоков. Вы
                  можете создать новый блок, чтобы начать с ним работать.
                </h4>
              </div>

              <Button
                fullWidth
                color="primary"
                endContent={<AddIcon size={30} />}
                size="lg"
                onClick={handleCreateNewBlock}
              >
                Создать новый блок
              </Button>
            </div>
          );

        case IManageScreen.CREATE:
          return (
            <ScrollShadow className="h-full w-full pr-2">
              <BlockForm
                cancel={cancelUpdate}
                handleCreateBlock={createBlock}
                isReadOnly={false}
                onChangeCloud={onChangeCloud}
                onChangeColor={onChangeColor}
                onChangeDescription={onChangeDescription}
                onChangeDescriptionSecondary={onChangeDescriptionSecondary}
                onChangeIsTogether={onChangeIsTogether}
                onChangeMail={onChangeMail}
                onChangeName={onChangeName}
                onChangeSort={onChangeSort}
              />
            </ScrollShadow>
          );

        case IManageScreen.MANAGE:
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
                          <span>{block.name}</span>
                          <span>{block.description}</span>
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
              <OrgschemaMenuManageBlock />
            </div>
          );

        default:
          return (
            <div className="flex flex-col items-center gap-4 w-full h-full">
              <div className="flex flex-col gap-4 w-full justify-center items-center h-full">
                <EmptyData className="text-primary" size={300} />
                <h4
                  className={subtitle({
                    color: "default",
                  })}
                >
                  Схема пустая
                </h4>
                <h4
                  className={subtitle({
                    size: "tiny",
                    align: "center",
                  })}
                >
                  Похоже схема только недавно создана и еще не имеет блоков. Вы
                  можете создать новый блок, чтобы начать с ним работать.
                </h4>
              </div>

              <Button
                fullWidth
                color="primary"
                endContent={<AddIcon size={30} />}
                size="lg"
                onClick={handleCreateNewBlock}
              >
                Создать новый блок
              </Button>
            </div>
          );
      }
    },
    [currentManageScreen, selectedBlock, data],
  );

  if (isLoading) {
    return (
      <form className="h-full flex flex-col justify-between">
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
      </form>
    );
  }

  if (isError) {
    return (
      <form className="h-full flex flex-col gap-10">
        <div className="w-full flex flex-row items-center justify-between">
          <h5
            className={title({
              size: "tiny",
              bold: "bold",
            })}
          >
            {loadedSchema?.name}
          </h5>

          <div className="flex flex-row gap-2 items-center">
            <Tooltip content="Редактировать схему">
              <Button isIconOnly color="primary" variant="faded">
                <EditIcon />
              </Button>
            </Tooltip>
            <Tooltip color="danger" content="Удалить схему">
              <Button isIconOnly color="danger" variant="faded">
                <TrashIcon />
              </Button>
            </Tooltip>
          </div>
        </div>
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
            {error ? error.message : "Не удалось загрузить блоки."}
          </h4>
          <Button color="danger" startContent={<GlobalRefreshIcon />}>
            Перезагрузить
          </Button>
        </div>
      </form>
    );
  }

  return (
    <div className="h-full flex flex-col z-10 justify-between gap-10">
      <div className="w-full flex flex-row gap-6 items-end justify-between">
        <Input
          isReadOnly
          label="Название оргсхемы"
          labelPlacement="outside"
          startContent={<OrgSchemaIcon className="text-primary" />}
          value={loadedSchema?.name}
          variant="underlined"
        />

        <div className="flex flex-row gap-2 items-center">
          <Tooltip content="Редактировать схему">
            <Button isIconOnly color="primary" variant="faded">
              <EditIcon />
            </Button>
          </Tooltip>
          <Tooltip color="danger" content="Удалить схему">
            <Button isIconOnly color="danger" variant="faded">
              <TrashIcon />
            </Button>
          </Tooltip>
        </div>
      </div>

      <SwitchTransition mode="out-in">
        <CSSTransition
          key={currentManageScreen}
          unmountOnExit
          classNames="fade"
          timeout={300}
        >
          {renderManageSection(currentManageScreen)}
        </CSSTransition>
      </SwitchTransition>
    </div>
  );
});
