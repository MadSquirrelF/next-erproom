"use client";
import { memo, useCallback } from "react";
import { CSSTransition, SwitchTransition } from "react-transition-group";

import {
  IRouteScreen,
  useOrgschemaMenu,
} from "../../model/store/orgschemaMenu";
import { useUpdateFlowStep } from "../../model/hooks/useUpdateFlowStep";

import { RoutesEmptyScreen } from "./RoutesEmptyScreen/RoutesEmptyScreen";
import { RoutesListScreen } from "./RoutesListScreen/RoutesListScreen";
import { RoutesManageScreen } from "./RoutesManageScreen/RoutesManageScreen";
import { FlowStepForm } from "./FlowStepForm/FlowStepForm";

interface OrgschemaMenuRoutesProps {
  className?: string;
}

export const OrgschemaMenuRoutes = memo((props: OrgschemaMenuRoutesProps) => {
  const { className } = props;

  const {
    handleCancelCreateFlowStepScreen,
    handleCancelUpdateFlowStepScreen,
    onChangeFailStatus,
    onChangeDescription,
    onChangeSuccesStep,
    createFlowStep,
    onChangeFailStep,
    onChangeParentBlock,
    onChangeSuccesStatus,
    onChangeChildBlock,
    updateFlowStep,
  } = useUpdateFlowStep();

  const currentRouteScreen = useOrgschemaMenu(
    (state) => state.currentRouteScreen,
  );

  const renderRouteScreen = useCallback(
    (currentRouteScreen: IRouteScreen) => {
      switch (currentRouteScreen) {
        case IRouteScreen.EMPTY:
          return <RoutesEmptyScreen />;
        case IRouteScreen.LIST:
          return <RoutesListScreen />;
        case IRouteScreen.MANAGE:
          return <RoutesManageScreen />;
        case IRouteScreen.CREATE:
          return (
            <FlowStepForm
              cancel={handleCancelCreateFlowStepScreen}
              cancelTitle="Отменить создание"
              formTitle="Создание шага"
              handleFlowStep={createFlowStep}
              handleTitle="Создать шаг"
              type={"create"}
              onChangeChildBlock={onChangeChildBlock}
              onChangeDescription={onChangeDescription}
              onChangeFailStatus={onChangeFailStatus}
              onChangeFailStep={onChangeFailStep}
              onChangeParentBlock={onChangeParentBlock}
              onChangeSuccesStatus={onChangeSuccesStatus}
              onChangeSuccesStep={onChangeSuccesStep}
            />
          );
        case IRouteScreen.CREATE_EMPTY:
          return (
            <FlowStepForm
              cancel={handleCancelCreateFlowStepScreen}
              cancelTitle="Отменить создание"
              formTitle="Создание первого шага"
              handleFlowStep={createFlowStep}
              handleTitle="Создать первый шаг"
              type={"create_first"}
              onChangeChildBlock={onChangeChildBlock}
              onChangeDescription={onChangeDescription}
              onChangeFailStatus={onChangeFailStatus}
              onChangeFailStep={onChangeFailStep}
              onChangeParentBlock={onChangeParentBlock}
              onChangeSuccesStatus={onChangeSuccesStatus}
              onChangeSuccesStep={onChangeSuccesStep}
            />
          );
        case IRouteScreen.UPDATE:
          return (
            <FlowStepForm
              cancel={handleCancelUpdateFlowStepScreen}
              cancelTitle="Отменить редактирование"
              formTitle="Редактирование шага"
              handleFlowStep={updateFlowStep}
              handleTitle="Редактировать шаг"
              type={"update"}
              onChangeChildBlock={onChangeChildBlock}
              onChangeDescription={onChangeDescription}
              onChangeFailStatus={onChangeFailStatus}
              onChangeFailStep={onChangeFailStep}
              onChangeParentBlock={onChangeParentBlock}
              onChangeSuccesStatus={onChangeSuccesStatus}
              onChangeSuccesStep={onChangeSuccesStep}
            />
          );

        default:
          return <RoutesListScreen />;
      }
    },
    [currentRouteScreen],
  );

  return (
    <SwitchTransition mode="out-in">
      <CSSTransition
        key={currentRouteScreen}
        unmountOnExit
        classNames="fade"
        timeout={300}
      >
        {renderRouteScreen(currentRouteScreen)}
      </CSSTransition>
    </SwitchTransition>
  );
});
