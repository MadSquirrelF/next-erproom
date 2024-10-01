"use client";
import { Button } from "@nextui-org/button";
import { memo, useCallback } from "react";
import { CSSTransition, SwitchTransition } from "react-transition-group";

import { useUpdateRoute } from "../../../model/hooks/useUpdateRoute";

import { CreateRouteForm } from "./CreateRouteForm/CreateRouteForm";

import { AddIcon } from "@/src/shared/assets/icons";
import { subtitle } from "@/components/primitives";
import { RoutesStartBg } from "@/src/shared/assets/RoutesStartBg/RoutesStartBg";

interface RoutesEmptyScreenProps {
  className?: string;
}

export const RoutesEmptyScreen = memo((props: RoutesEmptyScreenProps) => {
  const { className } = props;

  const {
    routeName,
    routeDescription,
    onChangeRouteDescription,
    onChangeRouteName,
    isCreateFormOpen,
    handleCloseForm,
    handleOpenForm,
    onSubmitCreateRouteForm,
  } = useUpdateRoute();

  const renderActions = useCallback(
    (isCreateFormOpen: boolean) => {
      switch (isCreateFormOpen) {
        case true:
          return (
            <CreateRouteForm
              cancel={handleCloseForm}
              routeDescription={routeDescription}
              routeName={routeName}
              submit={onSubmitCreateRouteForm}
              onChangeRouteDescription={onChangeRouteDescription}
              onChangeRouteName={onChangeRouteName}
            />
          );
        case false:
          return (
            <Button
              fullWidth
              color="primary"
              endContent={<AddIcon size={30} />}
              size="lg"
              variant="faded"
              onClick={handleOpenForm}
            >
              Создать новый маршрут
            </Button>
          );
        default:
          return (
            <Button
              fullWidth
              color="primary"
              endContent={<AddIcon size={30} />}
              size="lg"
              variant="faded"
              onClick={handleOpenForm}
            >
              Создать новый маршрут
            </Button>
          );
      }
    },
    [
      isCreateFormOpen,
      routeName,
      routeDescription,
      onChangeRouteDescription,
      onChangeRouteName,
      onSubmitCreateRouteForm,
    ],
  );

  return (
    <div className="flex flex-col items-center justify-between gap-4 w-full h-full">
      <div className="flex flex-col gap-4 w-full justify-center items-center">
        <RoutesStartBg className="text-primary" size={300} />
        <h4 className={`text-foreground text-2xl`}>Маршруты не найдены.</h4>
        <p
          className={subtitle({
            size: "sm",
            align: "center",
          })}
        >
          Похоже, что маршруты еще никто не создавал до вас.
          <p>Но вы будете первым!</p>
        </p>
      </div>

      <SwitchTransition mode="out-in">
        <CSSTransition
          key={isCreateFormOpen ? "form" : "button"}
          unmountOnExit
          classNames="fade"
          timeout={300}
        >
          {renderActions(isCreateFormOpen)}
        </CSSTransition>
      </SwitchTransition>
    </div>
  );
});
