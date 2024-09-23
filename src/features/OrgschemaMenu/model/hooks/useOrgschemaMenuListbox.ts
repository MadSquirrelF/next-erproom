import { useQuery } from "@tanstack/react-query";
import { Key, useMemo } from "react";

import { OrgschemaService } from "../services/orgschema";
import { useOrgschemaMenu } from "../store/orgschemaMenu";

import { ISchema } from "@/src/entities/Schema";

export const useOrgschemaMenuListbox = () => {
  const currentSection = useOrgschemaMenu((state) => state.currentSection);
  const activeSchemaId = useOrgschemaMenu((state) => state.activeSchemaId);
  const setActiveSchemaId = useOrgschemaMenu(
    (state) => state.setActiveSchemaId,
  );

  // Получить все схемы
  const { data, isLoading, isError, error } = useQuery<ISchema[]>({
    queryKey: ["get all schemas"],
    queryFn: () => OrgschemaService.getAllSchemas(),
  });

  // Обработка выбора схемы
  const handleSelectSchema = (schemaId: Key | null) => {
    schemaId === null
      ? setActiveSchemaId(undefined)
      : setActiveSchemaId(Number(schemaId));
  };

  return useMemo(
    () => ({
      data,
      isLoading,
      isError,
      error,
      handleSelectSchema,
      currentSection,
      activeSchemaId,
    }),
    [
      data,
      isLoading,
      isError,
      error,
      activeSchemaId,
      currentSection,
      handleSelectSchema,
    ],
  );
};
