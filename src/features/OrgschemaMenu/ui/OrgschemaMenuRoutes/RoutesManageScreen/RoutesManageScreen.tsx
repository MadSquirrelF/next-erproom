"use client";
import { Card, CardBody } from "@nextui-org/card";
import { memo, useCallback } from "react";
import { Tooltip } from "@nextui-org/tooltip";
import { Chip } from "@nextui-org/chip";
import { CSSTransition, SwitchTransition } from "react-transition-group";
import { Textarea } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import toast from "react-hot-toast";
import clsx from "clsx";
import { Popover, PopoverContent, PopoverTrigger } from "@nextui-org/popover";

import {
  IRouteScreen,
  useOrgschemaMenu,
} from "../../../model/store/orgschemaMenu";
import { useUpdateRoute } from "../../../model/hooks/useUpdateRoute";
import { CreateRouteForm } from "../RoutesEmptyScreen/CreateRouteForm/CreateRouteForm";
import { useUpdateFlowStep } from "../../../model/hooks/useUpdateFlowStep";

import styles from "./RouteManageScreen.module.scss";

import {
  CopyIcon,
  DateCrateIcon,
  DateEditIcon,
  DocsIcon,
  DocTextIcon,
  EditIcon,
  EditStepIcon,
  RoutesIcon,
  StepIcon,
  TrashIcon,
} from "@/src/shared/assets/icons";
import { subtitle } from "@/components/primitives";
import { SelectCurrentStepBg } from "@/src/shared/assets/SelectCurrentStepBg/SelectCurrentStepBg";
import {
  IFlowStepNoChildren,
  IRouteAction,
} from "@/src/entities/Route/model/types/route";
import { getTimeDifferenceFromCreationDate } from "@/src/shared/utils/Date/Date";
import { getDocumentStatusWithColor } from "@/src/shared/utils/routeFunctions/routeFunctions";
interface RoutesManageScreenProps {
  className?: string;
}

