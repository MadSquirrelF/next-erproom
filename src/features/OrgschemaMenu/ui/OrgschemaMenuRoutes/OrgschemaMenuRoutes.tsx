"use client";
import { memo, useCallback } from "react";
import { CSSTransition, SwitchTransition } from "react-transition-group";

import {
  IRouteScreen,
  useOrgschemaMenu,
} from "../../model/store/orgschemaMenu";

import { RoutesEmptyScreen } from "./RoutesEmptyScreen/RoutesEmptyScreen";
import { RoutesListScreen } from "./RoutesListScreen/RoutesListScreen";
import { RoutesManageScreen } from "./RoutesManageScreen/RoutesManageScreen";

interface OrgschemaMenuRoutesProps {
  className?: string;
}

export const OrgschemaMenuRoutes = memo((props: OrgschemaMenuRoutesProps) => {
  const { className } = props;
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
          return <div>CREATE screen</div>;
        case IRouteScreen.CREATE_EMPTY:
          return <div>CREATE_EMPTY screen</div>;
        case IRouteScreen.UPDATE:
          return <div>UPDATE screen</div>;

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
