"use client";
import { useEffect, useMemo, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { IManageScreen, useOrgschemaMenu } from "../store/orgschemaMenu";
import { OrgschemaService } from "../services/orgschema";

export const useUpdateUsers = () => {
  const queryClient = useQueryClient();

  const selectedBlock = useOrgschemaMenu((state) => state.selectedBlock);
  const activeSchemaId = useOrgschemaMenu((state) => state.activeSchemaId);
  const setManageScreen = useOrgschemaMenu((state) => state.setManageScreen);
  const [selectedUsers, setSelectedUsers] = useState<number[]>([]);

  useEffect(() => {
    if (selectedBlock?.employee) {
      setSelectedUsers(selectedBlock.employee.map((e) => e.user_id));
    } else {
      setSelectedUsers([]);
    }
  }, [selectedBlock]);
  const { mutate: updateUsers } = useMutation({
    mutationKey: ["update block users", activeSchemaId, selectedBlock?.id],
    mutationFn: () =>
      OrgschemaService.updateUsers(
        activeSchemaId,
        selectedBlock?.id,
        selectedUsers,
        selectedBlock?.name,
      ),
    onSuccess: async () => {
      toast.success("Пользователи успешно изменены");

      queryClient.invalidateQueries({
        queryKey: ["get all blocks by schema id", activeSchemaId],
      });

      queryClient.invalidateQueries({
        queryKey: ["get schema tree by id", activeSchemaId],
      });

      setManageScreen(IManageScreen.MANAGE);
    },
    onError: (error: any) => {
      toast.error("Ошибка при редактировании пользователей");
      toast.error(error.response.data.message);
    },
  });

  const onChangeSelectedUsers = (value: string[]) => {
    setSelectedUsers(value.map(Number));
  };

  const cancelEdit = () => {
    setManageScreen(IManageScreen.MANAGE);
  };

  const handleUpdateUsers = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    updateUsers();
  };

  return useMemo(
    () => ({
      selectedUsers,
      onChangeSelectedUsers,
      cancelEdit,
      handleUpdateUsers,
    }),
    [selectedUsers, onChangeSelectedUsers, cancelEdit, handleUpdateUsers],
  );
};
