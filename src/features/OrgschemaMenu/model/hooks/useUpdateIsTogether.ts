"use client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useMemo } from "react";

import { OrgschemaService } from "../services/orgschema";
import { useOrgschemaMenu } from "../store/orgschemaMenu";

import { ISchema } from "@/src/entities/Schema";
import { INode } from "@/src/entities/Node";

export const useUpdateIsTogether = () => {
  const queryClient = useQueryClient();
  const activeSchemaId = useOrgschemaMenu((state) => state.activeSchemaId);

  const selectedBlock = useOrgschemaMenu((state) => state.selectedBlock);
  const setLoadedSchema = useOrgschemaMenu((state) => state.setLoadedSchema);
  const setSelectedBlock = useOrgschemaMenu((state) => state.setSelectedBlock);

  const { isLoading, isError, error, refetch } = useQuery<ISchema>({
    queryKey: ["get schema tree by id", activeSchemaId],
    queryFn: () => OrgschemaService.getSchemaById(activeSchemaId),
    enabled: false,
    select: (data) => {
      setLoadedSchema(data);

      return data;
    },
  });

  const { mutate: updateIsTogether } = useMutation({
    mutationKey: ["update block isTogether", activeSchemaId, selectedBlock?.id],
    mutationFn: (value: number) =>
      OrgschemaService.updateBlock(activeSchemaId, selectedBlock?.id, {
        is_together: value,
      }),
    onSuccess: () => {
      toast.success("Отображение успешно обновлено");

      queryClient.invalidateQueries({
        queryKey: ["get all blocks by schema id", activeSchemaId],
      });

      const updatedBlocks = queryClient.getQueryData<INode[]>([
        "get all blocks by schema id",
        activeSchemaId,
      ]);

      const updatedBlock = updatedBlocks?.find(
        (b) => b.id === selectedBlock?.id,
      );

      setSelectedBlock(updatedBlock);

      refetch();
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
