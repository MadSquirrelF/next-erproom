/* eslint-disable jsx-a11y/no-autofocus */
"use client";
/* eslint-disable react-hooks/rules-of-hooks */
import { ChangeEvent, Key, memo, useCallback } from "react";
import { Button } from "@nextui-org/button";
import { Tooltip } from "@nextui-org/tooltip";
import { Skeleton } from "@nextui-org/skeleton";
import { Input } from "@nextui-org/input";
import { CSSTransition, SwitchTransition } from "react-transition-group";
import { Autocomplete, AutocompleteItem } from "@nextui-org/autocomplete";
import toast from "react-hot-toast";
import { Popover, PopoverContent, PopoverTrigger } from "@nextui-org/popover";

import { useOrgschemaMenuManage } from "../../model/hooks/useOrgschemaMenuManage";
import {
  IManageScreen,
  useOrgschemaMenu,
} from "../../model/store/orgschemaMenu";
import { BlockForm } from "../BlockForm/BlockForm";
import { useUpdateBlock } from "../../model/hooks/useUpdateBlock";
import { useUpdateSchema } from "../../model/hooks/useUpdateSchema";

import { OrgschemaMenuManageBlock } from "./OrgschemaMenuManageBlock/OrgschemaMenuManageBlock";

import {
  AddIcon,
  DocumentEmptyIcon,
  EditIcon,
  EyeOpenedIcon,
  GlobalRefreshIcon,
  OrgSchemaIcon,
  TickIcon,
  TrashIcon,
} from "@/src/shared/assets/icons";
import { subtitle } from "@/components/primitives";
import { ErrorBg } from "@/src/shared/assets/ErrorBg/ErrorBg";
import { EmptyData } from "@/src/shared/assets/EmptyData/EmptyData";

interface OrgschemaMenuManageProps {
  className?: string;
}

export const OrgschemaMenuManage = memo((props: OrgschemaMenuManageProps) => {
  const { className } = props;

  const currentManageScreen = useOrgschemaMenu(
    (state) => state.currentManageScreen,
  );

  const setManageScreen = useOrgschemaMenu((state) => state.setManageScreen);
  const setSelectedBlock = useOrgschemaMenu((state) => state.setSelectedBlock);
  const setSchemaInputValue = useOrgschemaMenu(
    (state) => state.setSchemaInputValue,
  );
  const schemaInputValue = useOrgschemaMenu((state) => state.schemaInputValue);
  const selectedBlock = useOrgschemaMenu((state) => state.selectedBlock);

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
    onClearColor,
    isPending,
  } = useUpdateBlock();

  const {
    isDeletedPopoverOpen,
    setIsDeletedPopoverOpen,
    handleDeleteSchema,
    inputRef,
    isSchemaInputReadonly,
    handleBlurSchemaName,
    updateSchema,
    handleEditSchema,
  } = useUpdateSchema();

  const handleCreateNewBlock = () => {
    setManageScreen(IManageScreen.CREATE);
  };

  const setEditInputActive = () => {
    handleEditSchema();
    setSchemaInputValue(loadedSchema?.name || "");
  };

  const handleUpdateSchema = () => {
    if (!schemaInputValue || schemaInputValue === "") {
      toast.error("Необходимо ввести название схемы");

      return;
    }
    if (loadedSchema?.name === schemaInputValue) {
      toast.error("Вы не обновили имя схемы.");

      return;
    }
    updateSchema();
  };

  const onChangeInputSchema = (e: ChangeEvent<HTMLInputElement>) => {
    setSchemaInputValue(e.target.value);
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
            <BlockForm
              cancel={cancelUpdate}
              cancelTitle="Отменить создание"
              formTitle="Создание блока"
              handleBlock={createBlock}
              handleTitle="Создать блок"
              isPending={isPending}
              isReadOnly={false}
              type="create"
              onChangeCloud={onChangeCloud}
              onChangeColor={onChangeColor}
              onChangeDescription={onChangeDescription}
              onChangeDescriptionSecondary={onChangeDescriptionSecondary}
              onChangeIsTogether={onChangeIsTogether}
              onChangeMail={onChangeMail}
              onChangeName={onChangeName}
              onChangeSort={onChangeSort}
              onClearColor={onClearColor}
            />
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

  const renderEditButton = useCallback(
    (isSchemaInputReadonly: boolean) => {
      switch (isSchemaInputReadonly) {
        case false:
          return (
            <Tooltip color="primary" content="Подтвердить?">
              <Button
                isIconOnly
                color="primary"
                id="confirmUpdateSchemaButton"
                onClick={handleUpdateSchema}
              >
                <TickIcon />
              </Button>
            </Tooltip>
          );
        case true:
          return (
            <Tooltip content="Редактировать схему">
              <Button
                isIconOnly
                color="primary"
                variant="faded"
                onClick={setEditInputActive}
              >
                <EditIcon />
              </Button>
            </Tooltip>
          );

        default:
          return (
            <Tooltip content="Редактировать схему">
              <Button
                isIconOnly
                color="primary"
                variant="faded"
                onClick={setEditInputActive}
              >
                <EditIcon />
              </Button>
            </Tooltip>
          );
      }
    },
    [isSchemaInputReadonly, schemaInputValue],
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
    <div className="h-full flex flex-col z-10 justify-between gap-5">
      <div className="w-full flex flex-row gap-6 items-end justify-between">
        <Input
          ref={inputRef}
          isReadOnly={isSchemaInputReadonly}
          label="Название оргсхемы"
          labelPlacement="outside"
          startContent={<OrgSchemaIcon className="text-primary" />}
          value={isSchemaInputReadonly ? loadedSchema?.name : schemaInputValue}
          variant="underlined"
          onBlur={handleBlurSchemaName}
          onChange={onChangeInputSchema}
        />

        <div className="flex flex-row gap-2 items-center">
          {renderEditButton(isSchemaInputReadonly)}
          <Popover
            showArrow
            backdrop="opaque"
            isOpen={isDeletedPopoverOpen}
            offset={20}
            placement="bottom-end"
            onOpenChange={(open) => setIsDeletedPopoverOpen(open)}
          >
            <PopoverTrigger>
              <Button isIconOnly color="danger" variant="faded">
                <TrashIcon />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="flex flex-col gap-8 items-center p-4 max-w-96">
              <div className="flex flex-col text-center items-center w-full">
                <h5 className="text-danger font-bold text-2xl">Вы уверены?</h5>
                <p
                  className={subtitle({
                    size: "tiny",
                    color: "default",
                    align: "center",
                  })}
                >
                  Это действие удалит cхему и все его содержимые блоки без
                  возможности востановить!
                </p>
              </div>

              <div className="flex flex-row gap-2 w-full">
                <Button
                  fullWidth
                  color="danger"
                  startContent={<TrashIcon />}
                  onClick={handleDeleteSchema}
                >
                  Удалить
                </Button>
                <Button
                  fullWidth
                  color="default"
                  variant="faded"
                  onClick={() => setIsDeletedPopoverOpen(false)}
                >
                  Отмена
                </Button>
              </div>
            </PopoverContent>
          </Popover>
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
