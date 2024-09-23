import { SCHEMA_MENU_LOCALSTORAGE_KEY } from "../../constants/constants";

import {
  IOrgschemaMenu,
  IOrgschemaMenuSection,
  IOrgschemaMenuSteps,
} from "@/src/features/OrgschemaMenu/model/store/orgschemaMenu";

export const loadStateFromLocalStorage = (): Pick<
  IOrgschemaMenu,
  | "activeSchemaId"
  | "currentRoute"
  | "currentSection"
  | "currentStep"
  | "loadedSchema"
> => {
  const savedState = localStorage.getItem(SCHEMA_MENU_LOCALSTORAGE_KEY);
  const result: IOrgschemaMenu = savedState ? JSON.parse(savedState) : {};

  let currentStep = IOrgschemaMenuSteps.SECTION;

  if (result.activeSchemaId) {
    currentStep = IOrgschemaMenuSteps.LIST;
  } else if (result.currentStep) {
    currentStep = result.currentStep;
  }

  return {
    currentStep: currentStep,
    activeSchemaId: result.activeSchemaId,
    currentSection: result.currentSection || IOrgschemaMenuSection.NONE,
    loadedSchema: result.loadedSchema,
    currentRoute: result.currentRoute,
  };
};
