"use client";
import { memo, useCallback, useEffect, useRef } from "react";
import { CSSTransition, SwitchTransition } from "react-transition-group";
import { Button } from "@nextui-org/button";
import { Autocomplete, AutocompleteItem } from "@nextui-org/autocomplete";
import { Kbd } from "@nextui-org/kbd";
import { Skeleton } from "@nextui-org/skeleton";

import { useUpdateRoute } from "../../../model/hooks/useUpdateRoute";
import { CreateRouteForm } from "../RoutesEmptyScreen/CreateRouteForm/CreateRouteForm";
import { useRoutesListbox } from "../../../model/hooks/useRoutesListbox";
import {
  IRouteScreen,
  useOrgschemaMenu,
} from "../../../model/store/orgschemaMenu";

import {
  AddIcon,
  CloudActionIcon,
  GlobalRefreshIcon,
  RoutesIcon,
} from "@/src/shared/assets/icons";
import { ErrorBg } from "@/src/shared/assets/ErrorBg/ErrorBg";
import { subtitle } from "@/components/primitives";

interface RoutesListScreenProps {
  className?: string;
}

export const RoutesListScreen = memo((props: RoutesListScreenProps) => {
  const { className } = props;
  const inputRef = useRef<HTMLInputElement>(null);

  const setCurrentRouteScreen = useOrgschemaMenu(
    (state) => state.setCurrentRouteScreen,
  );
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

  const {
    data,
    isLoading,
    isError,
    error,
    selectedRoute,
    activeRouteId,
    handleLoadRoute,
    handleSelectRoute,
  } = useRoutesListbox();

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === "m" && (event.metaKey || event.ctrlKey)) {
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
            <div className="flex flex-col gap-2 w-full">
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
              <Button
                fullWidth
                color="primary"
                endContent={<CloudActionIcon size={30} />}
                isDisabled={!selectedRoute}
                size="lg"
                onClick={handleLoadRoute}
              >
                Загрузить маршрут
              </Button>
            </div>
          );
        default:
          return (
            <div className="flex flex-col gap-2 w-full">
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
              <Button
                fullWidth
                color="primary"
                endContent={<CloudActionIcon size={30} />}
                size="lg"
                onClick={handleOpenForm}
              >
                Загрузить маршрут
              </Button>
            </div>
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
      handleLoadRoute,
      selectedRoute,
    ],
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
            Произошла ошибка при загрузке маршрутов!
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
    setCurrentRouteScreen(IRouteScreen.CREATE_EMPTY);

    return null;
  }

  return (
    <div className="flex flex-col items-center justify-between gap-4 w-full h-full">
      <Autocomplete
        ref={inputRef}
        isClearable
        isRequired
        endContent={<Kbd keys={["command"]}>M</Kbd>}
        label="Выберите активный маршрут"
        labelPlacement="outside"
        placeholder="Выберите маршрут"
        selectedKey={String(selectedRoute)}
        size="lg"
        startContent={<RoutesIcon className="text-primary" />}
        onSelectionChange={handleSelectRoute}
      >
        {data.map((schema) => (
          <AutocompleteItem
            key={schema.id}
            startContent={<RoutesIcon />}
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
