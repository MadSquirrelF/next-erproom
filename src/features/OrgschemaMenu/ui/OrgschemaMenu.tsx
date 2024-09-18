"use client";
import { Card, CardBody, CardHeader } from "@nextui-org/card";
import { memo, useCallback, useState } from "react";
import { CSSTransition, SwitchTransition } from "react-transition-group";

import {
  IOrgschemaMenuSteps,
  useOrgschemaMenu,
} from "../model/store/orgschemaMenu";

import { OrgschemaMenuTabs } from "./OrgschemaMenuTabs/OrgschemaMenuTabs";
import { OrgschemaMenuSection } from "./OrgschemaMenuSection/OrgschemaMenuSection";
import { OrgschemaMenuList } from "./OrgschemaMenuList/OrgschemaMenuList";
import { OrgschemaMenuManage } from "./OrgschemaMenuManage/OrgschemaMenuManage";

interface OrgschemaMenuProps {
  className?: string;
}

export const OrgschemaMenu = memo((props: OrgschemaMenuProps) => {
  const { className } = props;

  const currentStep = useOrgschemaMenu((state) => state.currentStep);

  const [collapsed, setCollapsed] = useState(false);

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
      className={`${collapsed ? "w-20" : "w-1/3"} h-full p-2 transition-all duration-300`}
    >
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
    </Card>
  );
});
