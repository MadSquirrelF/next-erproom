import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";

import { OrgschemaService } from "../services/orgschema";
import { useOrgschemaMenu } from "../store/orgschemaMenu";

import { IFlowStep } from "@/src/entities/Route/model/types/route";
import { INodeShort } from "@/src/entities/Node/model/types/node";

export const useUpdateStepsData = () => {
  const activeRouteId = useOrgschemaMenu((state) => state.activeRouteId);
  const isRouteEmpty = useOrgschemaMenu((state) => state.isRouteEmpty);

  // Получить все Блоки схемы
  const {
    data: AllBlocks,
    isLoading: isLoadingAllBlocks,
    isError: isErrorAllBlocks,
    error: ErrorAllBlocks,
  } = useQuery<INodeShort[] | []>({
    queryKey: ["get all blocks"],
    queryFn: () => OrgschemaService.getAllBlocks(),
  });

  // Получить все шаги
  const {
    data: AllSteps,
    isLoading: IsLoadingAllSteps,
    isError: IsErrorAllSteps,
    error: ErrorAllSteps,
  } = useQuery<IFlowStep[]>({
    queryKey: ["get route all steps", activeRouteId],
    queryFn: () => OrgschemaService.getAllRouteSteps(activeRouteId),
    enabled: !isRouteEmpty,
  });

  return useMemo(
    () => ({
      AllSteps,
      IsLoadingAllSteps,
      IsErrorAllSteps,
      ErrorAllSteps,
      AllBlocks,
      isLoadingAllBlocks,
      isErrorAllBlocks,
      ErrorAllBlocks,
    }),
    [
      AllSteps,
      IsLoadingAllSteps,
      IsErrorAllSteps,
      ErrorAllSteps,
      AllBlocks,
      isLoadingAllBlocks,
      isErrorAllBlocks,
      ErrorAllBlocks,
    ],
  );
};
