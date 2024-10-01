"use client";
import { Tab, Tabs } from "@nextui-org/tabs";
import { Key, memo } from "react";

import {
  IOrgschemaMenuSteps,
  useOrgschemaMenu,
} from "../../model/store/orgschemaMenu";

import { EditIcon, OrgSchemaIcon, RoutesIcon } from "@/src/shared/assets/icons";

export const OrgschemaMenuTabs = memo(() => {
  const setStep = useOrgschemaMenu((state) => state.setStep);
  const currentStep = useOrgschemaMenu((state) => state.currentStep);
  const setSelectedBlock = useOrgschemaMenu((state) => state.setSelectedBlock);
  const activeSchemaId = useOrgschemaMenu((state) => state.activeSchemaId);
  const setBlockForm = useOrgschemaMenu((state) => state.setBlockForm);

  const handleSelectionChange = (key: Key) => {
    const step = key as IOrgschemaMenuSteps;

    setSelectedBlock(undefined);
    setBlockForm(undefined);
    setStep(step);
  };

  return (
    <Tabs
      fullWidth
      aria-label="Menu schema tabs"
      color="primary"
      selectedKey={currentStep}
      size="lg"
      variant="solid"
      onSelectionChange={handleSelectionChange}
    >
      <Tab
        key={IOrgschemaMenuSteps.LIST}
        title={
          <div className="flex items-center space-x-2">
            <OrgSchemaIcon />
            <span>Оргсхемы</span>
          </div>
        }
      />
      <Tab
        key={IOrgschemaMenuSteps.MANAGE}
        isDisabled={!activeSchemaId}
        title={
          <div className="flex items-center space-x-2">
            <EditIcon />
            <span>Управление</span>
          </div>
        }
      />
      <Tab
        key={IOrgschemaMenuSteps.ROUTES}
        isDisabled={!activeSchemaId}
        title={
          <div className="flex items-center space-x-2">
            <RoutesIcon />
            <span>Маршруты</span>
          </div>
        }
      />
    </Tabs>
  );
});
