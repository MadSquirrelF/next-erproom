import { useQuery } from "@tanstack/react-query";
import { useEffect, useMemo } from "react";
import toast from "react-hot-toast";

import { IRoute } from "@/src/entities/Route/model/types/route";
import { OrgschemaService } from "@/src/features/OrgschemaMenu/model/services/orgschema";
import { useOrgschemaMenu } from "@/src/features/OrgschemaMenu/model/store/orgschemaMenu";

export const useRoutes = () => {
  const activeRouteId = useOrgschemaMenu((state) => state.activeRouteId);
  const setCurrentRouteScreen = useOrgschemaMenu(
    (state) => state.setCurrentRouteScreen,
  );

  const setIsRouteEmpty = useOrgschemaMenu((state) => state.setIsRouteEmpty);

  const setRouteName = useOrgschemaMenu((state) => state.setRouteName);

  const setRouteDescription = useOrgschemaMenu(
    (state) => state.setRouteDescription,
  );

  const {
    data: route,
    isLoading,
    isError,
    isSuccess,
    error,
  } = useQuery<IRoute>({
    queryKey: ["get route by id", activeRouteId],
    queryFn: () => OrgschemaService.getRouteById(activeRouteId),
    enabled: !!activeRouteId,
    select: (data) => {
      setRouteName(data.name);
      setRouteDescription(data.description);

      return data;
    },
  });

  useEffect(() => {
    if (isSuccess) {
      if (route.flowSteps && route.flowSteps.length === 0) {
        setIsRouteEmpty(true);
      }

      return;
    }

    if (isError) {
      toast.error("Не удалось загрузить схему!");

      return;
    }
  }, [isSuccess, isError, activeRouteId]);

  return useMemo(
    () => ({
      route,
      error,
      isLoading,
      isError,
      activeRouteId,
    }),
    [error, route, isSuccess, activeRouteId, isLoading, isError],
  );
};
