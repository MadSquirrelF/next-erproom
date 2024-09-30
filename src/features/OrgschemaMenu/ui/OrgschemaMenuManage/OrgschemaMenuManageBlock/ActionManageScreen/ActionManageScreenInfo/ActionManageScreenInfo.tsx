"use client";

import { Avatar, AvatarGroup } from "@nextui-org/avatar";
import { Button } from "@nextui-org/button";
import { Card, CardBody } from "@nextui-org/card";
import { Chip } from "@nextui-org/chip";
import { Popover, PopoverContent, PopoverTrigger } from "@nextui-org/popover";
import { Tooltip } from "@nextui-org/tooltip";
import { memo, useCallback } from "react";
import { Input, Textarea } from "@nextui-org/input";
import toast from "react-hot-toast";
import { CSSTransition, SwitchTransition } from "react-transition-group";

import { UserInfoCard } from "./UserInfoCard/UserInfoCard";

import { getTimeDifferenceFromCreationDate } from "@/src/shared/utils/Date/Date";
import {
  AddIcon,
  AddUserIcon,
  CopyIcon,
  DateCrateIcon,
  DateEditIcon,
  EditIcon,
  EyeClosedIcon,
  LinkIcon,
  PaperClipIcon,
  TrashIcon,
  TreeClosedIcon,
  TreeOpenedIcon,
} from "@/src/shared/assets/icons";
import { subtitle } from "@/components/primitives";
import { useOrgschemaMenuManage } from "@/src/features/OrgschemaMenu/model/hooks/useOrgschemaMenuManageBlock";
import {
  IInfoManageScreen,
  IManageScreen,
  useOrgschemaMenu,
} from "@/src/features/OrgschemaMenu/model/store/orgschemaMenu";
import { useUpdateIsTogether } from "@/src/features/OrgschemaMenu/model/hooks/useUpdateIsTogether";
import { useUserStore } from "@/src/entities/User/model/store/user";
import { IUser } from "@/src/entities/User/model/types/user";
import { getStatusColor } from "@/src/shared/utils/userFunctions/userFunctions";

interface ActionManageScreenInfoProps {
  className?: string;
}

