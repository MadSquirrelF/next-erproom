import { useQuery } from "@tanstack/react-query";
import { Key, useMemo, useState } from "react";

import { OrgschemaService } from "../services/orgschema";
import { IRouteScreen, useOrgschemaMenu } from "../store/orgschemaMenu";

import { IRoute } from "@/src/entities/Route/model/types/route";

export const useRoutesListbox = () => {
  const [selectedRoute, setSelectedRoute] = useState<number | undefined>(
    undefined,
  );

  const activeRouteId = useOrgschemaMenu((state) => state.activeRouteId);
  const setActiveRouteId = useOrgschemaMenu((state) => state.setActiveRouteId);
  const setCurrentRouteScreen = useOrgschemaMenu(
    (state) => state.setCurrentRouteScreen,
  );
  // Получить все маршруты
  const { data, isLoading, isError, error } = useQuery<IRoute[]>({
    queryKey: ["get all routes"],
    queryFn: () => OrgschemaService.getAllRoutes(),
  });

  // Обработка выбора маршрута
  const handleSelectRoute = (routeId: Key | null) => {
    routeId === null
      ? setSelectedRoute(undefined)
      : setSelectedRoute(Number(routeId));
  };

  const handleLoadRoute = () => {
    setActiveRouteId(selectedRoute);
    setCurrentRouteScreen(IRouteScreen.MANAGE);
  };

  return useMemo(
    () => ({
      data,
      isLoading,
      isError,
      error,
      selectedRoute,
      handleLoadRoute,
      handleSelectRoute,
      activeRouteId,
    }),
    [
      data,
      isLoading,
      isError,
      error,
      selectedRoute,
      handleLoadRoute,
      handleSelectRoute,
      activeRouteId,
    ],
  );
};
