import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  ChangeEvent,
  FormEvent,
  useCallback,
  useMemo,
  useRef,
  useState,
} from "react";
import toast from "react-hot-toast";

import { OrgschemaService } from "../services/orgschema";
import { IRouteScreen, useOrgschemaMenu } from "../store/orgschemaMenu";

export const useUpdateRoute = () => {
  const queryClient = useQueryClient();
  const [routeName, setRouteName] = useState("");
  const [routeDescription, setRouteDescription] = useState("");

  const inputRef = useRef<HTMLInputElement | null>(null);

  const [isCreateFormOpen, setIsCreateFormOpen] = useState(false);
  const setCurrentRouteScreen = useOrgschemaMenu(
    (state) => state.setCurrentRouteScreen,
  );

  const setActiveRouteId = useOrgschemaMenu((state) => state.setActiveRouteId);

  const activeRouteId = useOrgschemaMenu((state) => state.activeRouteId);
  const [isRouteInputReadonly, setIsRouteInputReadonly] = useState(true);
  const [isDeletedPopoverOpen, setIsDeletedPopoverOpen] = useState(false);

  const { mutate: createRoute } = useMutation<number>({
    mutationKey: ["create new route"],
    mutationFn: () => OrgschemaService.createRoute(routeName, routeDescription),
    onSuccess: (data) => {
      toast.success("Маршрут успешно создан");
      setActiveRouteId(data);
      setCurrentRouteScreen(IRouteScreen.MANAGE);

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
    onSuccess: () => {
      toast.success("Маршрут успешно обвлен");

      queryClient.invalidateQueries({
        queryKey: ["get all routes"],
      });

      queryClient.invalidateQueries({
        queryKey: ["get route by id", activeRouteId],
      });

      setIsRouteInputReadonly(true);
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

  const handleEditRoute = () => {
    setIsRouteInputReadonly(false);

    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const clearInputValues = () => {
    setRouteName("");
    setRouteDescription("");
  };

  const handleCloseForm = useCallback(() => {
    setIsCreateFormOpen(false);
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

  return useMemo(
    () => ({
      routeName,
      routeDescription,
      onChangeRouteName,
      onChangeRouteDescription,
      isCreateFormOpen,
      handleCloseForm,
      handleOpenForm,
      onSubmitCreateRouteForm,
    }),
    [
      routeName,
      routeDescription,
      onChangeRouteName,
      onChangeRouteDescription,
      isCreateFormOpen,
      handleCloseForm,
      onSubmitCreateRouteForm,
      handleOpenForm,
    ],
  );
};
