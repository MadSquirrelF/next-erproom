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
  EyeOpenedIcon,
  MailIcon,
  PaperClipIcon,
  SettingsIcon,
  TreeClosedIcon,
  TreeOpenedIcon,
} from "@/src/shared/assets/icons";
import {
  IActionManageScreen,
  IInfoManageScreen,
  useOrgschemaMenu,
} from "@/src/features/OrgschemaMenu/model/store/orgschemaMenu";
import {
  getUsersByEmployee,
  getUserStatusColor,
} from "@/src/shared/utils/userFunctions/userFunctions";
import {
  IUser,
  UserListData,
} from "@/src/features/OrgschemaMenu/model/data/data";
import { useUpdateIsTogether } from "@/src/features/OrgschemaMenu/model/hooks/useUpdateIsTogether";

interface NodeProps {
  className?: string;
  node: INode;
}

export const Node = memo((props: NodeProps) => {
  const { className, node } = props;

  const selectedBlock = useOrgschemaMenu((state) => state.selectedBlock);
  const setSelectedBlock = useOrgschemaMenu((state) => state.setSelectedBlock);
  const setBlockForm = useOrgschemaMenu((state) => state.setBlockForm);
  const setActionManageScreen = useOrgschemaMenu(
    (state) => state.setActionManageScreen,
  );

  const currentInfoManageScreen = useOrgschemaMenu(
    (state) => state.currentInfoManageScreen,
  );

  const setCurrentUser = useOrgschemaMenu((state) => state.setCurrentUser);
  const setInfoManageScreen = useOrgschemaMenu(
    (state) => state.setInfoManageScreen,
  );

  const currentUser = useOrgschemaMenu((state) => state.currentUser);

  const { theme } = useTheme();
  const { handleIsTogether } = useUpdateIsTogether();

  const handleUserCardInfo = (user: IUser) => {
    setSelectedBlock(node);
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
    if (id === selectedBlock?.id) {
      setSelectedBlock(undefined);
    } else {
      setSelectedBlock(node);
    }
  };

  const handleCreateBlock = () => {
    setSelectedBlock(node);
    setBlockForm(undefined);
    setActionManageScreen(IActionManageScreen.CREATE);
  };

  const handleOpenLink = (url: string | undefined) => {
    if (url) {
      window.open(url, "_blank");
    }
  };

  const handleUpdateBlock = () => {
    setSelectedBlock(node);
    setActionManageScreen(IActionManageScreen.UPDATE);
  };

  const handleUserAdd = () => {
    setSelectedBlock(node);
    setActionManageScreen(IActionManageScreen.USER);
  };

  return (
    <Card
      // className={`relative bg-gradient-to-br from-default-200 from-0% via-default-200 to-orange-400 z-10 overflow-visible ${selectedBlock?.id === node.id ? "outline-[5px] outline-primary outline-offset-0" : "outline-none"} h-72 w-96 mb-2`}
      className={`relative z-10 select-none overflow-visible ${selectedBlock?.id === node.id ? "outline-[5px] outline-primary outline-offset-0" : "outline-none"} h-72 w-96 mb-2`}
      style={
        !node.setting.color_block || node.setting.color_block === "#f"
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
        <div className="flex flex-col flex-grow w-full gap-2">
          {/* Текст */}
          <Tooltip color="primary" content="Выбрать блок" placement="top">
            <Card
              fullWidth
              isPressable
              className="relative flex flex-grow z-10 gap-3"
              onClick={() => handleSelectBlockById(node.id)}
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
                    {getUsersByEmployee(node.employee, UserListData).map(
                      (user) => (
                        <Tooltip
                          key={user.id}
                          color={getUserStatusColor(user.status)}
                          content={user.fullName}
                          placement="top-start"
                        >
                          <Avatar
                            className="cursor-pointer"
                            color={getUserStatusColor(user.status)}
                            size="sm"
                            src={user.avatarPath}
                            onClick={() => handleUserCardInfo(user)}
                          />
                        </Tooltip>
                      ),
                    )}
                  </AvatarGroup>
                )}
              </div>

              <Tooltip content="Добавить нового сотрудника">
                <Button
                  isIconOnly
                  color="primary"
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
                size="sm"
                variant="flat"
                onClick={handleUpdateBlock}
              >
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

            <CSSTransition
              unmountOnExit
              classNames="slide-animation"
              in={node.mail !== "" || node.mail !== null}
              timeout={300}
            >
              <Tooltip content="Почта" placement="right">
                <Button
                  isIconOnly
                  color="primary"
                  size="sm"
                  variant="flat"
                  onClick={() => handleOpenLink(node.mail)}
                >
                  <MailIcon size={20} />
                </Button>
              </Tooltip>
            </CSSTransition>

            <CSSTransition
              unmountOnExit
              classNames="slide-animation"
              in={node.mail !== "" || node.mail !== null}
              timeout={300}
            >
              <Tooltip content="Облако" placement="right">
                <Button
                  isIconOnly
                  color="primary"
                  size="sm"
                  variant="flat"
                  onClick={() => handleOpenLink(node.cloud)}
                >
                  <CloudFolderIcon size={20} />
                </Button>
              </Tooltip>
            </CSSTransition>
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
          <CSSTransition
            unmountOnExit
            classNames="slide-animation"
            in={node.all_children_blocks.length > 0}
            timeout={300}
          >
            <Tooltip content="Скрыть блоки" placement="bottom">
              <Button isIconOnly color="primary" radius="full" size="sm">
                <EyeOpenedIcon />
              </Button>
            </Tooltip>
          </CSSTransition>

          <CSSTransition
            unmountOnExit
            classNames="slide-animation"
            in={node.all_children_blocks.length > 1}
            timeout={300}
          >
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
          </CSSTransition>
        </div>
      </CSSTransition>
    </Card>
  );
});
