"use client";
import { useQuery } from "@tanstack/react-query";
import { Key, useMemo, useState } from "react";

import { OrgschemaService } from "../services/orgschema";
import { IOrgschemaMenuSteps, useOrgschemaMenu } from "../store/orgschemaMenu";

import { ISchema } from "@/src/entities/Schema";

export const useOrgschemaMenuListbox = () => {
  const [selectedSchema, setSelectedSchema] = useState<number | undefined>(
    undefined,
  );
  const setStep = useOrgschemaMenu((state) => state.setStep);
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
      ? setSelectedSchema(undefined)
      : setSelectedSchema(Number(schemaId));
  };

  const handleLoadSchema = () => {
    setActiveSchemaId(selectedSchema);
    setStep(IOrgschemaMenuSteps.MANAGE);
  };

  return useMemo(
    () => ({
      data,
      isLoading,
      isError,
      error,
      handleSelectSchema,
      handleLoadSchema,
      activeSchemaId,
      selectedSchema,
    }),
    [
      data,
      isLoading,
      isError,
      error,
      activeSchemaId,
      selectedSchema,
      handleSelectSchema,
    ],
  );
};
