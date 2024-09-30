"use client";
import { memo } from "react";
import { Button } from "@nextui-org/button";
import { Skeleton } from "@nextui-org/skeleton";

import { AddIcon } from "@/src/shared/assets/icons";
import { useUpdateUsers } from "@/src/features/OrgschemaMenu/model/hooks/useUpdateUsers";
import { useUser } from "@/src/entities/User/hooks/useUser";
import { UsersList } from "@/src/entities/User/ui/UsersList/UsersList";

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

    const { data, isLoading, isError, error } = useUser();

    if (isLoading) {
      return (
        <div className="relative flex flex-col flex-grow gap-9 w-full justify-between">
          <div className="flex flex-col gap-2 w-full">
            <Skeleton className="w-1/2 rounded-2xl h-2" />
            <Skeleton className="w-full rounded-2xl h-20" />
            <Skeleton className="w-full rounded-2xl h-20" />
            <Skeleton className="w-full rounded-2xl h-20" />
            <Skeleton className="w-full rounded-2xl h-20" />
          </div>

          <div className="flex flex-col w-full gap-2">
            <Skeleton className="w-full rounded-2xl h-12" />
            <Skeleton className="w-full rounded-2xl h-12" />
          </div>
        </div>
      );
    }

    if (isError) {
      return <div>Ошибка</div>;
    }

    if (!data || data.length === 0) {
      return <div>Нет пользователей</div>;
    }

    return (
      <form className="relative flex flex-col w-full flex-grow gap-4 justify-between">
        <UsersList
          selectedUsers={selectedUsers}
          users={data}
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
