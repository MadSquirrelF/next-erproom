"use client";
import { SCHEMA_MENU_LOCALSTORAGE_KEY } from "../../constants/constants";

import {
  IOrgschemaMenu,
  IOrgschemaMenuSteps,
} from "@/src/features/OrgschemaMenu/model/store/orgschemaMenu";

export const loadStateFromLocalStorage = (): Pick<
  IOrgschemaMenu,
  "activeSchemaId" | "currentStep" | "isMenuCollapsed"
> => {
  if (typeof window !== "undefined" && window.localStorage) {
    const savedState = localStorage.getItem(SCHEMA_MENU_LOCALSTORAGE_KEY);
    const result: IOrgschemaMenu = savedState ? JSON.parse(savedState) : {};

    let currentStep = IOrgschemaMenuSteps.LIST;

    if (result.activeSchemaId) {
      currentStep = IOrgschemaMenuSteps.LIST;
    } else if (result.currentStep) {
      currentStep = result.currentStep;
    }

    return {
      currentStep: currentStep,
      isMenuCollapsed: result.isMenuCollapsed || false,
      activeSchemaId: result.activeSchemaId,
    };
  }

  return {
    currentStep: IOrgschemaMenuSteps.LIST,
    isMenuCollapsed: false,
    activeSchemaId: undefined,
  };
};
