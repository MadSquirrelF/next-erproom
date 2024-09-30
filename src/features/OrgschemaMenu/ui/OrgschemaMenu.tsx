"use client";
import { Card, CardBody, CardHeader } from "@nextui-org/card";
import { memo, useCallback } from "react";
import { CSSTransition, SwitchTransition } from "react-transition-group";
import { Tooltip } from "@nextui-org/tooltip";
import { Button } from "@nextui-org/button";

import {
  IOrgschemaMenuSteps,
  useOrgschemaMenu,
} from "../model/store/orgschemaMenu";

import { OrgschemaMenuTabs } from "./OrgschemaMenuTabs/OrgschemaMenuTabs";
import { OrgschemaMenuList } from "./OrgschemaMenuList/OrgschemaMenuList";
import { OrgschemaMenuManage } from "./OrgschemaMenuManage/OrgschemaMenuManage";
import { OrgschemaMenuRoutes } from "./OrgschemaMenuRoutes/OrgschemaMenuRoutes";

import { OrgschemaMenuTopBg } from "@/src/shared/assets/OrgschemaMenuTopBg/OrgschemaMenuTopBg";
import {
  ArrowSquareLeftIcon,
  ArrowSquareRightIcon,
} from "@/src/shared/assets/icons";

export const OrgschemaMenu = memo(() => {
  const setIsMenuCollapsed = useOrgschemaMenu(
    (state) => state.setIsMenuCollapsed,
  );
  const currentStep = useOrgschemaMenu((state) => state.currentStep);

  const isMenuCollapsed = useOrgschemaMenu((state) => state.isMenuCollapsed);

  const renderCurrentStep = useCallback(
    (currentStep: IOrgschemaMenuSteps) => {
      switch (currentStep) {
        case IOrgschemaMenuSteps.LIST:
          return <OrgschemaMenuList />;
        case IOrgschemaMenuSteps.MANAGE:
          return <OrgschemaMenuManage />;
        case IOrgschemaMenuSteps.ROUTES:
          return <OrgschemaMenuRoutes />;
        default:
          return null;
      }
    },
    [currentStep],
  );

  return (
    <div
      className={`flex flex-row gap-4 top-3 bottom-3 right-3 p-2 z-10 absolute transition-transform duration-300 ${isMenuCollapsed ? "translate-x-[515px]" : "translate-x-0"}`}
    >
      <Tooltip
        showArrow
        color="primary"
        content={isMenuCollapsed ? "Открыть меню" : "Закрыть меню"}
        offset={10}
        placement="bottom-end"
      >
        <Button
          isIconOnly
          color="primary"
          size="lg"
          onClick={() => setIsMenuCollapsed(!isMenuCollapsed)}
        >
          {isMenuCollapsed ? (
            <ArrowSquareLeftIcon size={40} />
          ) : (
            <ArrowSquareRightIcon size={40} />
          )}
        </Button>
      </Tooltip>
      <Card className={`w-[500px] relative`}>
        <OrgschemaMenuTopBg
          className="absolute top-0 opacity-25 left-0 w-[800px]"
          height={350}
        />
        <CardHeader className="flex flex-col items-start gap-3">
          <OrgschemaMenuTabs />
        </CardHeader>
        <CardBody className="flex flex-col overflow-y-auto overflow-x-hidden justify-between h-full">
          <SwitchTransition mode="out-in">
            <CSSTransition
              key={currentStep}
              unmountOnExit
              classNames="fade"
              timeout={300}
            >
              {renderCurrentStep(currentStep)}
            </CSSTransition>
          </SwitchTransition>
        </CardBody>
      </Card>
    </div>
  );
});
