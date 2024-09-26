"use client";
import { memo } from "react";
import { Button } from "@nextui-org/button";

import { UsersList } from "./UsersList/UsersList";

import { AddIcon } from "@/src/shared/assets/icons";
import { useUpdateUsers } from "@/src/features/OrgschemaMenu/model/hooks/useUpdateUsers";

interface ActionManageScreenUserProps {
  className?: string;
}

export const ActionManageScreenUser = memo(
  (props: ActionManageScreenUserProps) => {
    const { className } = props;

    const {
      selectedUsers,
      onChangeSelectedUsers,
      cancelEdit,
      handleUpdateUsers,
    } = useUpdateUsers();

    return (
      <form className="relative flex flex-col flex-grow gap-9 justify-between">
        <UsersList
          selectedUsers={selectedUsers}
          onChangeSelectedUsers={onChangeSelectedUsers}
        />

        <div className="flex flex-col w-full gap-2">
          <Button
            fullWidth
            color="danger"
            size="lg"
            variant="faded"
            onClick={cancelEdit}
          >
            Отменить добавление
          </Button>
          <Button
            fullWidth
            color="primary"
            endContent={<AddIcon />}
            size="lg"
            onClick={handleUpdateUsers}
          >
            Добавить пользователей
          </Button>
        </div>
      </form>
    );
  },
);
