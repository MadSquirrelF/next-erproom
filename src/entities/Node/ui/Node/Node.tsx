"use client";
import { Card, CardBody } from "@nextui-org/card";
import { memo } from "react";
import { Button } from "@nextui-org/button";
import { Tooltip } from "@nextui-org/tooltip";
import { CSSTransition } from "react-transition-group";
import { Avatar, AvatarGroup } from "@nextui-org/avatar";
import { useTheme } from "next-themes";

import { INode } from "../../model/types/node";

import { subtitle } from "@/components/primitives";
import {
  AddIcon,
  AddUserIcon,
  CloudFolderIcon,
  EditIcon,
  MailIcon,
  PaperClipIcon,
  SettingsIcon,
  TreeClosedIcon,
  TreeOpenedIcon,
} from "@/src/shared/assets/icons";
import {
  IInfoManageScreen,
  IManageScreen,
  useOrgschemaMenu,
} from "@/src/features/OrgschemaMenu/model/store/orgschemaMenu";
import { useUpdateIsTogether } from "@/src/features/OrgschemaMenu/model/hooks/useUpdateIsTogether";
import { useUserStore } from "@/src/entities/User/model/store/user";
import { IUser } from "@/src/entities/User/model/types/user";
import { getStatusColor } from "@/src/shared/utils/userFunctions/userFunctions";

interface NodeProps {
  node: INode;
  isDisabled?: boolean;
}

