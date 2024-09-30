import { memo } from "react";
import { Checkbox } from "@nextui-org/checkbox";
import { Chip, cn } from "@nextui-org/react";
import { User } from "@nextui-org/user";
import { Link } from "@nextui-org/link";

import { IUser } from "../../../model/types/user";

import {
  formatFullName,
  getStatusColor,
  getStatusText,
} from "@/src/shared/utils/userFunctions/userFunctions";

interface UserItemProps {
  user: IUser;
}

export const UserItem = memo((props: UserItemProps) => {
  const { user } = props;

  return (
    <Checkbox
      aria-label={formatFullName(user.name, user.middlename, user.lastname)}
      classNames={{
        base: cn(
          "inline-flex w-full max-w-full bg-content1 m-0",
          "hover:bg-content2 items-center justify-start",
          "cursor-pointer rounded-lg gap-2 p-4 border-2 border-transparent",
          "data-[selected=true]:border-primary",
        ),
        label: "w-full",
      }}
      value={String(user.id)}
    >
      <div className="w-full flex justify-between gap-2">
        <User
          avatarProps={{
            size: "md",
            color: getStatusColor(user.status, user.vacation, user.disease),
            src: user.avatar || "",
            name: user.name || "",
            className: "flex-none",
          }}
          classNames={{
            name: "line-clamp-1 max-w-32",
            description: "line-clamp-1 max-w-32",
          }}
          description={
            <Link isExternal href={user.email || ""} size="sm">
              @{user.email}
            </Link>
          }
          name={formatFullName(user.name, user.middlename, user.lastname)}
        />
        <div className="flex flex-col items-end gap-1">
          <span className="text-tiny text-default-500">{user.status}</span>
          <Chip
            color={getStatusColor(user.status, user.vacation, user.disease)}
            size="sm"
            variant="flat"
          >
            {getStatusText(user.status, user.vacation, user.disease)}
          </Chip>
        </div>
      </div>
    </Checkbox>
  );
});
