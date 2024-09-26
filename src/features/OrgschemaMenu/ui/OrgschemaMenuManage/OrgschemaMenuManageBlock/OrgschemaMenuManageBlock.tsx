"use client";

import { memo, useCallback } from "react";
import { CSSTransition, SwitchTransition } from "react-transition-group";

import {
  IActionManageScreen,
  useOrgschemaMenu,
} from "../../../model/store/orgschemaMenu";

import { ActionManageScreenInfo } from "./ActionManageScreen/ActionManageScreenInfo/ActionManageScreenInfo";
import { ActionManageScreenCreate } from "./ActionManageScreen/ActionManageScreenCreate/ActionManageScreenCreate";
import { ActionManageScreenUpdate } from "./ActionManageScreen/ActionManageScreenUpdate/ActionManageScreenUpdate";
import { ActionManageScreenUser } from "./ActionManageScreen/ActionManageScreenUser/ActionManageScreenUser";
import { ActionManageScreenFile } from "./ActionManageScreen/ActionManageScreenFile/ActionManageScreenFile";

import { subtitle } from "@/components/primitives";
import { OrgschemaSelectBlockBg } from "@/src/shared/assets/OrgschemaSelectBlockBg/OrgschemaSelectBlockBg";

interface OrgschemaMenuManageBlockProps {
  className?: string;
}

export const OrgschemaMenuManageBlock = memo(
  (props: OrgschemaMenuManageBlockProps) => {
    const { className } = props;

    const currentManagaActionScreen = useOrgschemaMenu(
      (state) => state.currentActionManageScreen,
    );
    const selectedBlock = useOrgschemaMenu((state) => state.selectedBlock);

    const renderContentMenu = useCallback(
      (currentManagaActionScreen: IActionManageScreen) => {
        switch (currentManagaActionScreen) {
          case IActionManageScreen.INFO:
            return <ActionManageScreenInfo />;
          case IActionManageScreen.CREATE:
            return <ActionManageScreenCreate />;
          case IActionManageScreen.UPDATE:
            return <ActionManageScreenUpdate />;
          case IActionManageScreen.USER:
            return <ActionManageScreenUser />;
          case IActionManageScreen.FILE:
            return <ActionManageScreenFile />;

          default:
            return <ActionManageScreenInfo />;
        }
      },
      [currentManagaActionScreen, selectedBlock],
    );

    if (!selectedBlock) {
      return (
        <div className="flex flex-col items-center gap-4">
          <OrgschemaSelectBlockBg className="text-primary" size={300} />
          <h4
            className={subtitle({
              color: "default",
            })}
          >
            Выберите активный блок
          </h4>
          <h4
            className={subtitle({
              size: "tiny",
              align: "center",
            })}
          >
            Выберите из списка блок, с которым хотите работать, или вы просто
            кликните по нему на схеме организации.
          </h4>
        </div>
      );
    }

    return (
      <SwitchTransition mode="out-in">
        <CSSTransition
          key={currentManagaActionScreen}
          unmountOnExit
          classNames="fade"
          timeout={300}
        >
          {renderContentMenu(currentManagaActionScreen)}
        </CSSTransition>
      </SwitchTransition>
    );
  },
);
