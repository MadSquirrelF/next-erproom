"use client";
import { Button } from "@nextui-org/button";
import { ChangeEvent, memo, useCallback } from "react";
import { Input } from "@nextui-org/input";
import { CSSTransition, SwitchTransition } from "react-transition-group";

import { useOrgschemaMenu } from "../../model/store/orgschemaMenu";
import { useUpdateSchema } from "../../model/hooks/useUpdateSchema";

import { OrgschemaListbox } from "./OrgschemaListbox/OrgschemaListbox";

import { AddIcon } from "@/src/shared/assets/icons";

interface OrgschemaMenuListProps {
  className?: string;
}

export const OrgschemaMenuList = memo((props: OrgschemaMenuListProps) => {
  const { className } = props;

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
            <div className="flex flex-col gap-2">
              <Button
                color="primary"
                endContent={<AddIcon size={30} />}
                size="lg"
                variant="faded"
                onClick={handleSetIsCreatePopoverOpen}
              >
                Создать новую схему
              </Button>
            </div>
          );

        default:
          return (
            <div className="flex flex-col gap-2">
              <Button
                color="primary"
                endContent={<AddIcon size={30} />}
                size="lg"
                variant="faded"
                onClick={handleSetIsCreatePopoverOpen}
              >
                Создать новую схему
              </Button>
            </div>
          );
      }
    },
    [isCreatePopoverOpen, schemaInputValue],
  );

  return (
    <div className="flex flex-col flex-grow justify-between">
      <div className="flex flex-col gap-6">
        <OrgschemaListbox />
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
});
