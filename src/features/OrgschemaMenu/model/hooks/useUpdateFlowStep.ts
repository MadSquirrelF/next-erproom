import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ChangeEvent, Key, useCallback, useMemo, useState } from "react";
import { SharedSelection } from "@nextui-org/react";
import toast from "react-hot-toast";

import { IRouteScreen, useOrgschemaMenu } from "../store/orgschemaMenu";
import { OrgschemaService } from "../services/orgschema";

import { IRoute } from "@/src/entities/Route/model/types/route";

export const useUpdateFlowStep = () => {
  const queryClient = useQueryClient();

  const selectedFlowStep = useOrgschemaMenu((state) => state.selectedFlowStep);
  const flowStepForm = useOrgschemaMenu((state) => state.flowStepForm);
  const activeRouteId = useOrgschemaMenu((state) => state.activeRouteId);
  const setSelectedFlowStep = useOrgschemaMenu(
    (state) => state.setSelectedFlowStep,
  );
  const [isDeletedPopoverFlowStepOpen, setIsDeletedPopoverFlowStepOpen] =
    useState(false);

  const setFlowStepForm = useOrgschemaMenu((state) => state.setFlowStepForm);
  const setIsRouteEmpty = useOrgschemaMenu((state) => state.setIsRouteEmpty);
  const setCurrentRouteScreen = useOrgschemaMenu(
    (state) => state.setCurrentRouteScreen,
  );

  const { mutate: createFlowStep } = useMutation<number>({
    mutationKey: ["create new flow step"],
    mutationFn: () =>
      OrgschemaService.createFlowStep(activeRouteId, flowStepForm),
    onSuccess: () => {
      toast.success("Шаг успешно создан");

      queryClient.invalidateQueries({
        queryKey: ["get route by id", activeRouteId],
      });

      setIsRouteEmpty(false);
      setCurrentRouteScreen(IRouteScreen.MANAGE);
      setFlowStepForm(undefined);
      setSelectedFlowStep(undefined);
    },
    onError: (error: any) => {
      toast.error("Ошибка при создании шага");
      toast.error(error.response.data.message);
    },
  });

  const { mutate: updateFlowStep } = useMutation({
    mutationKey: ["update flow step", activeRouteId, selectedFlowStep?.id],
    mutationFn: () =>
      OrgschemaService.updateFlowStep(
        activeRouteId,
        selectedFlowStep?.id,
        flowStepForm,
      ),
    onSuccess: () => {
      toast.success("Шаг успешно обновлен");

      queryClient.invalidateQueries({
        queryKey: ["get route all steps", activeRouteId],
      });

      queryClient.invalidateQueries({
        queryKey: ["get route by id", activeRouteId],
      });

      setSelectedFlowStep(undefined);
      setFlowStepForm(undefined);
      setCurrentRouteScreen(IRouteScreen.MANAGE);
    },
    onError: (error: any) => {
      toast.error("Ошибка при обновлении шага");
      toast.error(error.response.data.message);
    },
  });

  const { mutate: deleteFlowStep } = useMutation({
    mutationKey: ["delete flow step", activeRouteId, selectedFlowStep?.id],
    mutationFn: () =>
      OrgschemaService.deleteFlowStep(activeRouteId, selectedFlowStep?.id),
    onSuccess: async () => {
      toast.success("Шаг успешно удален");
      setSelectedFlowStep(undefined);
      setIsDeletedPopoverFlowStepOpen(false);

      queryClient.invalidateQueries({
        queryKey: ["get route by id", activeRouteId],
      });

      const result = await queryClient.fetchQuery<IRoute>({
        queryKey: ["get route by id", activeRouteId],
      });

      if (result.flowSteps && result.flowSteps.length === 0) {
        setIsRouteEmpty(true);
      }
    },
    onError: (error: any) => {
      toast.error("Ошибка при удалении шага");
      toast.error(error.response.data.message);
    },
  });

  const handleDeleteFlowStep = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    deleteFlowStep();
  };

  // Отмена создания
  const handleCancelCreateFlowStepScreen = () => {
    setCurrentRouteScreen(IRouteScreen.MANAGE);
    // Логика отчистки ниже
    setFlowStepForm(undefined);
  };
  // Отмена создания
  const handleCancelUpdateFlowStepScreen = () => {
    setCurrentRouteScreen(IRouteScreen.MANAGE);
    // Логика отчистки ниже
    setFlowStepForm(undefined);
  };

  // Изменение статуса документа при успехе
  const onChangeSuccesStatus = useCallback((keys: SharedSelection) => {
    setFlowStepForm({
      success_status: Number(keys.currentKey),
    });
  }, []);

  // Изменение статуса документа при неудаче
  const onChangeFailStatus = useCallback((keys: SharedSelection) => {
    setFlowStepForm({
      fail_status: Number(keys.currentKey),
    });
  }, []);

  // Изменение описания
  const onChangeDescription = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setFlowStepForm({ description: e.currentTarget.value || "" });
    },
    [],
  );
  // Изменение шага при успехе
  const onChangeSuccesStep = useCallback((id: Key | null) => {
    if (id === null) {
      return;
    }
    setFlowStepForm({
      success_step: Number(id),
    });
  }, []);
  // Изменение шага при неудаче
  const onChangeFailStep = useCallback((id: Key | null) => {
    if (id === null) {
      return;
    }
    setFlowStepForm({
      fail_step: Number(id),
    });
  }, []);
  // Изменение родительского блока
  const onChangeParentBlock = useCallback((id: Key | null) => {
    if (id === null) {
      return;
    }
    setFlowStepForm({
      orgboard_block_id: Number(id),
    });
  }, []);
  // Изменение дочернего блока
  const onChangeChildBlock = useCallback((id: Key | null) => {
    if (id === null) {
      return;
    }
    setFlowStepForm({
      orgboard_block_end_id: Number(id),
    });
  }, []);

  return useMemo(
    () => ({
      handleCancelCreateFlowStepScreen,
      handleCancelUpdateFlowStepScreen,
      onChangeSuccesStatus,
      createFlowStep,
      updateFlowStep,
      onChangeFailStatus,
      onChangeDescription,
      onChangeSuccesStep,
      onChangeFailStep,
      onChangeParentBlock,
      onChangeChildBlock,
      isDeletedPopoverFlowStepOpen,
      setIsDeletedPopoverFlowStepOpen,
      handleDeleteFlowStep,
    }),
    [
      handleCancelCreateFlowStepScreen,
      createFlowStep,
      handleCancelUpdateFlowStepScreen,
      onChangeFailStatus,
      updateFlowStep,
      onChangeDescription,
      onChangeSuccesStep,
      onChangeFailStep,
      onChangeParentBlock,
      onChangeChildBlock,
      isDeletedPopoverFlowStepOpen,
      setIsDeletedPopoverFlowStepOpen,
      handleDeleteFlowStep,
    ],
  );
};