export const ActionManageScreenInfo = memo(
  (props: ActionManageScreenInfoProps) => {
    const { className } = props;

    const { handleDeleteBlock, isDeletedPopoverOpen, setIsDeletedPopoverOpen } =
      useOrgschemaMenuManage();

    const { handleIsTogether } = useUpdateIsTogether();

    const currentInfoManageScreen = useOrgschemaMenu(
      (state) => state.currentInfoManageScreen,
    );

    const selectedBlock = useOrgschemaMenu((state) => state.selectedBlock);

    const setCurrentUser = useUserStore((state) => state.setCurrentUser);

    const currentUser = useUserStore((state) => state.currentUser);

    const setInfoManageScreen = useOrgschemaMenu(
      (state) => state.setInfoManageScreen,
    );

    const setManageScreen = useOrgschemaMenu((state) => state.setManageScreen);

    const handleUserCardInfo = (user: IUser) => {
      if (!currentUser) {
        setInfoManageScreen(IInfoManageScreen.USER);
        setCurrentUser(user);

        return;
      }

      if (currentInfoManageScreen === IInfoManageScreen.USER) {
        if (currentUser.id === user.id) {
          setInfoManageScreen(IInfoManageScreen.BLOCK);
          setCurrentUser(undefined);

          return;
        }

        setCurrentUser(user);

        return;
      }
    };

    const renderInfo = useCallback(
      (currentInfoManageScreen: IInfoManageScreen) => {
        switch (currentInfoManageScreen) {
          case IInfoManageScreen.BLOCK:
            return (
              <div className="flex flex-col gap-2">
                <Input
                  isReadOnly
                  label="Названиие блока"
                  placeholder="Введите название блока"
                  type="text"
                  value={selectedBlock?.name}
                />
                <div className="flex flex-row gap-2">
                  <Textarea
                    isReadOnly
                    endContent={
                      <Tooltip content="Копировать описание">
                        <Button
                          isIconOnly
                          size="sm"
                          variant="flat"
                          onClick={() =>
                            handleCopyText(selectedBlock?.description)
                          }
                        >
                          <CopyIcon size={20} />
                        </Button>
                      </Tooltip>
                    }
                    label="Описание блока"
                    maxRows={3}
                    placeholder="Введите описание блока"
                    value={selectedBlock?.description}
                  />
                  <Textarea
                    isReadOnly
                    endContent={
                      <Tooltip content="Копировать цкп">
                        <Button
                          isIconOnly
                          size="sm"
                          variant="flat"
                          onClick={() =>
                            handleCopyText(selectedBlock?.description_secondary)
                          }
                        >
                          <CopyIcon size={20} />
                        </Button>
                      </Tooltip>
                    }
                    label="ЦКП блока"
                    maxRows={3}
                    placeholder="Введите ЦКП блока"
                    value={selectedBlock?.description_secondary}
                  />
                </div>
                <div className="flex flex-row gap-2">
                  <Input
                    isReadOnly
                    endContent={
                      <Tooltip content="Перейти по ссылке">
                        <Button
                          isIconOnly
                          size="sm"
                          variant="flat"
                          onClick={() => handleOpenLink(selectedBlock?.cloud)}
                        >
                          <LinkIcon />
                        </Button>
                      </Tooltip>
                    }
                    label="Ссылка на облако"
                    placeholder="Введите ссылку"
                    type="text"
                    value={selectedBlock?.cloud}
                  />
                  <Input
                    isReadOnly
                    endContent={
                      <Tooltip content="Перейти по ссылке">
                        <Button
                          isIconOnly
                          size="sm"
                          variant="flat"
                          onClick={() => handleOpenLink(selectedBlock?.mail)}
                        >
                          <LinkIcon />
                        </Button>
                      </Tooltip>
                    }
                    label="Ссылка на почту"
                    placeholder="Введите ссылку"
                    type="text"
                    value={selectedBlock?.mail}
                  />
                </div>
              </div>
            );
          case IInfoManageScreen.USER:
            return <UserInfoCard />;

          default:
            return (
              <div className="flex flex-col h-full gap-2">
                <Input
                  isReadOnly
                  label="Названиие блока"
                  placeholder="Введите название блока"
                  type="text"
                  value={selectedBlock?.name}
                />
                <div className="flex flex-row gap-2">
                  <Textarea
                    isReadOnly
                    endContent={
                      <Tooltip content="Копировать описание">
                        <Button
                          isIconOnly
                          size="sm"
                          variant="flat"
                          onClick={() =>
                            handleCopyText(selectedBlock?.description)
                          }
                        >
                          <CopyIcon size={20} />
                        </Button>
                      </Tooltip>
                    }
                    label="Описание блока"
                    maxRows={3}
                    placeholder="Введите описание блока"
                    value={selectedBlock?.description}
                  />
                  <Textarea
                    isReadOnly
                    endContent={
                      <Tooltip content="Копировать цкп">
                        <Button
                          isIconOnly
                          size="sm"
                          variant="flat"
                          onClick={() =>
                            handleCopyText(selectedBlock?.description_secondary)
                          }
                        >
                          <CopyIcon size={20} />
                        </Button>
                      </Tooltip>
                    }
                    label="ЦКП блока"
                    maxRows={3}
                    placeholder="Введите ЦКП блока"
                    value={selectedBlock?.description_secondary}
                  />
                </div>
                <div className="flex flex-row gap-2">
                  <Input
                    isReadOnly
                    endContent={
                      <Tooltip content="Перейти по ссылке">
                        <Button
                          isIconOnly
                          size="sm"
                          variant="flat"
                          onClick={() => handleOpenLink(selectedBlock?.cloud)}
                        >
                          <LinkIcon />
                        </Button>
                      </Tooltip>
                    }
                    label="Ссылка на облако"
                    placeholder="Введите ссылку"
                    type="text"
                    value={selectedBlock?.cloud}
                  />
                  <Input
                    isReadOnly
                    endContent={
                      <Tooltip content="Перейти по ссылке">
                        <Button
                          isIconOnly
                          size="sm"
                          variant="flat"
                          onClick={() => handleOpenLink(selectedBlock?.mail)}
                        >
                          <LinkIcon />
                        </Button>
                      </Tooltip>
                    }
                    label="Ссылка на почту"
                    placeholder="Введите ссылку"
                    type="text"
                    value={selectedBlock?.mail}
                  />
                </div>
              </div>
            );
        }
      },
      [currentInfoManageScreen, selectedBlock],
    );

    const handleCreateBlock = () => {
      setManageScreen(IManageScreen.CREATE);
    };

    const handleUpdateBlock = () => {
      setManageScreen(IManageScreen.UPDATE);
    };

    const handleUserAdd = () => {
      setManageScreen(IManageScreen.USER);
    };

    const handleFileAdd = () => {
      setManageScreen(IManageScreen.FILE);
    };

    const handleOpenLink = (url: string | undefined) => {
      if (url) {
        window.open(url, "_blank");
      }
    };

    const handleCopyText = (text: string | undefined) => {
      if (text) {
        navigator.clipboard.writeText(text);
        toast.success("Текст скопирован!");
      }
    };

    if (!selectedBlock) {
      return null;
    }

    return (
      <div className="flex flex-col gap-2 justify-between h-full w-full">
        <div className="w-full flex flex-row gap-4 justify-between">
          <Tooltip color="success" content="Блок создан">
            <Chip
              className="w-full"
              color="success"
              startContent={<DateCrateIcon size={20} />}
              variant="faded"
            >
              {getTimeDifferenceFromCreationDate(selectedBlock.created_at)}
            </Chip>
          </Tooltip>
          <Tooltip color="warning" content="Последний раз обновлен">
            <Chip
              color="warning"
              startContent={<DateEditIcon size={20} />}
              variant="faded"
            >
              {getTimeDifferenceFromCreationDate(selectedBlock.updated_at)}
            </Chip>
          </Tooltip>
        </div>

        <SwitchTransition mode="out-in">
          <CSSTransition
            key={currentInfoManageScreen}
            unmountOnExit
            classNames="fade"
            timeout={300}
          >
            {renderInfo(currentInfoManageScreen)}
          </CSSTransition>
        </SwitchTransition>

        <div className="flex flex-col gap-3">
          <div className="flex flex-none flex-row gap-3 items-end justify-between">
            <div className="flex flex-col gap-2">
              <p
                className={subtitle({
                  size: "tiny",
                  color: "default",
                })}
              >
                Сотрудники:
              </p>
              {selectedBlock.employee.length === 0 ? (
                <div className="h-10 flex flex-col justify-end">
                  <span className="text-danger font-semibold">
                    Пусто... Нужно назначить!
                  </span>
                </div>
              ) : (
                <AvatarGroup isBordered className="ml-4" max={6}>
                  {selectedBlock.employee.map((user) => (
                    <Tooltip
                      key={user.id}
                      color={getStatusColor(
                        user.user.status,
                        user.user.vacation,
                        user.user.disease,
                      )}
                      content={user.user.name}
                      placement="top-start"
                    >
                      <Avatar
                        className="cursor-pointer"
                        color={getStatusColor(
                          user.user.status,
                          user.user.vacation,
                          user.user.disease,
                        )}
                        name={user.user.name || ""}
                        src={user.user.avatar || ""}
                        onClick={() => handleUserCardInfo(user.user)}
                      />
                    </Tooltip>
                  ))}
                </AvatarGroup>
              )}
            </div>

            <Tooltip content="Добавить нового сотрудника">
              <Button
                color="primary"
                startContent={<AddUserIcon className="flex-none" />}
                onClick={handleUserAdd}
              >
                Добавить
              </Button>
            </Tooltip>
          </div>
          <div className="flex flex-none flex-row mt-5 h-44 w-full gap-2">
            <div className="flex flex-col w-full gap-2">
              <Card
                isBlurred
                isPressable
                className="h-full w-full"
                onClick={handleUpdateBlock}
              >
                <CardBody className="relative">
                  <span
                    className={subtitle({
                      size: "tiny",
                      color: "default",
                    })}
                  >
                    Редактировать
                  </span>
                  <EditIcon
                    className="absolute text-primary bottom-2 right-2"
                    size={45}
                  />
                </CardBody>
              </Card>
              <Card
                isBlurred
                isPressable
                className="h-full w-full"
                onClick={handleCreateBlock}
              >
                <CardBody className="relative">
                  <span
                    className={subtitle({
                      size: "tiny",
                      color: "default",
                    })}
                  >
                    Создать блок
                  </span>
                  <AddIcon
                    className="absolute text-primary bottom-2 right-2"
                    size={45}
                  />
                </CardBody>
              </Card>
            </div>

            <div className="flex flex-col w-full gap-2">
              <Card isBlurred isDisabled isPressable className="h-full w-full">
                <CardBody className="relative">
                  <span
                    className={subtitle({
                      size: "tiny",
                      color: "default",
                    })}
                  >
                    Скрыть блоки
                  </span>
                  <EyeClosedIcon
                    className="absolute text-primary bottom-2 right-2"
                    size={45}
                  />
                </CardBody>
              </Card>
              <Card
                isBlurred
                isPressable
                className="h-full w-full"
                onClick={() =>
                  handleIsTogether(
                    selectedBlock.setting.is_together === true ? 0 : 1,
                  )
                }
              >
                <CardBody className="relative">
                  <span
                    className={subtitle({
                      size: "tiny",
                      color: "default",
                    })}
                  >
                    {selectedBlock.setting.is_together
                      ? "Разделить блоки"
                      : "Объединить блоки вместе"}
                  </span>
                  {selectedBlock.setting.is_together ? (
                    <TreeOpenedIcon
                      className="absolute text-primary bottom-2 right-2"
                      size={45}
                    />
                  ) : (
                    <TreeClosedIcon
                      className="absolute text-primary bottom-2 right-2"
                      size={45}
                    />
                  )}
                </CardBody>
              </Card>
            </div>

            <div className="flex flex-col w-full gap-2">
              <Card
                isBlurred
                isPressable
                className="h-full w-full"
                onClick={handleFileAdd}
              >
                <CardBody className="relative">
                  <span
                    className={subtitle({
                      size: "tiny",
                      color: "default",
                    })}
                  >
                    Прикрепить файлы
                  </span>
                  <PaperClipIcon
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
                        Удалить блок
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
                      Это действие удалит блок и все его содержимое без
                      возможности востановить!
                    </p>
                  </div>

                  <div className="flex flex-row gap-2 w-full">
                    <Button
                      fullWidth
                      color="danger"
                      startContent={<TrashIcon />}
                      onClick={handleDeleteBlock}
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
        </div>
      </div>
    );
  },
);
