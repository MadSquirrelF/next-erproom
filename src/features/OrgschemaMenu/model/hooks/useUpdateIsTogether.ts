"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useMemo } from "react";

import { OrgschemaService } from "../services/orgschema";
import { useOrgschemaMenu } from "../store/orgschemaMenu";

import { INode } from "@/src/entities/Node";

export const useUpdateIsTogether = () => {
  const queryClient = useQueryClient();
  const activeSchemaId = useOrgschemaMenu((state) => state.activeSchemaId);

  const selectedBlock = useOrgschemaMenu((state) => state.selectedBlock);
  const setSelectedBlock = useOrgschemaMenu((state) => state.setSelectedBlock);

  const { mutate: updateIsTogether } = useMutation({
    mutationKey: ["update block isTogether", activeSchemaId, selectedBlock?.id],
    mutationFn: (value: number) =>
      OrgschemaService.updateBlock(activeSchemaId, selectedBlock?.id, {
        is_together: value,
        name: selectedBlock?.name,
      }),
    onSuccess: async () => {
      toast.success("Отображение успешно обновлено");

      queryClient.invalidateQueries({
        queryKey: ["get all blocks by schema id", activeSchemaId],
      });

      queryClient.invalidateQueries({
        queryKey: ["get schema tree by id", activeSchemaId],
      });

      const updatedBlocks = await queryClient.getQueryData<INode[]>([
        "get all blocks by schema id",
        activeSchemaId,
      ]);

      const updatedBlock = updatedBlocks?.find(
        (b) => b.id === selectedBlock?.id,
      );

      setSelectedBlock(updatedBlock);
    },
    onError: (error: any) => {
      toast.error("Ошибка при смене отображения блоков");
      toast.error(error.response.data.message);
    },
  });

  const handleIsTogether = (value: number) => {
    updateIsTogether(value);
  };

  return useMemo(
    () => ({
      handleIsTogether,
    }),
    [handleIsTogether],
  );
};
