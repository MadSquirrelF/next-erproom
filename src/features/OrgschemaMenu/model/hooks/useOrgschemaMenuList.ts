import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";

import {
  IManageScreen,
  IOrgschemaMenuSteps,
  useOrgschemaMenu,
} from "../store/orgschemaMenu";
import { OrgschemaService } from "../services/orgschema";

import { ISchema } from "@/src/entities/Schema";

export const useOrgschemaMenuList = () => {
  const currentSection = useOrgschemaMenu((state) => state.currentSection);
  const setStep = useOrgschemaMenu((state) => state.setStep);
  const setLoadedSchema = useOrgschemaMenu((state) => state.setLoadedSchema);
  const setManageScreen = useOrgschemaMenu((state) => state.setManageScreen);
  const activeSchemaId = useOrgschemaMenu((state) => state.activeSchemaId);

  const { isLoading, isError, error, refetch } = useQuery<ISchema>({
    queryKey: ["get schema tree by id", activeSchemaId],
    queryFn: () => OrgschemaService.getSchemaById(activeSchemaId),
    enabled: false,
    select: (data) => {
      setLoadedSchema(data);

      return data;
    },
  });

  const handleLoadSchemaById = async () => {
    try {
      const result = await refetch();

      if (result.isSuccess) {
        setStep(IOrgschemaMenuSteps.MANAGE);

        if (result.data.blocks && result.data.blocks.length === 0) {
          setManageScreen(IManageScreen.EMPTY);
        } else {
          setManageScreen(IManageScreen.MANAGE);
        }

        toast.success("Схема успешно загружена");
      } else {
        toast.error("Не удалось загрузить схему");
      }
    } catch (error) {
      toast.error("Ошибка запроса");
    }
  };

  return useMemo(
    () => ({
      currentSection,
      handleLoadSchemaById,
      error,
      refetch,
      isLoading,
      isError,
      activeSchemaId,
    }),
    [currentSection, error, refetch, activeSchemaId, isLoading, isError],
  );
};
