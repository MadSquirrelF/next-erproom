import { useQuery } from "@tanstack/react-query";
import { useEffect, useMemo } from "react";
import toast from "react-hot-toast";

import { useOrgschemaBoardStore } from "../store/orgschemaBoardStore";

import { ISchema } from "@/src/entities/Schema";
import {
  IManageScreen,
  IOrgschemaMenuSteps,
  useOrgschemaMenu,
} from "@/src/features/OrgschemaMenu/model/store/orgschemaMenu";
import { OrgschemaService } from "@/src/features/OrgschemaMenu/model/services/orgschema";

export const useBoard = () => {
  const activeSchemaId = useOrgschemaMenu((state) => state.activeSchemaId);
  const setSchemaName = useOrgschemaMenu((state) => state.setSchemaName);
  const setManageScreen = useOrgschemaMenu((state) => state.setManageScreen);
  const setStep = useOrgschemaMenu((state) => state.setStep);

  const setIsSchemaLoaded = useOrgschemaBoardStore(
    (state) => state.setIsSchemaLoaded,
  );

  const {
    data: schema,
    isLoading,
    isError,
    isSuccess,
    error,
  } = useQuery<ISchema>({
    queryKey: ["get schema tree by id", activeSchemaId],
    queryFn: () => OrgschemaService.getSchemaById(activeSchemaId),
    enabled: !!activeSchemaId,
    select: (data) => {
      setSchemaName(data.name);

      return data;
    },
  });

  useEffect(() => {
    if (isSuccess) {
      toast.success("Схема успешно загружена!");
      setIsSchemaLoaded(true);
      setStep(IOrgschemaMenuSteps.MANAGE);

      if (schema.blocks && schema.blocks.length > 0) {
        setManageScreen(IManageScreen.MANAGE);
      } else {
        setManageScreen(IManageScreen.EMPTY);
      }

      return;
    }

    if (isError) {
      toast.error("Не удалось загрузить схему!");

      return;
    }
  }, [isSuccess, isError, activeSchemaId]);

  return useMemo(
    () => ({
      schema,
      error,
      isLoading,
      isError,
      activeSchemaId,
    }),
    [error, schema, isSuccess, activeSchemaId, isLoading, isError],
  );
};