export const RoutesManageScreen = memo((props: RoutesManageScreenProps) => {
  const { className } = props;

  const {
    handleDeleteRoute,
    isDeletedPopoverOpen,
    setIsDeletedPopoverOpen,
    routeAction,
    routeName: nameValue,
    routeDescription: descriptionValue,
    handleCreateAction,
    onChangeRouteDescription,
    onChangeRouteName,
    handleClearAction,
    onSubmitUpdateRouteForm,
    handleUpdateAction,
    onSubmitCreateRouteForm,
  } = useUpdateRoute();

  const {
    isDeletedPopoverFlowStepOpen,
    setIsDeletedPopoverFlowStepOpen,
    handleDeleteFlowStep,
  } = useUpdateFlowStep();

  const routeName = useOrgschemaMenu((state) => state.routeName);

  const routeDescription = useOrgschemaMenu((state) => state.routeDescription);
  const isRouteEmpty = useOrgschemaMenu((state) => state.isRouteEmpty);
  const setCurrentRouteScreen = useOrgschemaMenu(
    (state) => state.setCurrentRouteScreen,
  );
  const setActiveRouteId = useOrgschemaMenu((state) => state.setActiveRouteId);

  const selectedFlowStep = useOrgschemaMenu((state) => state.selectedFlowStep);
  const setSelectedFlowStep = useOrgschemaMenu(
    (state) => state.setSelectedFlowStep,
  );
  const handleCopyText = (text: string | undefined) => {
    if (text) {
      navigator.clipboard.writeText(text);
      toast.success("Текст скопирован!");
    }
  };

  const isCreateFlowStepButtonDisabled = () => {
    if (selectedFlowStep && selectedFlowStep.all_flow_step_next.length === 0) {
      return false;
    }

    return true;
  };

  const handleChooseRoutes = () => {
    setCurrentRouteScreen(IRouteScreen.LIST);
    setActiveRouteId(undefined);
    setSelectedFlowStep(undefined);
  };

  const handleOpenCreateFlowStepScreen = () => {
    setCurrentRouteScreen(IRouteScreen.CREATE);
  };

  const handleOpenUpdateFlowStepScreen = () => {
    setCurrentRouteScreen(IRouteScreen.UPDATE);
  };

  const handleOpenCreateEmptyFlowStepScreen = () => {
    setCurrentRouteScreen(IRouteScreen.CREATE_EMPTY);
  };

  const renderInfo = useCallback(
    (selectedFlowStep: IFlowStepNoChildren | undefined) => {
      switch (selectedFlowStep) {
        case undefined:
          return (
            <div className="flex flex-col items-center w-full h-full">
              <SelectCurrentStepBg className="text-primary" size={300} />

              <p
                className={subtitle({
                  size: "tiny",
                  align: "center",
                  color: "default",
                })}
              >
                Выберите шаг маршрута, чтобы работать с ним.
              </p>
            </div>
          );

        default:
          return (
            <div className="flex flex-col gap-4 w-full h-full justify-center">
              <div className="w-full flex flex-row gap-4 items-center justify-between">
                <Tooltip color="success" content="Шаг создан">
                  <Chip
                    className="w-full"
                    color="success"
                    startContent={<DateCrateIcon size={20} />}
                    variant="faded"
                  >
                    {getTimeDifferenceFromCreationDate(
                      selectedFlowStep.created_at,
                    )}
                  </Chip>
                </Tooltip>
                {selectedFlowStep.first_step && (
                  <Chip
                    color="success"
                    startContent={<StepIcon size={20} />}
                    variant="faded"
                  >
                    Первый шаг
                  </Chip>
                )}
                <Tooltip color="warning" content="Последний раз обновлен">
                  <Chip
                    color="warning"
                    startContent={<DateEditIcon size={20} />}
                    variant="faded"
                  >
                    {getTimeDifferenceFromCreationDate(
                      selectedFlowStep.updated_at,
                    )}
                  </Chip>
                </Tooltip>
              </div>
              <div className="flex flex-col gap-2">
                <Textarea
                  isReadOnly
                  endContent={
                    <Tooltip content="Копировать описание">
                      <Button
                        isIconOnly
                        size="sm"
                        variant="flat"
                        onClick={() =>
                          handleCopyText(selectedFlowStep.description)
                        }
                      >
                        <CopyIcon size={20} />
                      </Button>
                    </Tooltip>
                  }
                  label="Описание шага"
                  labelPlacement="outside"
                  value={
                    selectedFlowStep.description
                      ? selectedFlowStep.description
                      : "Описание отсутсвует"
                  }
                />

                <div className="flex flex-row w-full gap-2 items-center">
                  <Card isBlurred className="w-80">
                    <CardBody>
                      <p
                        className={subtitle({
                          size: "tiny",
                          color: "default",
                          lineCamp: "one",
                        })}
                      >
                        {selectedFlowStep.before_block.name}
                      </p>
                    </CardBody>
                  </Card>

                  <div className="w-full">
                    <div className="flex flex-row justify-start items-center">
                      <Chip color="success" size="sm" variant="dot">
                        Успех
                      </Chip>
                    </div>

                    <span className={clsx(styles.line, "after:bg-success")} />
                    <div className="flex flex-row justify-end items-center">
                      <Chip
                        color={
                          getDocumentStatusWithColor(
                            selectedFlowStep.setting.success_status,
                          ).color
                        }
                        size="sm"
                        startContent={<DocsIcon size={16} />}
                        variant="faded"
                      >
                        {
                          getDocumentStatusWithColor(
                            selectedFlowStep.setting.success_status,
                          ).status
                        }
                      </Chip>
                    </div>
                  </div>

                  <Card isBlurred className="w-80">
                    <CardBody>
                      <p
                        className={subtitle({
                          size: "tiny",
                          color: "default",
                          lineCamp: "one",
                        })}
                      >
                        {selectedFlowStep.after_block.name}
                      </p>
                    </CardBody>
                  </Card>
                </div>

                <div className="flex flex-row w-full gap-2 items-center">
                  <Card isBlurred className="w-80">
                    <CardBody>
                      <p
                        className={subtitle({
                          size: "tiny",
                          color: "default",
                          lineCamp: "one",
                        })}
                      >
                        {selectedFlowStep.before_block.name}
                      </p>
                    </CardBody>
                  </Card>

                  <div className="w-full">
                    <div className="flex flex-row justify-start items-center">
                      <Chip color="danger" size="sm" variant="dot">
                        Неудача
                      </Chip>
                    </div>

                    <span className={clsx(styles.line, "after:bg-danger")} />
                    <div className="flex flex-row justify-end items-center">
                      <Chip
                        color={
                          getDocumentStatusWithColor(
                            selectedFlowStep.setting.fail_status,
                          ).color
                        }
                        size="sm"
                        startContent={<DocsIcon size={16} />}
                        variant="faded"
                      >
                        {
                          getDocumentStatusWithColor(
                            selectedFlowStep.setting.fail_status,
                          ).status
                        }
                      </Chip>
                    </div>
                  </div>

                  <div className="w-80 flex flex-row justify-center items-center">
                    {selectedFlowStep.setting.fail_step === null && (
                      <Chip color="danger" size="lg" variant="flat">
                        Конец
                      </Chip>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
      }
    },
    [selectedFlowStep],
  );

  const renderActions = useCallback(
    (routeAction: IRouteAction) => {
      switch (routeAction) {
        case IRouteAction.ADD:
          return (
            <CreateRouteForm
              cancel={handleClearAction}
              routeDescription={descriptionValue}
              routeName={nameValue}
              submit={onSubmitCreateRouteForm}
              type="create"
              onChangeRouteDescription={onChangeRouteDescription}
              onChangeRouteName={onChangeRouteName}
            />
          );
        case IRouteAction.UPDATE:
          return (
            <CreateRouteForm
              cancel={handleClearAction}
              routeDescription={descriptionValue}
              routeName={nameValue}
              submit={onSubmitUpdateRouteForm}
              type="update"
              onChangeRouteDescription={onChangeRouteDescription}
              onChangeRouteName={onChangeRouteName}
            />
          );

        case IRouteAction.NONE:
          return (
            <div className="flex flex-none flex-col h-64 w-full gap-2">
              <Card
                isBlurred
                isPressable
                className="w-full"
                onPress={handleChooseRoutes}
              >
                <CardBody className="flex flex-row gap-3 items-center">
                  <RoutesIcon className="text-primary" size={30} />
                  <span
                    className={subtitle({
                      size: "tiny",
                      color: "default",
                    })}
                  >
                    Выбрать маршрут
                  </span>
                </CardBody>
              </Card>

              {isRouteEmpty ? (
                <Card
                  isBlurred
                  isPressable
                  className="w-full h-24"
                  onPress={handleOpenCreateEmptyFlowStepScreen}
                >
                  <CardBody className="flex flex-row gap-3 items-center">
                    <StepIcon className="text-primary" size={30} />
                    <span
                      className={subtitle({
                        size: "tiny",
                        color: "default",
                      })}
                    >
                      Создать первый шаг
                    </span>
                  </CardBody>
                </Card>
              ) : (
                <div className="flex flex-row gap-2 h-24">
                  <Card
                    isBlurred
                    className="h-full w-full"
                    isDisabled={isCreateFlowStepButtonDisabled()}
                    isPressable={!isCreateFlowStepButtonDisabled()}
                    onPress={handleOpenCreateFlowStepScreen}
                  >
                    <CardBody className="relative">
                      <span
                        className={subtitle({
                          size: "tiny",
                          color: "default",
                        })}
                      >
                        Создать шаг
                      </span>
                      <StepIcon
                        className="absolute text-primary bottom-2 right-2"
                        size={45}
                      />
                    </CardBody>
                  </Card>
                  <Card
                    isBlurred
                    className="h-full w-full"
                    isDisabled={!selectedFlowStep}
                    isPressable={!!selectedFlowStep}
                    onPress={handleOpenUpdateFlowStepScreen}
                  >
                    <CardBody className="relative">
                      <span
                        className={subtitle({
                          size: "tiny",
                          color: "default",
                        })}
                      >
                        Редактировать шаг
                      </span>
                      <EditStepIcon
                        className="absolute text-primary bottom-2 right-2"
                        size={45}
                      />
                    </CardBody>
                  </Card>
                  <Popover
                    backdrop="opaque"
                    isOpen={isDeletedPopoverFlowStepOpen}
                    onOpenChange={(open) =>
                      setIsDeletedPopoverFlowStepOpen(open)
                    }
                  >
                    <PopoverTrigger>
                      <Card
                        isBlurred
                        className="h-full w-full"
                        isDisabled={!selectedFlowStep}
                        isPressable={!!selectedFlowStep}
                      >
                        <CardBody className="relative">
                          <span
                            className={subtitle({
                              size: "tiny",
                              color: "default",
                            })}
                          >
                            Удалить шаг
                          </span>
                          <TrashIcon
                            className="absolute text-danger bottom-2 right-2"
                            size={45}
                          />
                        </CardBody>
                      </Card>
                    </PopoverTrigger>
                    <PopoverContent className="flex flex-col gap-8 items-center p-4 max-w-96">
                      <div className="flex flex-col text-center items-center w-full">
                        <h5 className="text-danger font-bold text-2xl">
                          Вы уверены?
                        </h5>
                        <p
                          className={subtitle({
                            size: "tiny",
                            color: "default",
                            align: "center",
                          })}
                        >
                          Это действие удалит шаг и все его содержимое без
                          возможности востановить!
                        </p>
                      </div>

                      <div className="flex flex-row gap-2 w-full">
                        <Button
                          fullWidth
                          color="danger"
                          startContent={<TrashIcon />}
                          onClick={handleDeleteFlowStep}
                        >
                          Удалить
                        </Button>
                        <Button
                          fullWidth
                          color="default"
                          variant="faded"
                          onClick={() => setIsDeletedPopoverFlowStepOpen(false)}
                        >
                          Отмена
                        </Button>
                      </div>
                    </PopoverContent>
                  </Popover>
                </div>
              )}

              <div className="flex flex-row gap-2 h-24">
                <Card
                  isBlurred
                  isPressable
                  className="h-full w-full"
                  onClick={handleCreateAction}
                >
                  <CardBody className="relative">
                    <span
                      className={subtitle({
                        size: "tiny",
                        color: "default",
                      })}
                    >
                      Создать новый маршрут
                    </span>
                    <RoutesIcon
                      className="absolute text-primary bottom-2 right-2"
                      size={45}
                    />
                  </CardBody>
                </Card>
                <Card
                  isBlurred
                  isPressable
                  className="h-full w-full"
                  onClick={handleUpdateAction}
                >
                  <CardBody className="relative">
                    <span
                      className={subtitle({
                        size: "tiny",
                        color: "default",
                      })}
                    >
                      Редактировать маршрут
                    </span>
                    <EditIcon
                      className="absolute text-primary bottom-2 right-2"
                      size={45}
                    />
                  </CardBody>
                </Card>
                <Popover
                  backdrop="opaque"
                  isOpen={isDeletedPopoverOpen}
                  onOpenChange={(open) => setIsDeletedPopoverOpen(open)}
                >
                  <PopoverTrigger>
                    <Card isBlurred isPressable className="h-full w-full">
                      <CardBody className="relative">
                        <span
                          className={subtitle({
                            size: "tiny",
                            color: "default",
                          })}
                        >
                          Удалить маршрут
                        </span>
                        <TrashIcon
                          className="absolute text-danger bottom-2 right-2"
                          size={45}
                        />
                      </CardBody>
                    </Card>
                  </PopoverTrigger>
                  <PopoverContent className="flex flex-col gap-8 items-center p-4 max-w-96">
                    <div className="flex flex-col text-center items-center w-full">
                      <h5 className="text-danger font-bold text-2xl">
                        Вы уверены?
                      </h5>
                      <p
                        className={subtitle({
                          size: "tiny",
                          color: "default",
                          align: "center",
                        })}
                      >
                        Это действие удалит маршрут и все его содержимое без
                        возможности востановить!
                      </p>
                    </div>

                    <div className="flex flex-row gap-2 w-full">
                      <Button
                        fullWidth
                        color="danger"
                        startContent={<TrashIcon />}
                        onClick={handleDeleteRoute}
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
          );
        default:
          return (
            <div className="flex flex-none flex-col h-64 w-full gap-2">
              <Card
                isBlurred
                isPressable
                className="w-full"
                onPress={handleChooseRoutes}
              >
                <CardBody className="flex flex-row gap-3 items-center">
                  <RoutesIcon className="text-primary" size={30} />
                  <span
                    className={subtitle({
                      size: "tiny",
                      color: "default",
                    })}
                  >
                    Выбрать маршрут
                  </span>
                </CardBody>
              </Card>
              {isRouteEmpty ? (
                <Card
                  isBlurred
                  isPressable
                  className="w-full h-24"
                  onPress={handleOpenCreateEmptyFlowStepScreen}
                >
                  <CardBody className="flex flex-row gap-3 items-center">
                    <StepIcon className="text-primary" size={30} />
                    <span
                      className={subtitle({
                        size: "tiny",
                        color: "default",
                      })}
                    >
                      Создать первый шаг
                    </span>
                  </CardBody>
                </Card>
              ) : (
                <div className="flex flex-row gap-2 h-24">
                  <Card
                    isBlurred
                    className="h-full w-full"
                    isDisabled={isCreateFlowStepButtonDisabled()}
                    isPressable={!isCreateFlowStepButtonDisabled()}
                    onPress={handleOpenCreateFlowStepScreen}
                  >
                    <CardBody className="relative">
                      <span
                        className={subtitle({
                          size: "tiny",
                          color: "default",
                        })}
                      >
                        Создать шаг
                      </span>
                      <StepIcon
                        className="absolute text-primary bottom-2 right-2"
                        size={45}
                      />
                    </CardBody>
                  </Card>
                  <Card
                    isBlurred
                    className="h-full w-full"
                    isDisabled={!selectedFlowStep}
                    isPressable={!!selectedFlowStep}
                    onPress={handleOpenUpdateFlowStepScreen}
                  >
                    <CardBody className="relative">
                      <span
                        className={subtitle({
                          size: "tiny",
                          color: "default",
                        })}
                      >
                        Редактировать шаг
                      </span>
                      <EditStepIcon
                        className="absolute text-primary bottom-2 right-2"
                        size={45}
                      />
                    </CardBody>
                  </Card>
                  <Popover
                    backdrop="opaque"
                    isOpen={isDeletedPopoverFlowStepOpen}
                    onOpenChange={(open) =>
                      setIsDeletedPopoverFlowStepOpen(open)
                    }
                  >
                    <PopoverTrigger>
                      <Card
                        isBlurred
                        className="h-full w-full"
                        isDisabled={!selectedFlowStep}
                        isPressable={!!selectedFlowStep}
                      >
                        <CardBody className="relative">
                          <span
                            className={subtitle({
                              size: "tiny",
                              color: "default",
                            })}
                          >
                            Удалить шаг
                          </span>
                          <TrashIcon
                            className="absolute text-danger bottom-2 right-2"
                            size={45}
                          />
                        </CardBody>
                      </Card>
                    </PopoverTrigger>
                    <PopoverContent className="flex flex-col gap-8 items-center p-4 max-w-96">
                      <div className="flex flex-col text-center items-center w-full">
                        <h5 className="text-danger font-bold text-2xl">
                          Вы уверены?
                        </h5>
                        <p
                          className={subtitle({
                            size: "tiny",
                            color: "default",
                            align: "center",
                          })}
                        >
                          Это действие удалит шаг и все его содержимое без
                          возможности востановить!
                        </p>
                      </div>

                      <div className="flex flex-row gap-2 w-full">
                        <Button
                          fullWidth
                          color="danger"
                          startContent={<TrashIcon />}
                          onClick={handleDeleteFlowStep}
                        >
                          Удалить
                        </Button>
                        <Button
                          fullWidth
                          color="default"
                          variant="faded"
                          onClick={() => setIsDeletedPopoverFlowStepOpen(false)}
                        >
                          Отмена
                        </Button>
                      </div>
                    </PopoverContent>
                  </Popover>
                </div>
              )}
              <div className="flex flex-row gap-2 h-24">
                <Card
                  isBlurred
                  isPressable
                  className="h-full w-full"
                  onClick={handleUpdateAction}
                >
                  <CardBody className="relative">
                    <span
                      className={subtitle({
                        size: "tiny",
                        color: "default",
                      })}
                    >
                      Создать новый маршрут
                    </span>
                    <RoutesIcon
                      className="absolute text-primary bottom-2 right-2"
                      size={45}
                    />
                  </CardBody>
                </Card>
                <Card
                  isBlurred
                  isPressable
                  className="h-full w-full"
                  onClick={handleUpdateAction}
                >
                  <CardBody className="relative">
                    <span
                      className={subtitle({
                        size: "tiny",
                        color: "default",
                      })}
                    >
                      Редактировать маршрут
                    </span>
                    <EditIcon
                      className="absolute text-primary bottom-2 right-2"
                      size={45}
                    />
                  </CardBody>
                </Card>
                <Popover
                  backdrop="opaque"
                  isOpen={isDeletedPopoverOpen}
                  onOpenChange={(open) => setIsDeletedPopoverOpen(open)}
                >
                  <PopoverTrigger>
                    <Card isBlurred isPressable className="h-full w-full">
                      <CardBody className="relative">
                        <span
                          className={subtitle({
                            size: "tiny",
                            color: "default",
                          })}
                        >
                          Удалить маршрут
                        </span>
                        <TrashIcon
                          className="absolute text-danger bottom-2 right-2"
                          size={45}
                        />
                      </CardBody>
                    </Card>
                  </PopoverTrigger>
                  <PopoverContent className="flex flex-col gap-8 items-center p-4 max-w-96">
                    <div className="flex flex-col text-center items-center w-full">
                      <h5 className="text-danger font-bold text-2xl">
                        Вы уверены?
                      </h5>
                      <p
                        className={subtitle({
                          size: "tiny",
                          color: "default",
                          align: "center",
                        })}
                      >
                        Это действие удалит маршрут и все его содержимое без
                        возможности востановить!
                      </p>
                    </div>

                    <div className="flex flex-row gap-2 w-full">
                      <Button
                        fullWidth
                        color="danger"
                        startContent={<TrashIcon />}
                        onClick={handleDeleteRoute}
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
          );
      }
    },
    [
      nameValue,
      descriptionValue,
      selectedFlowStep,
      isDeletedPopoverOpen,
      routeAction,
      routeName,
      routeDescription,
      isDeletedPopoverFlowStepOpen,
      isRouteEmpty,
    ],
  );

  return (
    <div className="flex flex-col items-center justify-between gap-4 w-full h-full">
      {/* Name and Description route */}
      <div className="flex flex-col gap-2 w-full">
        <Card className="w-full">
          <CardBody className="flex flex-row gap-2 items-center">
            <RoutesIcon className="text-primary flex-none" size={30} />
            <h4
              className={subtitle({
                size: "sm",
                align: "center",
                color: "default",
                lineCamp: "one",
              })}
            >
              {routeName}
            </h4>
          </CardBody>
        </Card>
        <Card className="w-full">
          <CardBody className="flex flex-row gap-2">
            <DocTextIcon className="text-primary flex-none" size={30} />
            <p
              className={subtitle({
                size: "tiny",
                align: "left",
                lineCamp: "three",
              })}
            >
              {routeDescription}
            </p>
          </CardBody>
        </Card>
      </div>

      {/* Инфа или пусто */}
      <SwitchTransition mode="out-in">
        <CSSTransition
          key={selectedFlowStep ? "selectedFlowStep" : "none"}
          unmountOnExit
          classNames="fade"
          timeout={300}
        >
          {renderInfo(selectedFlowStep)}
        </CSSTransition>
      </SwitchTransition>

      {/* Меню actions */}

      <SwitchTransition mode="out-in">
        <CSSTransition
          key={routeAction}
          unmountOnExit
          classNames="fade"
          timeout={300}
        >
          {renderActions(routeAction)}
        </CSSTransition>
      </SwitchTransition>
    </div>
  );
});
