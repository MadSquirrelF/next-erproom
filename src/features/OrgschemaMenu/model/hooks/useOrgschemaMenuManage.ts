"use client";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";

import { OrgschemaService } from "../services/orgschema";
import { useOrgschemaMenu } from "../store/orgschemaMenu";

import { INode } from "@/src/entities/Node";

export const useOrgschemaMenuManage = () => {
  const activeSchemaId = useOrgschemaMenu((state) => state.activeSchemaId);
  const selectedBlock = useOrgschemaMenu((state) => state.selectedBlock);
  const setSelectedBlock = useOrgschemaMenu((state) => state.setSelectedBlock);

  // Получить все схемы
  const { data, isLoading, isError, error } = useQuery<INode[] | []>({
    queryKey: ["get all blocks by schema id", activeSchemaId],
    queryFn: () => OrgschemaService.getAllBlocksSchemeById(activeSchemaId),
    enabled: !!activeSchemaId,
    select: (data) => {
      if (selectedBlock) {
        setSelectedBlock(data.find((block) => block.id === selectedBlock.id));
      }

      return data;
    },
  });

  return useMemo(
    () => ({
      data,
      error,
      isLoading,
      isError,
      activeSchemaId,
    }),
    [data, error, activeSchemaId, isLoading, isError],
  );
};
