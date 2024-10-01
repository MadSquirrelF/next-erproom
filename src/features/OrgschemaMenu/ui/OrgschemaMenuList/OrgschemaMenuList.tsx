"use client";
import { Button } from "@nextui-org/button";
import { ChangeEvent, memo, useCallback, useEffect, useRef } from "react";
import { Input } from "@nextui-org/input";
import { CSSTransition, SwitchTransition } from "react-transition-group";
import { Autocomplete, AutocompleteItem } from "@nextui-org/autocomplete";
import { Kbd, Skeleton } from "@nextui-org/react";

import { useOrgschemaMenu } from "../../model/store/orgschemaMenu";
import { useUpdateSchema } from "../../model/hooks/useUpdateSchema";
import { useOrgschemaMenuListbox } from "../../model/hooks/useOrgschemaMenuListbox";

import {
  AddIcon,
  CloudActionIcon,
  GlobalRefreshIcon,
  OrgSchemaIcon,
} from "@/src/shared/assets/icons";
import { ErrorBg } from "@/src/shared/assets/ErrorBg/ErrorBg";
import { subtitle } from "@/components/primitives";
import { OrgschemaStartBg } from "@/src/shared/assets/OrgschemaStartBg/OrgschemaStartBg";

interface OrgschemaMenuListProps {
  className?: string;
}

export const OrgschemaMenuList = memo((props: OrgschemaMenuListProps) => {
  const { className } = props;
  const inputRef = useRef<HTMLInputElement>(null);
  const setSchemaInputValue = useOrgschemaMenu(
    (state) => state.setSchemaInputValue,
  );

  const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    setSchemaInputValue(e.currentTarget.value);
  };

  const schemaInputValue = useOrgschemaMenu((state) => state.schemaInputValue);

  const {
    isCreatePopoverOpen,
    handleSetIsCreatePopoverOpen,
    handleSetIsCreatePopoverClose,
    handleCreateSchema,
  } = useUpdateSchema();

  const {
    data,
    isLoading,
    isError,
    error,
    selectedSchema,
    handleLoadSchema,
    activeSchemaId,
    handleSelectSchema,
  } = useOrgschemaMenuListbox();

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === "b" && (event.metaKey || event.ctrlKey)) {
      event.preventDefault(); // Отключаем стандартное поведение
      inputRef.current?.focus(); // Устанавливаем фокус на input
    }
  };

  function refreshPage() {
    window.location.reload();
  }

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown); // Добавляем обработчик события

    return () => {
      window.removeEventListener("keydown", handleKeyDown); // Убираем обработчик при размонтировании
    };
  }, []);

  const renderActions = useCallback(
    (isCreatePopoverOpen: boolean) => {
      switch (isCreatePopoverOpen) {
        case true:
          return (
            <form className="flex flex-col gap-2" onSubmit={handleCreateSchema}>
              <Input
                isRequired
                label="Введите название схемы"
                size="lg"
                value={schemaInputValue}
                onChange={onChangeInput}
              />

              <div className="flex flex-row w-full gap-2">
                <Button
                  fullWidth
                  color="danger"
                  size="lg"
                  variant="faded"
                  onClick={handleSetIsCreatePopoverClose}
                >
                  Отменить
                </Button>
                <Button
                  fullWidth
                  color="primary"
                  endContent={<AddIcon />}
                  isDisabled={!schemaInputValue}
                  size="lg"
                  type="submit"
                >
                  Создать схему
                </Button>
              </div>
            </form>
          );

        case false:
          return (
            <div className="flex flex-col gap-2 w-full">
              <Button
                color="primary"
                endContent={<AddIcon size={30} />}
                size="lg"
                variant="faded"
                onClick={handleSetIsCreatePopoverOpen}
              >
                Создать новую схему
              </Button>
              <Button
                fullWidth
                color="primary"
                endContent={<CloudActionIcon size={30} />}
                isDisabled={!selectedSchema}
                size="lg"
                onClick={handleLoadSchema}
              >
                Загрузить cхему
              </Button>
            </div>
          );

        default:
          return (
            <div className="flex flex-col gap-2 w-full">
              <Button
                color="primary"
                endContent={<AddIcon size={30} />}
                size="lg"
                variant="faded"
                onClick={handleSetIsCreatePopoverOpen}
              >
                Создать новую схему
              </Button>
              <Button
                fullWidth
                color="primary"
                endContent={<CloudActionIcon size={30} />}
                isDisabled={!selectedSchema}
                size="lg"
                onClick={handleLoadSchema}
              >
                Загрузить cхему
              </Button>
            </div>
          );
      }
    },
    [isCreatePopoverOpen, schemaInputValue, selectedSchema, handleLoadSchema],
  );

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-between gap-4 w-full h-full">
        <div className="flex flex-col gap-2 w-full">
          <Skeleton className="rounded-lg h-3 w-1/3" />
          <Skeleton className="rounded-lg h-12 w-full" />
        </div>

        <div className="flex flex-col gap-2 w-full">
          <Skeleton className="rounded-xl w-full h-12" />
          <Skeleton className="rounded-xl w-full h-12" />
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-between gap-4 w-full h-full">
        <div className="flex flex-col gap-2 w-full items-center justify-center h-full">
          <ErrorBg className="text-danger" size={400} />
          <p
            className={subtitle({
              size: "sm",
              color: "default",
              align: "center",
            })}
          >
            Произошла ошибка при загрузке cхем!
            <p
              className={subtitle({
                size: "tiny",
                align: "center",
              })}
            >
              {error?.message ? error.message : "Ошибка"}
            </p>
          </p>
        </div>

        <Button
          fullWidth
          color="danger"
          size="lg"
          startContent={<GlobalRefreshIcon />}
          onClick={refreshPage}
        >
          Обновить страницу
        </Button>
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="flex flex-col flex-grow justify-between">
        <div className="flex flex-col gap-4 w-full justify-center items-center">
          <OrgschemaStartBg className="text-primary" size={300} />
          <h4 className={`text-foreground text-2xl`}>Cхемы не найдены.</h4>
          <p
            className={subtitle({
              size: "sm",
              align: "center",
            })}
          >
            Похоже, что схемы еще никто не создавал до вас.
            <p>Но вы будете первым!</p>
          </p>
        </div>
        <SwitchTransition mode="out-in">
          <CSSTransition
            key={isCreatePopoverOpen ? "form" : "buttons"}
            unmountOnExit
            classNames="fade"
            timeout={300}
          >
            {renderActions(isCreatePopoverOpen)}
          </CSSTransition>
        </SwitchTransition>
      </div>
    );
  }

  return (
    <div className="flex flex-col flex-grow justify-between">
      <Autocomplete
        ref={inputRef}
        isClearable
        isRequired
        disabledKeys={activeSchemaId ? [String(activeSchemaId)] : undefined}
        endContent={<Kbd keys={["command"]}>B</Kbd>}
        label="Выберите схему"
        labelPlacement="outside"
        placeholder="Выберите схему"
        selectedKey={String(selectedSchema)}
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

      <SwitchTransition mode="out-in">
        <CSSTransition
          key={isCreatePopoverOpen ? "form" : "buttons"}
          unmountOnExit
          classNames="fade"
          timeout={300}
        >
          {renderActions(isCreatePopoverOpen)}
        </CSSTransition>
      </SwitchTransition>
    </div>
  );
});
