"use client";

import { CheckboxGroup } from "@nextui-org/checkbox";
import { ScrollShadow } from "@nextui-org/scroll-shadow";
import { memo } from "react";

import { IUser } from "../../model/types/user";

import { UserItem } from "./UserItem/UserItem";

interface UsersListProps {
  selectedUsers: number[];
  users: IUser[];
  onChangeSelectedUsers: (value: string[]) => void;
}

export const UsersList = memo((props: UsersListProps) => {
  const { selectedUsers, users, onChangeSelectedUsers } = props;

  return (
    <CheckboxGroup
      classNames={{
        base: "w-full",
      }}
      label="Выберите сотрудников"
      value={selectedUsers.map(String)}
      onValueChange={(value) => onChangeSelectedUsers(value)}
    >
      <ScrollShadow
        hideScrollBar
        className="h-[480px] w-full flex flex-col gap-2"
      >
        {users.map((user) => (
          <UserItem key={user.id} user={user} />
        ))}
      </ScrollShadow>
    </CheckboxGroup>
  );
});
