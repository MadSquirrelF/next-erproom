import { Checkbox } from "@nextui-org/checkbox";
import { memo } from "react";
import { Chip, cn } from "@nextui-org/react";
import { User } from "@nextui-org/user";
import { Link } from "@nextui-org/link";

import { IUser } from "@/src/features/OrgschemaMenu/model/data/data";
import {
  getUserStatus,
  getUserStatusColor,
} from "@/src/shared/utils/userFunctions/userFunctions";

interface UserItemProps {
  className?: string;
  user: IUser;
}

export const UserItem = memo((props: UserItemProps) => {
  const { className, user } = props;

  return (
    <Checkbox
      aria-label={user.fullName}
      classNames={{
        base: cn(
          "inline-flex max-w-md w-full bg-content1 m-0",
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
            src: user.avatarPath,
            isBordered: true,
            color: getUserStatusColor(user.status),
          }}
          classNames={{
            name: "line-clamp-1",
          }}
          description={
            <Link isExternal href={user.email} size="sm">
              @{user.email}
            </Link>
          }
          name={user.fullName}
        />
        <div className="flex flex-col items-end gap-1">
          <span className="text-tiny text-default-500">{user.position}</span>
          <Chip
            color={getUserStatusColor(user.status)}
            size="sm"
            variant="flat"
          >
            {getUserStatus(user.status)}
          </Chip>
        </div>
      </div>
    </Checkbox>
  );
});
