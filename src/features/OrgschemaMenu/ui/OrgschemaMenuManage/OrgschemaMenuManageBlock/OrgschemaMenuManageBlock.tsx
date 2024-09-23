"use client";

import { Avatar, AvatarGroup } from "@nextui-org/avatar";
import { Button } from "@nextui-org/button";
import { Card, CardBody } from "@nextui-org/card";
import { Tooltip } from "@nextui-org/tooltip";
import { memo } from "react";
import {
  Chip,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@nextui-org/react";

import { UserListData } from "../../../model/data/data";
import { useOrgschemaMenuManage } from "../../../model/hooks/useOrgschemaMenuManageBlock";
import { useOrgschemaMenu } from "../../../model/store/orgschemaMenu";

import {
  AddIcon,
  AddUserIcon,
  DateCrateIcon,
  DateEditIcon,
  EditIcon,
  EyeOpenedIcon,
  PaperClipIcon,
  TrashIcon,
  TreeClosedIcon,
} from "@/src/shared/assets/icons";
import { subtitle } from "@/components/primitives";
import {
  getUsersByEmployee,
  returnUserColorStatus,
} from "@/src/shared/utils/userFunctions/userFunctions";
import { OrgschemaSelectBlockBg } from "@/src/shared/assets/OrgschemaSelectBlockBg/OrgschemaSelectBlockBg";
import { getTimeDifferenceFromCreationDate } from "@/src/shared/utils/Date/Date";

interface OrgschemaMenuManageBlockProps {
  className?: string;
}

export const OrgschemaMenuManageBlock = memo(
  (props: OrgschemaMenuManageBlockProps) => {
    const { className } = props;

    const { handleDeleteBlock, isDeletedPopoverOpen, setIsDeletedPopoverOpen } =
      useOrgschemaMenuManage();

    const selectedBlock = useOrgschemaMenu((state) => state.selectedBlock);

    if (!selectedBlock) {
      return (
        <div className="flex flex-col items-center gap-4">
          <OrgschemaSelectBlockBg className="text-primary" size={300} />
          <h4
            className={subtitle({
              color: "default",
            })}
          >
            Выберите активный блок
          </h4>
          <h4
            className={subtitle({
              size: "tiny",
              align: "center",
            })}
          >
            Выберите из списка блок, с которым хотите работать, или вы просто
            кликните по нему на схеме организации.
          </h4>
        </div>
      );
    }

    return (
      <div className="relative flex flex-col h-full justify-between gap-2">
        <div className="w-full flex flex-row gap-4 justify-between">
          <Chip
            className="w-full"
            color="success"
            startContent={<DateCrateIcon size={20} />}
            variant="faded"
          >
            {getTimeDifferenceFromCreationDate(selectedBlock.created_at)}
          </Chip>

          <Chip
            color="warning"
            startContent={<DateEditIcon size={20} />}
            variant="faded"
          >
            {getTimeDifferenceFromCreationDate(selectedBlock.updated_at)}
          </Chip>
        </div>
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
              <span className="text-danger h-10 font-semibold">
                Пусто... Нужно назначить!
              </span>
            ) : (
              <AvatarGroup isBordered className="ml-4" max={6}>
                {getUsersByEmployee(selectedBlock.employee, UserListData).map(
                  (user) => (
                    <Tooltip
                      key={user.id}
                      color={returnUserColorStatus(user.status)}
                      content={user.fullName}
                      placement="top-start"
                    >
                      <Avatar
                        color={returnUserColorStatus(user.status)}
                        src={user.avatarPath}
                      />
                    </Tooltip>
                  ),
                )}
              </AvatarGroup>
            )}
          </div>

          <Tooltip content="Добавить нового сотрудника">
            <Button
              color="primary"
              startContent={<AddUserIcon className="flex-none" />}
            >
              Добавить
            </Button>
          </Tooltip>
        </div>
        <div className="flex flex-none flex-row mt-5 h-44 w-full gap-2">
          <div className="flex flex-col w-1/2  gap-2">
            <Card isBlurred isPressable className="h-full w-full">
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
                  size={30}
                />
              </CardBody>
            </Card>
            <Card isBlurred isPressable className="h-full w-full">
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
                  size={30}
                />
              </CardBody>
            </Card>
          </div>

          <div className="flex flex-col w-full  gap-2">
            <div className="flex h-full flex-row gap-2">
              <Card isBlurred isPressable className="h-full w-full">
                <CardBody className="relative">
                  <span
                    className={subtitle({
                      size: "tiny",
                      color: "default",
                    })}
                  >
                    Скрыть блоки
                  </span>
                  <EyeOpenedIcon
                    className="absolute text-primary bottom-2 right-2"
                    size={30}
                  />
                </CardBody>
              </Card>
              <Card isBlurred isPressable className="h-full w-full">
                <CardBody className="relative">
                  <span
                    className={subtitle({
                      size: "tiny",
                      color: "default",
                    })}
                  >
                    Вертикально показать
                  </span>
                  <TreeClosedIcon
                    className="absolute text-primary bottom-2 right-2"
                    size={30}
                  />
                </CardBody>
              </Card>
            </div>
            <div className="flex h-full flex-row gap-2">
              <Card isBlurred isPressable className="h-full w-full">
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
                    size={30}
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
                        size={30}
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
