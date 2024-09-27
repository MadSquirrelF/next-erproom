"use client";
import { useEffect, useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { IActionManageScreen, useOrgschemaMenu } from "../store/orgschemaMenu";
import { OrgschemaService } from "../services/orgschema";

import { ISchema } from "@/src/entities/Schema";

export const useUpdateUsers = () => {
  const queryClient = useQueryClient();

  const selectedBlock = useOrgschemaMenu((state) => state.selectedBlock);
  const setLoadedSchema = useOrgschemaMenu((state) => state.setLoadedSchema);
  const activeSchemaId = useOrgschemaMenu((state) => state.activeSchemaId);
  const setActionManageScreen = useOrgschemaMenu(
    (state) => state.setActionManageScreen,
  );
  const [selectedUsers, setSelectedUsers] = useState<number[]>([]);

  useEffect(() => {
    if (selectedBlock?.employee) {
      setSelectedUsers(selectedBlock.employee.map((e) => e.user_id));
    } else {
      setSelectedUsers([]);
    }
  }, [selectedBlock]);

  const { isLoading, isError, error, refetch } = useQuery<ISchema>({
    queryKey: ["get schema tree by id", activeSchemaId],
    queryFn: () => OrgschemaService.getSchemaById(activeSchemaId),
    enabled: false,
    select: (data) => {
      setLoadedSchema(data);

      return data;
    },
  });

  const { mutate: updateUsers } = useMutation({
    mutationKey: ["update block users", activeSchemaId, selectedBlock?.id],
    mutationFn: () =>
      OrgschemaService.updateUsers(
        activeSchemaId,
        selectedBlock?.id,
        selectedUsers,
      ),
    onSuccess: async () => {
      toast.success("Пользователи успешно изменены");

      await queryClient.invalidateQueries({
        queryKey: ["get all blocks by schema id", activeSchemaId],
      });

      refetch();

      setActionManageScreen(IActionManageScreen.INFO);
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
    setActionManageScreen(IActionManageScreen.INFO);
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
