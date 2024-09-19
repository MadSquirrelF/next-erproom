import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { IOrgschemaMenuSteps, useOrgschemaMenu } from "../store/orgschemaMenu";
import { OrgschemaService } from "../services/orgschema";

import { ISchema } from "@/src/entities/Schema";

export const useOrgschemaMenuList = () => {
  const currentSection = useOrgschemaMenu((state) => state.currentSection);
  const setStep = useOrgschemaMenu((state) => state.setStep);
  const setLoadedSchema = useOrgschemaMenu((state) => state.setLoadedSchema);
  const activeSchemaId = useOrgschemaMenu((state) => state.activeSchemaId);

  const { isLoading, isError, error, refetch } = useQuery<ISchema>({
    queryKey: ["get schema tree by id", activeSchemaId],
    queryFn: () => OrgschemaService.getSchemaById(activeSchemaId),
    enabled: false,
  });

  const handleLoadSchemaById = async () => {
    try {
      const result = await refetch(); // Ждем завершения запроса

      // Проверяем, успешен ли запрос
      if (result.isSuccess) {
        setLoadedSchema(result.data);
        setStep(IOrgschemaMenuSteps.MANAGE);
        toast.success("Схема успешно загружена");
      } else {
        // Если запрос не успешен, обрабатываем ошибку
        toast.error("Не удалось загрузить схему");
      }
    } catch (error) {
      // Обработка ошибки при выполнении запроса
      toast.error("Ошибка запроса");
    }
  };

  return useMemo(
    () => ({
      currentSection,
      handleLoadSchemaById,
      error,
      isLoading,
      isError,
      activeSchemaId,
    }),
    [currentSection, error, activeSchemaId, isLoading, isError],
  );
};