export const Node = memo((props: NodeProps) => {
  const { node, isDisabled } = props;
  const isMenuCollapsed = useOrgschemaMenu((state) => state.isMenuCollapsed);
  const setIsMenuCollapsed = useOrgschemaMenu(
    (state) => state.setIsMenuCollapsed,
  );
  const selectedBlock = useOrgschemaMenu((state) => state.selectedBlock);
  const setSelectedBlock = useOrgschemaMenu((state) => state.setSelectedBlock);
  const setBlockForm = useOrgschemaMenu((state) => state.setBlockForm);
  const setManageScreen = useOrgschemaMenu((state) => state.setManageScreen);

  const currentInfoManageScreen = useOrgschemaMenu(
    (state) => state.currentInfoManageScreen,
  );

  const setCurrentUser = useUserStore((state) => state.setCurrentUser);
  const setInfoManageScreen = useOrgschemaMenu(
    (state) => state.setInfoManageScreen,
  );

  const currentUser = useUserStore((state) => state.currentUser);

  const { theme } = useTheme();
  const { handleIsTogether } = useUpdateIsTogether();

  const handleUserCardInfo = (user: IUser) => {
    setSelectedBlock(node);
    if (isMenuCollapsed) {
      setIsMenuCollapsed(false);
    }
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

  const handleSelectBlockById = (id: number) => {
    if (isMenuCollapsed) {
      setIsMenuCollapsed(false);
    }
    if (id === selectedBlock?.id) {
      setSelectedBlock(undefined);
    } else {
      setSelectedBlock(node);
    }
  };

  const handleCreateBlock = () => {
    if (isMenuCollapsed) {
      setIsMenuCollapsed(false);
    }
    setSelectedBlock(node);
    setBlockForm(undefined);
    setManageScreen(IManageScreen.CREATE);
  };

  const handleOpenLink = (url: string | undefined) => {
    if (url) {
      window.open(url, "_blank");
    }
  };

  const handleUpdateBlock = () => {
    if (isMenuCollapsed) {
      setIsMenuCollapsed(false);
    }
    setSelectedBlock(node);
    setManageScreen(IManageScreen.UPDATE);
  };

  const handleUserAdd = () => {
    if (isMenuCollapsed) {
      setIsMenuCollapsed(false);
    }
    setSelectedBlock(node);
    setManageScreen(IManageScreen.USER);
  };

  return (
    <Card
      className={`relative z-10 select-none overflow-visible ${selectedBlock?.id === node.id ? "outline-[5px] outline-primary outline-offset-0" : "outline-none"} h-72 w-96 mb-2`}
      style={
        node.setting.color_block === null || node.setting.color_block === "#f"
          ? {
              background: `${theme === "light" ? "#DCDCDF" : "#35353B"}`,
            }
          : {
              background: `linear-gradient(128deg, ${theme === "light" ? "#DCDCDF" : "#35353B"} 0%, ${theme === "light" ? "#DCDCDF" : "#35353B"} 61%, ${node.setting.color_block} 100%)`,
            }
      }
    >
      <CardBody className="flex p-2 flex-row gap-2">
        {/* Контент вертикальный */}
        <div className="flex flex-col w-[304px] flex-grow gap-2">
          {/* Текст */}
          <Tooltip color="primary" content="Выбрать блок" placement="top">
            <Card
              fullWidth
              className="relative flex z-10 w-full gap-3"
              isPressable={!isDisabled}
              onClick={
                isDisabled ? () => {} : () => handleSelectBlockById(node.id)
              }
            >
              <CardBody className="flex flex-col gap-1">
                <h4 className="font-bold text-lg">{node.name}</h4>
                <p
                  className={subtitle({
                    size: "tiny",
                    lineCamp: "two",
                  })}
                >
                  {node.description}
                </p>
              </CardBody>
            </Card>
          </Tooltip>
          {/* Пользователи */}
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
                  <AvatarGroup isBordered className="ml-4" max={6} size="sm">
                    {node.employee.map((user) => (
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
                          size="sm"
                          src={user.user.avatar || ""}
                          onClick={
                            isDisabled
                              ? () => {}
                              : () => handleUserCardInfo(user.user)
                          }
                        />
                      </Tooltip>
                    ))}
                  </AvatarGroup>
                )}
              </div>

              <Tooltip content="Добавить нового сотрудника">
                <Button
                  isIconOnly
                  color="primary"
                  isDisabled={isDisabled}
                  size="sm"
                  onClick={handleUserAdd}
                >
                  <AddUserIcon className="flex-none" />
                </Button>
              </Tooltip>
            </CardBody>
          </Card>

          {/* ЦКП */}
          <Card fullWidth className="flex-grow">
            <CardBody className="flex flex-row gap-2 flex-none items-start">
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
                  lineCamp: "two",
                })}
              >
                {node.description_secondary}
              </p>
            </CardBody>
          </Card>
        </div>
        {/* Конец контент вертикальный */}
        {/* Кнопки */}
        <Card>
          <CardBody className="flex flex-col gap-5 items-center justify-start overflow-hidden">
            <Tooltip content="Редактировать" placement="right">
              <Button
                isIconOnly
                color="primary"
                isDisabled={isDisabled}
                size="sm"
                variant="flat"
                onClick={handleUpdateBlock}
              >
                <EditIcon size={20} />
              </Button>
            </Tooltip>

            <Tooltip content="Прикрепить файл" placement="right">
              <Button
                isIconOnly
                color="primary"
                isDisabled={true}
                size="sm"
                variant="flat"
              >
                <PaperClipIcon size={20} />
              </Button>
            </Tooltip>

            <Tooltip content="Дополнительно" placement="right">
              <Button
                isIconOnly
                color="primary"
                isDisabled={true}
                size="sm"
                variant="flat"
              >
                <SettingsIcon size={20} />
              </Button>
            </Tooltip>

            <Tooltip content="Почта" placement="right">
              <Button
                isIconOnly
                color={
                  node.mail === "" || node.mail === null ? "default" : "primary"
                }
                isDisabled={node.mail === "" || node.mail === null}
                size="sm"
                variant="flat"
                onClick={() => handleOpenLink(node.mail)}
              >
                <MailIcon size={20} />
              </Button>
            </Tooltip>

            <Tooltip content="Облако" placement="right">
              <Button
                isIconOnly
                color={
                  node.cloud === "" || node.cloud === null
                    ? "default"
                    : "primary"
                }
                isDisabled={node.cloud === "" || node.cloud === null}
                size="sm"
                variant="flat"
                onClick={() => handleOpenLink(node.cloud)}
              >
                <CloudFolderIcon size={20} />
              </Button>
            </Tooltip>
          </CardBody>
        </Card>
        {/* Конец Кнопки */}
      </CardBody>
      {/* Добавить скрыть вертикально */}
      <CSSTransition
        unmountOnExit
        classNames="slide-animation"
        in={selectedBlock?.id === node.id}
        timeout={300}
      >
        <div className="absolute w-full -bottom-4 flex flex-row  z-20 justify-center items-center gap-3">
          <Tooltip content="Добавить блок" placement="bottom">
            <Button
              isIconOnly
              color="primary"
              radius="full"
              size="sm"
              onClick={handleCreateBlock}
            >
              <AddIcon />
            </Button>
          </Tooltip>

          <Tooltip
            content={
              node.setting.is_together
                ? "Показать горизонтально"
                : "Показать вертикально"
            }
            placement="bottom"
          >
            <Button
              isIconOnly
              color="primary"
              radius="full"
              size="sm"
              onClick={() =>
                handleIsTogether(node.setting.is_together === true ? 0 : 1)
              }
            >
              {node.setting.is_together ? (
                <TreeOpenedIcon />
              ) : (
                <TreeClosedIcon />
              )}
            </Button>
          </Tooltip>
        </div>
      </CSSTransition>
    </Card>
  );
});
