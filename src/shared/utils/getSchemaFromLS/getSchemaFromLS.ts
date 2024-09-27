"use client";
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
  | "zoomCount"
  | "isMenuCollapsed"
> => {
  if (typeof window !== "undefined" && window.localStorage) {
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
      isMenuCollapsed: result.isMenuCollapsed || false,
      activeSchemaId: result.activeSchemaId,
      currentSection: result.currentSection || IOrgschemaMenuSection.NONE,
      loadedSchema: result.loadedSchema,
      currentRoute: result.currentRoute,
      zoomCount: result.zoomCount || 1,
    };
  }

  return {
    currentStep: IOrgschemaMenuSteps.SECTION,
    isMenuCollapsed: false,
    activeSchemaId: undefined,
    currentSection: IOrgschemaMenuSection.NONE,
    loadedSchema: undefined,
    currentRoute: null,
    zoomCount: 1,
  };
};
