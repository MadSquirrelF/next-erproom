"use client";
import { CheckboxGroup } from "@nextui-org/checkbox";
import { memo } from "react";
import { ScrollShadow } from "@nextui-org/scroll-shadow";

import { UserItem } from "./UserItem/UserItem";

import { UserListData } from "@/src/features/OrgschemaMenu/model/data/data";

interface UsersListProps {
  className?: string;
  selectedUsers: number[];

  onChangeSelectedUsers: (value: string[]) => void;
}

export const UsersList = memo((props: UsersListProps) => {
  const { className, selectedUsers, onChangeSelectedUsers } = props;

  return (
    <CheckboxGroup
      classNames={{
        base: "w-full",
      }}
      label="Выберите сотрудников"
      value={selectedUsers.map(String)}
      onValueChange={(value) => onChangeSelectedUsers(value)}
    >
      <ScrollShadow hideScrollBar className="h-[450px] flex flex-col gap-2">
        {UserListData.map((user) => (
          <UserItem key={user.id} user={user} />
        ))}
      </ScrollShadow>
    </CheckboxGroup>
  );
});
