"use client";
/* eslint-disable react-hooks/rules-of-hooks */
import { ChangeEvent, memo, useCallback, useEffect } from "react";
import { Button } from "@nextui-org/button";
import { Tooltip } from "@nextui-org/tooltip";
import { Input } from "@nextui-org/input";
import { CSSTransition, SwitchTransition } from "react-transition-group";
import toast from "react-hot-toast";
import { Popover, PopoverContent, PopoverTrigger } from "@nextui-org/popover";

import {
  IManageScreen,
  useOrgschemaMenu,
} from "../../model/store/orgschemaMenu";
import { BlockForm } from "../BlockForm/BlockForm";
import { useUpdateBlock } from "../../model/hooks/useUpdateBlock";
import { useUpdateSchema } from "../../model/hooks/useUpdateSchema";

import { OrgschemaMenuManageBlock } from "./OrgschemaMenuManageBlock/OrgschemaMenuManageBlock";
import { ActionManageScreenUser } from "./OrgschemaMenuManageBlock/ActionManageScreen/ActionManageScreenUser/ActionManageScreenUser";
import { ActionManageScreenFile } from "./OrgschemaMenuManageBlock/ActionManageScreen/ActionManageScreenFile/ActionManageScreenFile";

import {
  AddIcon,
  EditIcon,
  OrgSchemaIcon,
  TickIcon,
  TrashIcon,
} from "@/src/shared/assets/icons";
import { subtitle } from "@/components/primitives";
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

  const setSchemaInputValue = useOrgschemaMenu(
    (state) => state.setSchemaInputValue,
  );
  const schemaInputValue = useOrgschemaMenu((state) => state.schemaInputValue);
  const schemaName = useOrgschemaMenu((state) => state.schemaName);
  const selectedBlock = useOrgschemaMenu((state) => state.selectedBlock);

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
    onChangeParentBlock,
    onChangeIsTogether,
    onClearColor,
    updateBlock,
    cancelCreateEmpty,
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

  useEffect(() => {
    setSchemaInputValue(schemaName);
  }, [schemaName]);

  const handleCreateNewBlock = () => {
    setManageScreen(IManageScreen.CREATE_EMPTY);
  };

  const setEditInputActive = () => {
    handleEditSchema();
  };

  const handleUpdateSchema = () => {
    if (!schemaInputValue || schemaInputValue === "") {
      toast.error("Необходимо ввести название схемы");

      inputRef.current?.focus();

      return;
    }

    if (schemaName === schemaInputValue) {
      toast.error("Новое название схемы должно отличаться от текущего");
      inputRef.current?.focus();

      return;
    }
    updateSchema();
  };

  const onChangeInputSchema = (e: ChangeEvent<HTMLInputElement>) => {
    setSchemaInputValue(e.target.value);
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

        case IManageScreen.CREATE_EMPTY:
          return (
            <BlockForm
              cancel={cancelCreateEmpty}
              cancelTitle="Отменить создание"
              formTitle="Создание первого блока"
              handleBlock={createBlock}
              handleTitle="Создать первый блок"
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
        case IManageScreen.CREATE:
          return (
            <BlockForm
              cancel={cancelUpdate}
              cancelTitle="Отменить создание"
              formTitle="Создание блока"
              handleBlock={createBlock}
              handleTitle="Создать блок"
              isReadOnly={false}
              type="create"
              onChangeCloud={onChangeCloud}
              onChangeColor={onChangeColor}
              onChangeDescription={onChangeDescription}
              onChangeDescriptionSecondary={onChangeDescriptionSecondary}
              onChangeIsTogether={onChangeIsTogether}
              onChangeMail={onChangeMail}
              onChangeName={onChangeName}
              onChangeParentBlock={onChangeParentBlock}
              onChangeSort={onChangeSort}
              onClearColor={onClearColor}
            />
          );

        case IManageScreen.MANAGE:
          return <OrgschemaMenuManageBlock />;

        case IManageScreen.UPDATE:
          return (
            <BlockForm
              cancel={cancelUpdate}
              cancelTitle="Отменить редактирование"
              data={selectedBlock}
              formTitle="Редактирование блока"
              handleBlock={updateBlock}
              handleTitle="Редактировать блок"
              isReadOnly={false}
              type="update"
              onChangeCloud={onChangeCloud}
              onChangeColor={onChangeColor}
              onChangeDescription={onChangeDescription}
              onChangeDescriptionSecondary={onChangeDescriptionSecondary}
              onChangeIsTogether={onChangeIsTogether}
              onChangeMail={onChangeMail}
              onChangeName={onChangeName}
              onChangeParentBlock={onChangeParentBlock}
              onChangeSort={onChangeSort}
              onClearColor={onClearColor}
            />
          );

        case IManageScreen.USER:
          return <ActionManageScreenUser />;

        case IManageScreen.FILE:
          return <ActionManageScreenFile />;

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
    [currentManageScreen, selectedBlock],
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

  return (
    <div className="h-full flex flex-col z-10 justify-between gap-5">
      <div className="w-full flex flex-row gap-6 items-end justify-between">
        <Input
          ref={inputRef}
          isReadOnly={isSchemaInputReadonly}
          label="Название оргсхемы"
          labelPlacement="outside"
          startContent={<OrgSchemaIcon className="text-primary" />}
          value={schemaInputValue}
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
