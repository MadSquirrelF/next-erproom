"use client";
import { Card, CardBody, CardHeader } from "@nextui-org/card";
import { memo, useCallback } from "react";
import { CSSTransition, SwitchTransition } from "react-transition-group";

import {
  IOrgschemaMenuSteps,
  useOrgschemaMenu,
} from "../model/store/orgschemaMenu";

import { OrgschemaMenuTabs } from "./OrgschemaMenuTabs/OrgschemaMenuTabs";
import { OrgschemaMenuSection } from "./OrgschemaMenuSection/OrgschemaMenuSection";
import { OrgschemaMenuList } from "./OrgschemaMenuList/OrgschemaMenuList";
import { OrgschemaMenuManage } from "./OrgschemaMenuManage/OrgschemaMenuManage";

import { OrgschemaMenuTopBg } from "@/src/shared/assets/OrgschemaMenuTopBg/OrgschemaMenuTopBg";
import { OrgschemaMenuLeftBg } from "@/src/shared/assets/OrgschemaMenuLeftBg/OrgschemaMenuLeftBg";

interface OrgschemaMenuProps {
  className?: string;
}

export const OrgschemaMenu = memo((props: OrgschemaMenuProps) => {
  const { className } = props;

  const currentStep = useOrgschemaMenu((state) => state.currentStep);

  const renderCurrentStep = useCallback((currentStep: IOrgschemaMenuSteps) => {
    switch (currentStep) {
      case IOrgschemaMenuSteps.SECTION:
        return <OrgschemaMenuSection />;
      case IOrgschemaMenuSteps.LIST:
        return <OrgschemaMenuList />;
      case IOrgschemaMenuSteps.MANAGE:
        return <OrgschemaMenuManage />;
      default:
        return null;
    }
  }, []);

  return (
    <Card
      className={`w-1/3 h-full p-2 z-10 relative transition-all duration-300`}
    >
      <OrgschemaMenuTopBg
        className="absolute top-0 opacity-45 left-0 w-[800px]"
        height={350}
      />
      <CardHeader className="flex flex-col items-start gap-3">
        <OrgschemaMenuTabs />
      </CardHeader>
      <CardBody className="flex flex-col justify-between overflow-hidden">
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
      <OrgschemaMenuLeftBg
        className="absolute bottom-6 -z-10 opacity-45 left-0 w-[600px]"
        height={250}
      />
    </Card>
  );
});
