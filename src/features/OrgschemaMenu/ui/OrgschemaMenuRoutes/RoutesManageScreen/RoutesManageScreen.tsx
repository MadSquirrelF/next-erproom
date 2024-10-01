"use client";
import { Button } from "@nextui-org/button";
import { Card, CardBody } from "@nextui-org/card";
import { Input, Textarea } from "@nextui-org/input";
import { Popover, PopoverContent, PopoverTrigger } from "@nextui-org/popover";
import { Tooltip } from "@nextui-org/tooltip";
import { memo, useCallback } from "react";

import {
  IRouteScreen,
  useOrgschemaMenu,
} from "../../../model/store/orgschemaMenu";

import {
  AddIcon,
  DocumentEmptyIcon,
  EditIcon,
  RoutesIcon,
  TickIcon,
  TrashIcon,
} from "@/src/shared/assets/icons";
import { subtitle, title } from "@/components/primitives";
import { InProgressBg } from "@/src/shared/assets/InProgressBg/InProgressBg";

interface RoutesManageScreenProps {
  className?: string;
}

export const RoutesManageScreen = memo((props: RoutesManageScreenProps) => {
  const { className } = props;

  const routeName = useOrgschemaMenu((state) => state.routeName);

  const routeDescription = useOrgschemaMenu((state) => state.routeDescription);

  const setCurrentRouteScreen = useOrgschemaMenu(
    (state) => state.setCurrentRouteScreen,
  );
  const setActiveRouteId = useOrgschemaMenu((state) => state.setActiveRouteId);

  const handleChooseRoutes = () => {
    setCurrentRouteScreen(IRouteScreen.LIST);
    setActiveRouteId(undefined);
  };

  const renderEditButton = useCallback((isSchemaInputReadonly: boolean) => {
    switch (isSchemaInputReadonly) {
      case false:
        return (
          <Tooltip color="primary" content="Подтвердить?">
            <Button
              isDisabled
              isIconOnly
              color="primary"
              id="confirmUpdateSchemaButton"
              // onClick={handleUpdateSchema}
            >
              <TickIcon />
            </Button>
          </Tooltip>
        );
      case true:
        return (
          <Tooltip content="Редактировать маршрут">
            <Button
              isDisabled
              isIconOnly
              color="primary"
              variant="faded"
              // onClick={setEditInputActive}
            >
              <EditIcon />
            </Button>
          </Tooltip>
        );

      default:
        return (
          <Tooltip content="Редактировать маршрут">
            <Button
              isDisabled
              isIconOnly
              color="primary"
              variant="faded"
              // onClick={setEditInputActive}
            >
              <EditIcon />
            </Button>
          </Tooltip>
        );
    }
  }, []);

  return (
    <div className="flex flex-col items-center justify-between gap-4 w-full h-full">
      <div className="w-full flex flex-col gap-6 items-end">
        <div className="flex flex-col gap-3 w-full">
          <Input
            fullWidth
            isReadOnly
            label="Название маршрута"
            labelPlacement="outside"
            size="sm"
            startContent={<RoutesIcon className="text-primary" />}
            value={routeName}
            variant="underlined"
          />

          <Textarea
            fullWidth
            isReadOnly
            label="Описание маршрута"
            labelPlacement="outside"
            maxRows={3}
            size="sm"
            startContent={<DocumentEmptyIcon className="text-primary" />}
            value={routeDescription}
            variant="underlined"
          />
        </div>

        <div className="flex flex-row gap-2 items-center">
          {renderEditButton(true)}
          <Popover
            showArrow
            backdrop="opaque"
            //!!!!!!!! false
            isOpen={false}
            offset={20}
            placement="bottom-end"
          >
            <PopoverTrigger>
              <Button isDisabled isIconOnly color="danger" variant="faded">
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
                  Это действие удалит маршрут и все его содержимые шаги без
                  возможности востановить!
                </p>
              </div>

              <div className="flex flex-row gap-2 w-full">
                <Button
                  fullWidth
                  color="danger"
                  startContent={<TrashIcon />}
                  // onClick={handleDeleteSchema}
                >
                  Удалить
                </Button>
                <Button
                  fullWidth
                  color="default"
                  variant="faded"
                  // onClick={() => setIsDeletedPopoverOpen(false)}
                >
                  Отмена
                </Button>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>

      <div className="flex flex-col gap-3 items-center">
        <InProgressBg className="text-warning" size={300} />

        <p
          className={title({
            size: "tiny",
            color: "yellow",
          })}
        >
          Модуль находится в разработке...
        </p>
      </div>
      <div className="flex flex-none flex-row mt-5 h-28 w-full gap-2">
        <Card
          isBlurred
          isPressable
          className="h-full w-full"
          onClick={handleChooseRoutes}
        >
          <CardBody className="relative">
            <span
              className={subtitle({
                size: "tiny",
                color: "default",
              })}
            >
              Выбрать маршрут
            </span>
            <RoutesIcon
              className="absolute text-primary bottom-2 right-2"
              size={45}
            />
          </CardBody>
        </Card>
        <Card isBlurred isDisabled isPressable className="h-full w-full">
          <CardBody className="relative">
            <span
              className={subtitle({
                size: "tiny",
                color: "default",
              })}
            >
              Добавить шаг
            </span>
            <AddIcon
              className="absolute text-primary bottom-2 right-2"
              size={45}
            />
          </CardBody>
        </Card>
        <Card isBlurred isDisabled isPressable className="h-full w-full">
          <CardBody className="relative">
            <span
              className={subtitle({
                size: "tiny",
                color: "default",
              })}
            >
              Редактировать шаг
            </span>
            <EditIcon
              className="absolute text-primary bottom-2 right-2"
              size={45}
            />
          </CardBody>
        </Card>
      </div>
    </div>
  );
});
