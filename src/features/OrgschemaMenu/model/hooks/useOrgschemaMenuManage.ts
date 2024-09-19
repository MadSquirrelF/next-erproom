import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";

import { OrgschemaService } from "../services/orgschema";
import { useOrgschemaMenu } from "../store/orgschemaMenu";

import { INode } from "@/src/entities/Node";

export const useOrgschemaMenuManage = () => {
  const activeSchemaId = useOrgschemaMenu((state) => state.activeSchemaId);
  const loadedSchema = useOrgschemaMenu((state) => state.loadedSchema);
  // Получить все схемы
  const { data, isLoading, isError, error } = useQuery<INode[]>({
    queryKey: ["get all blocks by schema id", activeSchemaId],
    queryFn: () => OrgschemaService.getAllBlocksSchemeById(activeSchemaId),
  });

  return useMemo(
    () => ({
      data,
      error,
      isLoading,
      isError,
      activeSchemaId,
      loadedSchema,
    }),
    [data, error, activeSchemaId, loadedSchema, isLoading, isError],
  );
};
