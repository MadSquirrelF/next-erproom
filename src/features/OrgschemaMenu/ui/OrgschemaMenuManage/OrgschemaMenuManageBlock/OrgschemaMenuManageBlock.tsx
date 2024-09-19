import { Avatar, AvatarGroup } from "@nextui-org/avatar";
import { Button } from "@nextui-org/button";
import { Card, CardBody } from "@nextui-org/card";
import { Input, Textarea } from "@nextui-org/input";
import { Tooltip } from "@nextui-org/tooltip";
import { memo } from "react";

import { UserListData } from "../../../model/data/data";

import {
  AddUserIcon,
  CopyIcon,
  EditIcon,
  EyeOpenedIcon,
  LinkIcon,
  PaperClipIcon,
  SettingsIcon,
  TreeClosedIcon,
} from "@/src/shared/assets/icons";
import { subtitle } from "@/components/primitives";
import { INode } from "@/src/entities/Node";
import {
  getUsersByEmployee,
  returnUserColorStatus,
} from "@/src/shared/utils/userFunctions/userFunctions";

interface OrgschemaMenuManageBlockProps {
  className?: string;
  block: INode;
}

export const OrgschemaMenuManageBlock = memo(
  (props: OrgschemaMenuManageBlockProps) => {
    const { className, block } = props;

    return (
      <div className="relative flex flex-col gap-2">
        <Input
          isReadOnly
          label="Названиие блока"
          placeholder="Введите название блока"
          type="text"
          value={block.name}
        />
        <div className="flex flex-row gap-2">
          <Textarea
            isReadOnly
            endContent={
              <Tooltip content="Копировать описание">
                <Button isIconOnly color="primary" size="sm" variant="flat">
                  <CopyIcon size={20} />
                </Button>
              </Tooltip>
            }
            label="Описание блока"
            maxRows={3}
            placeholder="Введите описание блока"
            value={block.description}
          />
          <Textarea
            isReadOnly
            endContent={
              <Tooltip
                content="Копировать цкп"
                isDisabled={block.description_secondary === ""}
              >
                <Button
                  isIconOnly
                  color={
                    block.description_secondary === "" ? "default" : "primary"
                  }
                  isDisabled={block.description_secondary === ""}
                  size="sm"
                  variant="flat"
                >
                  <CopyIcon size={20} />
                </Button>
              </Tooltip>
            }
            label="ЦКП блока"
            maxRows={3}
            placeholder="Введите ЦКП блока"
            value={block.description_secondary}
          />
        </div>
        <div className="flex flex-row gap-2">
          <Input
            isReadOnly
            endContent={
              <Tooltip
                content="Перейти по ссылке"
                isDisabled={block.cloud === ""}
              >
                <Button
                  isIconOnly
                  color={block.cloud === "" ? "default" : "primary"}
                  isDisabled={block.cloud === ""}
                  size="sm"
                  variant="flat"
                >
                  <LinkIcon />
                </Button>
              </Tooltip>
            }
            label="Ссылка на облако"
            placeholder="Введите ссылку"
            type="text"
            value={block.cloud}
          />
          <Input
            isReadOnly
            endContent={
              <Tooltip content="Перейти по ссылке">
                <Button isIconOnly color="primary" size="sm" variant="flat">
                  <LinkIcon />
                </Button>
              </Tooltip>
            }
            label="Ссылка на почту"
            placeholder="Введите ссылку"
            type="text"
            value={block.mail}
          />
        </div>

        <div className="flex flex-row gap-3 items-end justify-between">
          <div className="flex flex-col gap-2">
            <p
              className={subtitle({
                size: "tiny",
                color: "default",
              })}
            >
              Сотрудники:
            </p>
            {block.employee.length === 0 ? (
              <span className="text-danger font-semibold">
                Пусто... Нужно назначить!
              </span>
            ) : (
              <AvatarGroup isBordered className="ml-4" max={2}>
                {getUsersByEmployee(block.employee, UserListData).map(
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
        <div className="flex flex-row mt-5 h-44 w-full gap-2">
          <Card isBlurred isPressable className="w-1/2 h-full">
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
                size={70}
              />
            </CardBody>
          </Card>

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
              <Card isBlurred isPressable className="h-full w-full">
                <CardBody className="relative">
                  <span
                    className={subtitle({
                      size: "tiny",
                      color: "default",
                    })}
                  >
                    Настройки
                  </span>
                  <SettingsIcon
                    className="absolute text-primary bottom-2 right-2"
                    size={30}
                  />
                </CardBody>
              </Card>
            </div>
          </div>
        </div>
      </div>
    );
  },
);
