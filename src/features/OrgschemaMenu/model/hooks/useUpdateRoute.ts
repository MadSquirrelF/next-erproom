import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ChangeEvent, FormEvent, useCallback, useMemo, useState } from "react";
import toast from "react-hot-toast";

import { OrgschemaService } from "../services/orgschema";
import { IRouteScreen, useOrgschemaMenu } from "../store/orgschemaMenu";

import { IRouteAction } from "@/src/entities/Route/model/types/route";

export const useUpdateRoute = () => {
  const queryClient = useQueryClient();

  const prevRouteName = useOrgschemaMenu((state) => state.routeName);
  const prevRouteDescription = useOrgschemaMenu(
    (state) => state.routeDescription,
  );

  const [routeName, setRouteName] = useState("");

  const [routeDescription, setRouteDescription] = useState("");

  const [routeAction, setRouteAction] = useState<IRouteAction>(
    IRouteAction.NONE,
  );

  const [isDeletedPopoverOpen, setIsDeletedPopoverOpen] = useState(false);

  const [isCreateFormOpen, setIsCreateFormOpen] = useState(false);

  const setCurrentRouteScreen = useOrgschemaMenu(
    (state) => state.setCurrentRouteScreen,
  );

  const setActiveRouteId = useOrgschemaMenu((state) => state.setActiveRouteId);

  const setSelectedFlowStep = useOrgschemaMenu(
    (state) => state.setSelectedFlowStep,
  );

  const activeRouteId = useOrgschemaMenu((state) => state.activeRouteId);

  const { mutate: createRoute } = useMutation<number>({
    mutationKey: ["create new route"],
    mutationFn: () => OrgschemaService.createRoute(routeName, routeDescription),
    onSuccess: (data) => {
      toast.success("Маршрут успешно создан");
      setActiveRouteId(data);
      setCurrentRouteScreen(IRouteScreen.MANAGE);
      setRouteAction(IRouteAction.NONE);

      queryClient.invalidateQueries({
        queryKey: ["get all routes"],
      });
    },
    onError: (error: any) => {
      toast.error("Ошибка при создании маршрута");
      toast.error(error.response.data.message);
    },
  });

  const { mutate: updateRoute } = useMutation({
    mutationKey: ["update route", activeRouteId],
    mutationFn: () =>
      OrgschemaService.updateRoute(activeRouteId, routeName, routeDescription),
    onSuccess: async () => {
      toast.success("Маршрут успешно обвлен");

      queryClient.invalidateQueries({
        queryKey: ["get all routes"],
      });

      queryClient.invalidateQueries({
        queryKey: ["get route by id", activeRouteId],
      });

      setRouteAction(IRouteAction.NONE);
      clearInputValues();
    },
    onError: (error: any) => {
      toast.error("Ошибка при обновлении схемы");
      toast.error(error.response.data.message);
    },
  });

  const { mutate: deleteRoute } = useMutation({
    mutationKey: ["delete route", activeRouteId],
    mutationFn: () => OrgschemaService.deleteRoute(activeRouteId),
    onSuccess: () => {
      toast.success("Маршрут успешно удален");

      setIsDeletedPopoverOpen(false);

      setCurrentRouteScreen(IRouteScreen.LIST);

      setSelectedFlowStep(undefined);

      setActiveRouteId(undefined);

      queryClient.invalidateQueries({
        queryKey: ["get all routes"],
      });
    },
    onError: (error: any) => {
      toast.error("Ошибка при удалении маршрута");
      toast.error(error.response.data.message);
    },
  });

  const clearInputValues = () => {
    setRouteName("");
    setRouteDescription("");
  };

  const handleCloseForm = useCallback(() => {
    setIsCreateFormOpen(false);
    clearInputValues();
  }, []);

  const handleClearAction = useCallback(() => {
    setRouteAction(IRouteAction.NONE);
    clearInputValues();
  }, []);

  const handleUpdateAction = useCallback(() => {
    setRouteName(prevRouteName);

    setRouteDescription(prevRouteDescription);
    setRouteAction(IRouteAction.UPDATE);
  }, [prevRouteName, prevRouteDescription]);

  const handleCreateAction = useCallback(() => {
    setRouteAction(IRouteAction.ADD);
    clearInputValues();
  }, []);

  const handleOpenForm = useCallback(() => {
    setIsCreateFormOpen(true);
  }, []);

  const onChangeRouteName = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setRouteName(event.target.value);
    },
    [],
  );

  const handleDeleteRoute = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    deleteRoute();
  };

  const onChangeRouteDescription = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setRouteDescription(event.target.value);
    },
    [],
  );

  const onSubmitCreateRouteForm = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      createRoute();
    },
    [],
  );

  const onSubmitUpdateRouteForm = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      updateRoute();
    },
    [],
  );

  return useMemo(
    () => ({
      routeName,
      handleClearAction,
      routeDescription,
      onChangeRouteName,
      onChangeRouteDescription,
      isCreateFormOpen,
      handleCreateAction,
      handleCloseForm,
      handleDeleteRoute,
      handleOpenForm,
      onSubmitCreateRouteForm,
      isDeletedPopoverOpen,
      setIsDeletedPopoverOpen,
      routeAction,
      handleUpdateAction,
      onSubmitUpdateRouteForm,
      setRouteAction,
    }),
    [
      routeName,
      routeDescription,
      onChangeRouteName,
      onSubmitUpdateRouteForm,
      handleClearAction,
      onChangeRouteDescription,
      isCreateFormOpen,
      handleUpdateAction,
      handleDeleteRoute,
      handleCreateAction,
      handleCloseForm,
      onSubmitCreateRouteForm,
      handleOpenForm,
      isDeletedPopoverOpen,
      setIsDeletedPopoverOpen,
      routeAction,
      setRouteAction,
    ],
  );
};
