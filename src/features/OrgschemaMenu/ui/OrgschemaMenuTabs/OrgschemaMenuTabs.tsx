"use client";
import { Tab, Tabs } from "@nextui-org/tabs";
import { Key, memo } from "react";

import {
  IOrgschemaMenuSection,
  IOrgschemaMenuSteps,
  useOrgschemaMenu,
} from "../../model/store/orgschemaMenu";

import { ConvertCubeIcon, EditIcon, NoteIcon } from "@/src/shared/assets/icons";

export const OrgschemaMenuTabs = memo(() => {
  const currentSection = useOrgschemaMenu((state) => state.currentSection);
  const loadedSchema = useOrgschemaMenu((state) => state.loadedSchema);

  const setStep = useOrgschemaMenu((state) => state.setStep);
  const currentStep = useOrgschemaMenu((state) => state.currentStep);
  const setSelectedBlock = useOrgschemaMenu((state) => state.setSelectedBlock);

  const handleSelectionChange = (key: Key) => {
    const step = key as IOrgschemaMenuSteps;

    setSelectedBlock(undefined);
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
        key={IOrgschemaMenuSteps.SECTION}
        title={
          <div className="flex items-center space-x-2">
            <ConvertCubeIcon />
            <span>Секции</span>
          </div>
        }
      />
      <Tab
        key={IOrgschemaMenuSteps.LIST}
        isDisabled={currentSection === IOrgschemaMenuSection.NONE}
        title={
          <div className="flex items-center space-x-2">
            <NoteIcon />
            <span>Список</span>
          </div>
        }
      />
      <Tab
        key={IOrgschemaMenuSteps.MANAGE}
        isDisabled={
          currentSection === IOrgschemaMenuSection.NONE || !loadedSchema
        }
        title={
          <div className="flex items-center space-x-2">
            <EditIcon />
            <span>Управление</span>
          </div>
        }
      />
    </Tabs>
  );
});
