"use client";
import { memo } from "react";
import { Avatar } from "@nextui-org/avatar";
import { Link } from "@nextui-org/link";
import { Chip } from "@nextui-org/chip";
import { Divider } from "@nextui-org/divider";
import { Button } from "@nextui-org/button";
import { Tooltip } from "@nextui-org/tooltip";

import {
  IInfoManageScreen,
  useOrgschemaMenu,
} from "@/src/features/OrgschemaMenu/model/store/orgschemaMenu";
import {
  getUserStatus,
  getUserStatusColor,
} from "@/src/shared/utils/userFunctions/userFunctions";
import { subtitle } from "@/components/primitives";
import {
  AllUsersIcon,
  ArrowLeftIcon,
  CalendarIcon,
  HospitalIcon,
  LinkIcon,
  MailIcon,
  PhoneIcon,
  RemoveUserIcon,
  VacationBoxIcon,
} from "@/src/shared/assets/icons";

interface UserInfoCardProps {
  className?: string;
}

export const UserInfoCard = memo((props: UserInfoCardProps) => {
  const { className } = props;

  const setInfoManageScreen = useOrgschemaMenu(
    (state) => state.setInfoManageScreen,
  );

  const currentUser = useOrgschemaMenu((state) => state.currentUser);
  const setCurrentUser = useOrgschemaMenu((state) => state.setCurrentUser);

  const back = () => {
    setInfoManageScreen(IInfoManageScreen.BLOCK);
    setCurrentUser(undefined);
  };

  if (!currentUser) {
    return (
      <div className="text-center">
        <h2>Информация о пользователе</h2>
        <p>Нет ее вот и все не знаю как дальше быть ыыыы</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2 h-full w-full items-start">
      <div className="flex flex-row w-full flex-grow h-full gap-4 items-center">
        <Avatar
          isBordered
          className="w-20 h-20 text-large"
          color={getUserStatusColor(currentUser.status)}
          src={currentUser.avatarPath}
        />
        <div className="flex flex-col flex-grow gap-1">
          <h3
            className={subtitle({
              size: "sm",
              fullWidth: true,
              lineCamp: "one",
            })}
          >
            {currentUser.fullName}
          </h3>

          <div className="flex flex-row gap-2 w-full justify-between">
            <p>{currentUser.position}</p>
            <Chip color={getUserStatusColor(currentUser.status)} variant="flat">
              {getUserStatus(currentUser.status)}
            </Chip>
          </div>
          <div className="flex flex-row gap-2 w-full">
            <Tooltip color="primary" content="Освободить">
              <Button isIconOnly color="primary" size="sm" variant="flat">
                <AllUsersIcon />
              </Button>
            </Tooltip>
            <Tooltip color="success" content="На больничный">
              <Button isIconOnly color="success" size="sm" variant="flat">
                <HospitalIcon />
              </Button>
            </Tooltip>
            <Tooltip color="warning" content="В отпуск">
              <Button isIconOnly color="warning" size="sm" variant="flat">
                <VacationBoxIcon />
              </Button>
            </Tooltip>
            <Tooltip color="danger" content="Уволить">
              <Button isIconOnly color="danger" size="sm" variant="flat">
                <RemoveUserIcon />
              </Button>
            </Tooltip>
          </div>
        </div>
      </div>

      <Divider />
      <div className="flex flex-col flex-grow gap-3">
        <div className="flex flex-row gap-2 w-full">
          <div className="flex flex-row gap-2 items-center">
            <MailIcon size={30} />

            <p
              className={subtitle({
                size: "tiny",
                fullWidth: true,
                lineCamp: "one",
              })}
            >
              {currentUser.email}
            </p>
          </div>
          <div className="flex flex-row gap-2 items-center">
            <CalendarIcon size={30} />

            <p
              className={subtitle({
                size: "tiny",
                fullWidth: true,
                lineCamp: "one",
              })}
            >
              {currentUser.birthday}
            </p>
          </div>
        </div>
        <div className="flex flex-row gap-2 w-full">
          <div className="flex flex-row gap-2 items-center">
            <PhoneIcon size={30} />

            <p
              className={subtitle({
                size: "tiny",
                fullWidth: true,
                lineCamp: "one",
              })}
            >
              {currentUser.phone}
            </p>
          </div>
          <div className="flex flex-row gap-2 items-center">
            <PhoneIcon size={30} />

            <p
              className={subtitle({
                size: "tiny",
                fullWidth: true,
                lineCamp: "one",
              })}
            >
              {currentUser.workPhone}
            </p>
          </div>
        </div>
        <div className="flex flex-row gap-2 w-full">
          <Button
            color="danger"
            size="sm"
            startContent={<ArrowLeftIcon />}
            onClick={back}
          >
            Назад
          </Button>
          <div className="flex flex-row gap-2 items-center">
            <LinkIcon size={30} />

            <Link href={currentUser.vksLink}>Ссылка на комнату</Link>
          </div>
        </div>
      </div>
    </div>
  );
});
