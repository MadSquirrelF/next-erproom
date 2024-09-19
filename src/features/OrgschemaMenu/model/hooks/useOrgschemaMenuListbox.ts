import { useQuery } from "@tanstack/react-query";
import { useCallback, useMemo } from "react";
import { Selection } from "@nextui-org/react";

import { OrgschemaService } from "../services/orgschema";
import { useOrgschemaMenu } from "../store/orgschemaMenu";

import { ISchema } from "@/src/entities/Schema";

export const useOrgschemaMenuListbox = () => {
  const currentSection = useOrgschemaMenu((state) => state.currentSection);
  const setActiveSchemaId = useOrgschemaMenu(
    (state) => state.setActiveSchemaId,
  );

  // Получить все схемы
  const { data, isLoading, isError, error } = useQuery<ISchema[]>({
    queryKey: ["get all schemas"],
    queryFn: () => OrgschemaService.getAllSchemas(),
  });

  // Обработка выбора схемы
  const handleSelectionChange = useCallback((keys: Selection) => {
    const id = Array.from(keys)[0];

    setActiveSchemaId(Number(id));
  }, []);

  return useMemo(
    () => ({
      data,
      isLoading,
      isError,
      error,
      handleSelectionChange,
      currentSection,
    }),
    [data, isLoading, isError, error, currentSection],
  );
};
