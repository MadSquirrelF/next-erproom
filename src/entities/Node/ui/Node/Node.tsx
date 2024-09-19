"use client";
import { Card, CardBody } from "@nextui-org/card";
import { memo } from "react";
import { Button } from "@nextui-org/button";
import { Tooltip } from "@nextui-org/tooltip";
import { CSSTransition } from "react-transition-group";
import { Avatar, AvatarGroup } from "@nextui-org/avatar";

import { INode } from "../../model/types/node";

import { subtitle, title } from "@/components/primitives";
import {
  AddIcon,
  AddUserIcon,
  CloudFolderIcon,
  EditIcon,
  EyeOpenedIcon,
  MailIcon,
  PaperClipIcon,
  SettingsIcon,
  TreeClosedIcon,
} from "@/src/shared/assets/icons";
import { useOrgschemaMenu } from "@/src/features/OrgschemaMenu/model/store/orgschemaMenu";
import {
  getUsersByEmployee,
  returnUserColorStatus,
} from "@/src/shared/utils/userFunctions/userFunctions";
import { UserListData } from "@/src/features/OrgschemaMenu/model/data/data";

interface NodeProps {
  className?: string;
  node: INode;
}

export const Node = memo((props: NodeProps) => {
  const { className, node } = props;

  const selectedBlockId = useOrgschemaMenu((state) => state.selectedBlockId);
  const setSelectedBlockId = useOrgschemaMenu(
    (state) => state.setSelectedBlockId,
  );

  return (
    <Card
      className={`relative bg-default-200 z-10 overflow-visible ${selectedBlockId === node.id ? "outline-4 outline-primary" : "outline-none"} h-auto w-96 pb-4 mb-2`}
    >
      <CardBody className="flex flex-row justify-between gap-3">
        <div className="flex flex-col justify-between w-full gap-3">
          <Tooltip color="primary" content="Выбрать блок" placement="top">
            <Card
              isPressable
              className="relative w-full z-10  gap-3"
              onClick={() => setSelectedBlockId(node.id)}
            >
              <CardBody className="flex flex-col gap-2">
                <h4
                  className={title({
                    size: "tiny",
                  })}
                >
                  {node.name}
                </h4>
                <p
                  className={subtitle({
                    size: "tiny",
                    lineCamp: "one",
                  })}
                >
                  {node.description}
                </p>
              </CardBody>
            </Card>
          </Tooltip>
          <Card fullWidth>
            <CardBody className="flex flex-row gap-3 items-end justify-between">
              <div className="flex flex-col gap-2">
                <p
                  className={subtitle({
                    size: "tiny",
                    color: "default",
                  })}
                >
                  Сотрудники:
                </p>
                {node.employee.length === 0 ? (
                  <span className="text-danger font-semibold">
                    Нужно назначить!
                  </span>
                ) : (
                  <AvatarGroup isBordered className="ml-4" max={2}>
                    {getUsersByEmployee(node.employee, UserListData).map(
                      (user) => (
                        <Tooltip
                          key={user.id}
                          color={returnUserColorStatus(user.status)}
                          content={user.fullName}
                          placement="top-start"
                        >
                          <Avatar
                            color={returnUserColorStatus(user.status)}
                            size="sm"
                            src={user.avatarPath}
                          />
                        </Tooltip>
                      ),
                    )}
                  </AvatarGroup>
                )}
              </div>

              <Tooltip content="Добавить нового сотрудника">
                <Button isIconOnly color="primary" size="sm">
                  <AddUserIcon className="flex-none" />
                </Button>
              </Tooltip>
            </CardBody>
          </Card>

          <Card fullWidth className="flex-none">
            <CardBody className="flex flex-row gap-2 flex-none items-center">
              <p
                className={subtitle({
                  size: "sm",
                  color: "default",
                })}
              >
                ЦКП:
              </p>
              <p
                className={subtitle({
                  size: "tiny",
                  lineCamp: "one",
                })}
              >
                {node.description_secondary}
              </p>
            </CardBody>
          </Card>
        </div>
        <Card>
          <CardBody className="flex flex-col gap-2 items-center justify-start overflow-hidden">
            <Tooltip content="Редактировать" placement="right">
              <Button isIconOnly color="primary" size="sm" variant="flat">
                <EditIcon size={20} />
              </Button>
            </Tooltip>

            <Tooltip content="Прикрепить файл" placement="right">
              <Button isIconOnly color="primary" size="sm" variant="flat">
                <PaperClipIcon size={20} />
              </Button>
            </Tooltip>

            <Tooltip content="Дополнительно" placement="right">
              <Button isIconOnly color="primary" size="sm" variant="flat">
                <SettingsIcon size={20} />
              </Button>
            </Tooltip>

            <Tooltip content="Почта" placement="right">
              <Button isIconOnly color="primary" size="sm" variant="flat">
                <MailIcon size={20} />
              </Button>
            </Tooltip>

            <Tooltip content="Облако" placement="right">
              <Button isIconOnly color="primary" size="sm" variant="flat">
                <CloudFolderIcon size={20} />
              </Button>
            </Tooltip>
          </CardBody>
        </Card>
      </CardBody>
      <CSSTransition
        unmountOnExit
        classNames="slide-animation"
        in={selectedBlockId === node.id}
        timeout={300}
      >
        <div className="absolute -bottom-4 right-[129px] flex flex-row gap-3">
          <Button isIconOnly color="primary" radius="full" size="sm">
            <AddIcon />
          </Button>
          <Button isIconOnly color="primary" radius="full" size="sm">
            <EyeOpenedIcon />
          </Button>
          <Button isIconOnly color="primary" radius="full" size="sm">
            <TreeClosedIcon />
          </Button>
        </div>
      </CSSTransition>
    </Card>
  );
});
